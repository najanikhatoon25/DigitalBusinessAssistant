import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { translations, type Language, type TranslationDictionary } from '../utils/translations';
import { findPartnerByEmail, type PartnerDoc } from '../services/firebase';

interface ToastState {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  toast: ToastState;
  showToast: (message: string, type?: 'success' | 'error') => void;
  isPartnerDrawerOpen: boolean;
  openPartnerDrawer: () => void;
  closePartnerDrawer: () => void;
  partnerData: PartnerDoc | null;
  setPartnerData: React.Dispatch<React.SetStateAction<PartnerDoc | null>>;
  activeView: 'home' | 'terms' | 'privacy';
  setActiveView: (view: 'home' | 'terms' | 'privacy') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('preferredLanguage');
    return saved === 'hn' ? 'hn' : 'en';
  });

  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'success',
    visible: false,
  });

  const [isPartnerDrawerOpen, setIsPartnerDrawerOpen] = useState(false);
  const [partnerData, setPartnerDataState] = useState<PartnerDoc | null>(null);
  const [activeView, setActiveView] = useState<'home' | 'terms' | 'privacy'>('home');

  const setPartnerData: React.Dispatch<React.SetStateAction<PartnerDoc | null>> = (action) => {
    setPartnerDataState((prev) => {
      const next = typeof action === 'function' ? action(prev) : action;
      if (next) {
        localStorage.setItem('jhaTechRegisteredPartner', JSON.stringify(next));
        if (next.email) {
          localStorage.setItem('jhaTechRegisteredPartnerEmail', next.email);
        }
      } else {
        localStorage.removeItem('jhaTechRegisteredPartner');
        localStorage.removeItem('jhaTechRegisteredPartnerEmail');
      }
      return next;
    });
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferredLanguage', lang);
    document.documentElement.lang = lang === 'hn' ? 'hi' : 'en';
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2800);
  };

  const openPartnerDrawer = () => setIsPartnerDrawerOpen(true);
  const closePartnerDrawer = () => setIsPartnerDrawerOpen(false);

  // Auto-detect registered partner on device mount
  useEffect(() => {
    const checkPartnerStatus = async () => {
      const savedEmail = localStorage.getItem('jhaTechRegisteredPartnerEmail');
      const savedPartnerJson = localStorage.getItem('jhaTechRegisteredPartner');

      if (savedEmail) {
        try {
          const doc = await findPartnerByEmail(savedEmail);
          if (doc) {
            setPartnerDataState(doc);
            return;
          }
        } catch (err) {
          console.warn('Unable to fetch registered partner from Firestore on mount:', err);
        }
      }

      if (savedPartnerJson) {
        try {
          const parsed = JSON.parse(savedPartnerJson);
          if (parsed && (parsed.referralCode || parsed.email)) {
            setPartnerDataState(parsed);
          }
        } catch {}
      }
    };

    checkPartnerStatus();
  }, []);

  // Check URL hash for legal views
  useEffect(() => {
    const syncViewFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'terms') setActiveView('terms');
      else if (hash === 'privacy') setActiveView('privacy');
      else setActiveView('home');
    };

    syncViewFromHash();
    window.addEventListener('hashchange', syncViewFromHash);
    return () => window.removeEventListener('hashchange', syncViewFromHash);
  }, []);

  const t = translations[language] || translations.en;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        toast,
        showToast,
        isPartnerDrawerOpen,
        openPartnerDrawer,
        closePartnerDrawer,
        partnerData,
        setPartnerData,
        activeView,
        setActiveView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
