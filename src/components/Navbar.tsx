import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { openCalendly } from '../utils/calendly';

export const Navbar: React.FC = () => {
  const { t, language, setLanguage } = useApp();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.lang-switcher')) {
        setLangMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // IntersectionObserver for scroll spy active navigation
  useEffect(() => {
    const sections = ['home-section', 'analysis-section', 'pricing-section', 'referral-section'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('-section', '');
            setActiveNav(id);
          }
        });
      },
      { rootMargin: '-35% 0px -45% 0px' }
    );

    sections.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string, navTarget: string) => {
    setActiveNav(navTarget);
    window.history.pushState({}, '', `#${navTarget}`);
    const section = document.getElementById(sectionId);
    if (section) {
      const top = window.scrollY + section.getBoundingClientRect().top - 96;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b-2 border-on-surface">
      <div className="flex justify-between items-center w-full px-margin h-20 max-w-container-max mx-auto">
        <div id="brand-name" className="font-headline-md text-headline-md font-black text-on-surface">
          {t.brand}
        </div>
        <nav className="hidden md:flex gap-8 items-center">
          <a
            id="nav-home"
            className={`nav-link text-on-surface-variant font-medium hover:text-primary transition-colors font-label-md text-label-md ${
              activeNav === 'home' ? 'active' : ''
            }`}
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home-section', 'home');
            }}
          >
            {t.home}
          </a>
          <a
            id="nav-analysis"
            className={`nav-link text-on-surface-variant font-medium hover:text-primary transition-colors font-label-md text-label-md ${
              activeNav === 'analysis' ? 'active' : ''
            }`}
            href="#analysis"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('analysis-section', 'analysis');
            }}
          >
            {t.analysis}
          </a>
          <a
            id="nav-pricing"
            className={`nav-link text-on-surface-variant font-medium hover:text-primary transition-colors font-label-md text-label-md ${
              activeNav === 'pricing' ? 'active' : ''
            }`}
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('pricing-section', 'pricing');
            }}
          >
            {t.pricing}
          </a>
          <a
            id="nav-referral"
            className={`nav-link text-on-surface-variant font-medium hover:text-primary transition-colors font-label-md text-label-md ${
              activeNav === 'referral' ? 'active' : ''
            }`}
            href="#referral"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('referral-section', 'referral');
            }}
          >
            {t.referral}
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <button
            id="book-demo"
            onClick={openCalendly}
            className="hidden lg:block px-6 py-3 brutalist-border font-button-text text-button-text bg-white hover:bg-surface-container transition-all active:translate-y-0.5 shadow-black cursor-pointer"
          >
            {t.bookDemo}
          </button>
          <button
            id="try-free"
            onClick={() => scrollToSection('analysis-section', 'analysis')}
            className="px-6 py-3 brutalist-border font-button-text text-button-text bg-primary-container text-on-primary-container hover:opacity-90 transition-all active:translate-y-0.5 shadow-mint cursor-pointer"
          >
            {t.tryFree}
          </button>
          <div className="lang-switcher">
            <button
              id="lang-toggle"
              type="button"
              onClick={() => setLangMenuOpen((prev) => !prev)}
              className="material-symbols-outlined text-on-surface cursor-pointer p-2 hover:bg-surface-container rounded-full select-none"
              aria-label={t.langLabel}
            >
              {language === 'hn' ? 'HN' : 'EN'}
            </button>
            <div id="lang-menu" className={`lang-menu ${langMenuOpen ? 'open' : ''}`} role="menu" aria-label="Language selector">
              <button
                className={`lang-option ${language === 'en' ? 'active' : ''}`}
                type="button"
                onClick={() => {
                  setLanguage('en');
                  setLangMenuOpen(false);
                }}
                role="menuitem"
              >
                English
              </button>
              <button
                className={`lang-option ${language === 'hn' ? 'active' : ''}`}
                type="button"
                onClick={() => {
                  setLanguage('hn');
                  setLangMenuOpen(false);
                }}
                role="menuitem"
              >
                HN
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
