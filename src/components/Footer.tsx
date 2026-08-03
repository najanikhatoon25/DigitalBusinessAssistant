import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { t, setActiveView } = useApp();

  const openLegalView = (view: 'terms' | 'privacy') => {
    window.history.pushState({}, '', `#${view}`);
    setActiveView(view);
  };

  return (
    <footer className="bg-surface-container-lowest border-t-2 border-on-surface">
      <div className="flex flex-col md:flex-row justify-between items-center py-stack-lg px-margin w-full max-w-container-max mx-auto gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="font-headline-md text-headline-md font-black text-on-surface">
            {t.brand}
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-sm text-center md:text-left">
            © 2026 JhaTech Growth. All rights reserved. Built for high-velocity enterprise expansion.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 md:gap-10">
          <a
            id="privacy-link"
            className="text-on-surface-variant font-medium hover:underline decoration-2 underline-offset-4 transition-opacity hover:opacity-80 font-body-md text-body-md cursor-pointer"
            href="#privacy"
            onClick={(e) => {
              e.preventDefault();
              openLegalView('privacy');
            }}
          >
            {t.footerPrivacy}
          </a>
          <a
            id="terms-link"
            className="text-on-surface-variant font-medium hover:underline decoration-2 underline-offset-4 transition-opacity hover:opacity-80 font-body-md text-body-md cursor-pointer"
            href="#terms"
            onClick={(e) => {
              e.preventDefault();
              openLegalView('terms');
            }}
          >
            {t.footerTerms}
          </a>
          <a
            id="contact-link"
            className="text-on-surface-variant font-medium hover:underline decoration-2 underline-offset-4 transition-opacity hover:opacity-80 font-body-md text-body-md"
            href="#"
          >
            {t.footerContact}
          </a>
          <a
            id="linkedin-link"
            className="text-on-surface-variant font-medium hover:underline decoration-2 underline-offset-4 transition-opacity hover:opacity-80 font-body-md text-body-md"
            href="#"
          >
            {t.footerLinkedIn}
          </a>
          <a
            id="twitter-link"
            className="text-on-surface-variant font-medium hover:opacity-80 font-body-md text-body-md"
            href="#"
          >
            {t.footerTwitter}
          </a>
        </nav>
      </div>
    </footer>
  );
};
