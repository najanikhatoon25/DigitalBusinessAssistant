import React from 'react';
import { useApp } from '../context/AppContext';

export const Hero: React.FC = () => {
  const { t } = useApp();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const top = window.scrollY + section.getBoundingClientRect().top - 96;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="home-section" className="section-anchor py-stack-xl px-margin max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-stack-lg">
        <span id="hero-eyebrow" className="font-label-md text-label-md text-primary tracking-widest uppercase">
          {t.heroEyebrow}
        </span>
        <h1 id="hero-title" className="font-headline-xl text-headline-xl leading-none">
          {t.heroTitle}
        </h1>
        <p id="hero-copy" className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
          {t.heroCopy}
        </p>
        <div className="flex flex-wrap gap-stack-md pt-4">
          <button
            id="hero-primary"
            onClick={() => scrollToSection('analysis-section')}
            className="px-8 py-4 brutalist-border bg-primary-container text-on-primary-container font-button-text text-button-text shadow-mint active:translate-y-0.5 transition-all cursor-pointer"
          >
            {t.heroPrimary}
          </button>
          <button
            id="hero-secondary"
            onClick={() => scrollToSection('referral-section')}
            className="px-8 py-4 brutalist-border bg-white text-on-surface font-button-text text-button-text shadow-black active:translate-y-0.5 transition-all cursor-pointer"
          >
            {t.heroSecondary}
          </button>
        </div>
      </div>
      <div className="relative">
        <div className="brutalist-border bg-white p-4 shadow-black rotate-1">
          <img
            className="w-full h-auto"
            alt="A sophisticated desktop dashboard interface for a business growth platform."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeT7nHpXn0uvg1-7ZPYul2OAJNthmHx0uLC35AjJ4VHfnx9gd8-ZGkrUTE6s2ONES07FaS1anZFvsXSk9BU-_OtPZbw6_-kBUZ_1ozXEYgmUtkWVD7aB-vwd0Dks76bLOEZCvqI3h4l5_nhL_0RswkUQCdNatGVvopTpSsAOo7E68y7xyx42OhfReK_lZwIXfR9HSlA4yTxAR0QPQcDmggmjiuju2NshTq7DavwGuQ60FLg2kAoc6k"
          />
        </div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary-container brutalist-border -z-10"></div>
      </div>
    </section>
  );
};
