import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { addPartner } from '../services/firebase';

export const PartnerDrawer: React.FC = () => {
  const { t, isPartnerDrawerOpen, closePartnerDrawer, setPartnerData, showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!name.trim() || !email.trim()) {
      setStatusMessage({ text: t.partnerRequired, type: 'error' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatusMessage({ text: 'Please enter a valid email address.', type: 'error' });
      return;
    }

    setSubmitting(true);
    try {
      const { partner, isExisting } = await addPartner({
        name: name.trim(),
        email: email.trim(),
        phone: '',
        businessType: businessType || 'Other',
      });

      setPartnerData(partner);
      closePartnerDrawer();

      if (isExisting) {
        showToast('Welcome back! You are already a registered partner.');
      } else {
        showToast(t.partnerSuccess);
      }

      setName('');
      setEmail('');
      setBusinessType('');
    } catch (error) {
      console.error('Partner registration error:', error);
      setStatusMessage({ text: t.partnerError || 'Registration failed. Please try again.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div
        id="partner-drawer-overlay"
        onClick={closePartnerDrawer}
        className={`drawer-overlay fixed inset-0 bg-black/60 z-[70] ${isPartnerDrawerOpen ? 'open' : ''}`}
      ></div>
      <aside
        id="partner-drawer"
        className={`partner-drawer fixed top-0 right-0 h-full w-full md:w-[400px] bg-surface border-l-2 border-on-surface shadow-2xl z-[80] overflow-y-auto ${
          isPartnerDrawerOpen ? 'open' : ''
        }`}
        aria-hidden={!isPartnerDrawerOpen}
      >
        <div className="flex items-center justify-between p-6 border-b-2 border-on-surface">
          <h3 className="font-headline-md text-headline-md">{t.partnerTitle}</h3>
          <button
            id="close-partner-drawer"
            type="button"
            onClick={closePartnerDrawer}
            className="material-symbols-outlined text-on-surface cursor-pointer p-2 hover:bg-surface-container rounded-full select-none"
            aria-label={t.partnerCloseLabel}
          >
            close
          </button>
        </div>
        <form id="partner-form" onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>
          <div>
            <label className="block font-label-md text-label-md mb-2" htmlFor="partner-name">
              {t.partnerNameLabel}
            </label>
            <input
              id="partner-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full brutalist-border p-3 focus:ring-0 focus:border-primary outline-none"
              required
            />
          </div>
          <div>
            <label className="block font-label-md text-label-md mb-2" htmlFor="partner-email">
              {t.partnerEmailLabel}
            </label>
            <input
              id="partner-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full brutalist-border p-3 focus:ring-0 focus:border-primary outline-none"
              required
            />
          </div>
          <div>
            <label className="block font-label-md text-label-md mb-2" htmlFor="partner-business-type">
              {t.partnerBusinessLabel}
            </label>
            <select
              id="partner-business-type"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full brutalist-border p-3 focus:ring-0 focus:border-primary outline-none"
              required
            >
              <option value="">{t.partnerSelectPlaceholder}</option>
              <option value="Startup">Startup</option>
              <option value="Small Business">Small Business</option>
              <option value="Agency">Agency</option>
              <option value="Freelancer">Freelancer</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button
            id="partner-submit"
            type="submit"
            disabled={submitting}
            className="w-full py-4 brutalist-border bg-primary-container text-on-primary-container font-button-text text-button-text shadow-mint active:translate-y-0.5 transition-all disabled:opacity-70 cursor-pointer"
          >
            {submitting ? 'Submitting...' : t.partnerSubmit}
          </button>
        </form>
        {statusMessage ? (
          <div
            className={`px-6 pb-6 font-body-md text-body-md ${
              statusMessage.type === 'error' ? 'text-error' : 'text-primary'
            }`}
            role="status"
          >
            {statusMessage.text}
          </div>
        ) : null}
      </aside>
    </>
  );
};
