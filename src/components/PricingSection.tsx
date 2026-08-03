import React from 'react';
import { useApp } from '../context/AppContext';

export const PricingSection: React.FC = () => {
  const { t } = useApp();

  const handleWhatsAppClick = () => {
    const phoneNumber = '919999999999';
    const message = "Hello! I'm interested in learning more about your Digital Growth Advisor.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="pricing-section" className="section-anchor py-stack-xl px-margin max-w-container-max mx-auto">
      <div className="text-center mb-stack-xl">
        <span id="pricing-eyebrow" className="font-label-md text-label-md text-tertiary">
          {t.pricingEyebrow}
        </span>
        <h2 id="pricing-title" className="font-headline-lg text-headline-lg mt-2">
          {t.pricingTitle}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Starter Plan */}
        <div className="brutalist-border bg-white p-8 flex flex-col hover:bg-surface-container-low transition-colors group">
          <h3 id="plan-1-title" className="font-headline-md text-headline-md mb-2">
            {t.plan1Title}
          </h3>
          <div className="text-primary font-headline-lg text-headline-lg mb-6">₹18,000</div>
          <ul className="space-y-4 mb-10 flex-grow">
            <li className="flex items-center gap-2 font-body-md text-body-md">
              <span className="material-symbols-outlined text-sm">fiber_manual_record</span>
              5-page responsive website
            </li>
            <li className="flex items-center gap-2 font-body-md text-body-md">
              <span className="material-symbols-outlined text-sm">fiber_manual_record</span>
              WhatsApp booking button
            </li>
            <li className="flex items-center gap-2 font-body-md text-body-md">
              <span className="material-symbols-outlined text-sm">fiber_manual_record</span>
              Basic SEO setup
            </li>
          </ul>
          <button
            id="plan-1-btn"
            className="w-full py-4 brutalist-border bg-primary-container text-on-primary-container font-button-text text-button-text shadow-mint active:translate-y-0.5 transition-all cursor-pointer"
          >
            {t.plan1Btn}
          </button>
        </div>

        {/* Growth Plan */}
        <div className="brutalist-border bg-white p-8 flex flex-col shadow-black group">
          <h3 id="plan-2-title" className="font-headline-md text-headline-md mb-2">
            {t.plan2Title}
          </h3>
          <div className="text-primary font-headline-lg text-headline-lg mb-6">₹35,000</div>
          <ul className="space-y-4 mb-10 flex-grow">
            <li className="flex items-center gap-2 font-body-md text-body-md">
              <span className="material-symbols-outlined text-sm">fiber_manual_record</span>
              Everything in Starter
            </li>
            <li className="flex items-center gap-2 font-body-md text-body-md">
              <span className="material-symbols-outlined text-sm">fiber_manual_record</span>
              Google Business Profile setup
            </li>
            <li className="flex items-center gap-2 font-body-md text-body-md">
              <span className="material-symbols-outlined text-sm">fiber_manual_record</span>
              Social media content plan
            </li>
          </ul>
          <button
            id="plan-2-btn"
            className="w-full py-4 brutalist-border bg-primary-container text-on-primary-container font-button-text text-button-text shadow-mint active:translate-y-0.5 transition-all cursor-pointer"
          >
            {t.plan2Btn}
          </button>
        </div>

        {/* AI Smart Plan */}
        <div className="brutalist-border bg-white p-8 flex flex-col hover:bg-surface-container-low transition-colors group">
          <h3 id="plan-3-title" className="font-headline-md text-headline-md mb-2">
            {t.plan3Title}
          </h3>
          <div className="text-primary font-headline-lg text-headline-lg mb-6">₹55,000</div>
          <ul className="space-y-4 mb-10 flex-grow">
            <li className="flex items-center gap-2 font-body-md text-body-md">
              <span className="material-symbols-outlined text-sm">fiber_manual_record</span>
              Everything in Growth
            </li>
            <li className="flex items-center gap-2 font-body-md text-body-md">
              <span className="material-symbols-outlined text-sm">fiber_manual_record</span>
              AI lead analysis
            </li>
            <li className="flex items-center gap-2 font-body-md text-body-md">
              <span className="material-symbols-outlined text-sm">fiber_manual_record</span>
              Monthly competitor insights
            </li>
          </ul>
          <button
            id="plan-3-btn"
            className="w-full py-4 brutalist-border bg-primary-container text-on-primary-container font-button-text text-button-text shadow-mint active:translate-y-0.5 transition-all cursor-pointer"
          >
            {t.plan3Btn}
          </button>
        </div>
      </div>

      {/* WhatsApp Callout */}
      <div className="mt-stack-lg brutalist-border bg-secondary-container p-6 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
        <span id="pricing-help-title" className="font-headline-md text-headline-md">
          {t.pricingHelpTitle}
        </span>
        <p id="pricing-help-copy" className="font-body-md text-body-md">
          {t.pricingHelpCopy}
        </p>
        <button
          id="pricing-whatsapp"
          type="button"
          onClick={handleWhatsAppClick}
          className="px-6 py-3 brutalist-border bg-[#25D366] text-white font-button-text text-button-text shadow-black active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
          aria-label="Open WhatsApp chat"
        >
          <span className="material-symbols-outlined">chat</span>
          {t.pricingWhatsapp}
        </button>
      </div>
    </section>
  );
};
