import React from 'react';
import { useApp } from '../context/AppContext';

export const LegalModal: React.FC = () => {
  const { t, activeView, setActiveView } = useApp();

  if (activeView === 'home') return null;

  const handleBack = () => {
    window.history.pushState({}, '', '#home');
    setActiveView('home');
  };

  return (
    <div className="pt-24 pb-20 min-h-[70vh] max-w-[960px] mx-auto px-6">
      {activeView === 'terms' ? (
        <section id="terms-view" className="view-page active">
          <div className="view-page-card">
            <h2 id="terms-title" className="font-headline-lg text-headline-lg mb-4">
              {t.termsTitle}
            </h2>
            <p id="terms-copy" className="font-body-md text-body-md mb-4">
              {t.termsCopy}
            </p>
            <p id="terms-copy-2" className="font-body-md text-body-md mb-6">
              {t.termsCopy2}
            </p>
            <button
              id="back-home-terms"
              type="button"
              onClick={handleBack}
              className="px-6 py-3 brutalist-border bg-primary-container text-on-primary-container font-button-text text-button-text shadow-mint active:translate-y-0.5 transition-all cursor-pointer"
            >
              {t.back}
            </button>
          </div>
        </section>
      ) : null}

      {activeView === 'privacy' ? (
        <section id="privacy-view" className="view-page active">
          <div className="view-page-card">
            <h2 id="privacy-title" className="font-headline-lg text-headline-lg mb-4">
              {t.privacyTitle}
            </h2>
            <p id="privacy-copy" className="font-body-md text-body-md mb-4">
              {t.privacyCopy}
            </p>
            <p id="privacy-copy-2" className="font-body-md text-body-md mb-6">
              {t.privacyCopy2}
            </p>
            <button
              id="back-home-privacy"
              type="button"
              onClick={handleBack}
              className="px-6 py-3 brutalist-border bg-primary-container text-on-primary-container font-button-text text-button-text shadow-mint active:translate-y-0.5 transition-all cursor-pointer"
            >
              {t.back}
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
};
