import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getPartnerById, type PartnerDoc } from '../services/firebase';

export const ReferralSection: React.FC = () => {
  const { t, partnerData, openPartnerDrawer, showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [livePartner, setLivePartner] = useState<PartnerDoc | null>(partnerData);

  // Fetch updated Firestore partner data live if partnerData is active
  useEffect(() => {
    setLivePartner(partnerData);

    if (partnerData?.id) {
      const fetchLiveDoc = async () => {
        const fresh = await getPartnerById(partnerData.id!);
        if (fresh) {
          setLivePartner(fresh);
        }
      };
      fetchLiveDoc();
    }
  }, [partnerData]);

  if (livePartner) {
    const referralCode = livePartner.referralCode || 'REF12345';
    const referralCount = livePartner.referralCount || 0;
    const name = livePartner.name || 'Partner';
    const estimatedEarnings = livePartner.estimatedEarnings ?? (referralCount * 1000);
    const referralLink = `${window.location.origin}${window.location.pathname}?ref=${referralCode}`;

    const handleCopy = () => {
      navigator.clipboard
        .writeText(referralLink)
        .then(() => {
          showToast(t.copied || 'Referral link copied!');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => console.error('Failed to copy link', err));
    };

    return (
      <section id="referral-section" className="section-anchor py-stack-xl px-margin bg-[#2d3133] text-white">
        <div className="max-w-container-max mx-auto">
          <div className="brutalist-border bg-white text-on-surface p-8 max-w-xl mx-auto space-y-6 shadow-mint">
            <div className="border-b-2 border-on-surface pb-4">
              <h3 className="font-headline-md text-headline-md">{t.welcomeBack.replace('{name}', name)}</h3>
              <p className="font-body-md text-on-surface-variant mt-1">{t.thankYouNetwork}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="brutalist-border p-4 bg-surface-container">
                <span className="block font-label-md text-label-md text-secondary uppercase tracking-wider mb-1">
                  {t.totalReferrals}
                </span>
                <span className="font-headline-lg text-headline-lg text-primary">{referralCount}</span>
              </div>
              <div className="brutalist-border p-4 bg-surface-container">
                <span className="block font-label-md text-label-md text-secondary uppercase tracking-wider mb-1">
                  {t.estimatedEarnings}
                </span>
                <span className="font-headline-lg text-headline-lg text-primary">₹{estimatedEarnings}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="block font-label-md text-label-md text-on-surface">{t.yourReferralLink}</span>
              <div className="brutalist-border p-3 bg-surface-container-low break-all select-all font-mono text-sm">
                {referralLink}
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="w-full py-4 brutalist-border bg-primary-container text-on-primary-container font-button-text text-button-text shadow-mint active:translate-y-0.5 transition-all cursor-pointer"
            >
              {copied ? t.copied : t.copyReferralLink}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="referral-section" className="section-anchor py-stack-xl px-margin bg-[#2d3133] text-white">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-stack-md">
            <span id="referral-eyebrow" className="font-label-md text-label-md text-[#22c55e] font-bold uppercase tracking-widest block">
              {t.referralEyebrow}
            </span>
            <h2 id="referral-title" className="font-headline-lg text-headline-lg text-white font-extrabold leading-tight">
              {t.referralTitle}
            </h2>
            <p id="referral-copy" className="font-body-lg text-body-lg text-[#d8dadc] max-w-xl">
              {t.referralCopy}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-[#d8dadc]/20 backdrop-blur-xs border-l-4 border-[#22c55e]">
                <h4 id="referral-why-title" className="font-headline-md text-headline-md text-white mb-2 font-bold">
                  {t.referralWhyTitle}
                </h4>
                <ul className="space-y-2 text-[#e0e3e5] font-body-md text-body-md">
                  <li id="referral-why-1">{t.referralWhy1}</li>
                  <li id="referral-why-2">{t.referralWhy2}</li>
                  <li id="referral-why-3">{t.referralWhy3}</li>
                </ul>
              </div>

              <div className="p-6 bg-[#d8dadc]/20 backdrop-blur-xs border-l-4 border-[#22c55e]">
                <h4 id="referral-support-title" className="font-headline-md text-headline-md text-white mb-2 font-bold">
                  {t.referralSupportTitle}
                </h4>
                <ul className="space-y-2 text-[#e0e3e5] font-body-md text-body-md">
                  <li id="referral-support-1">{t.referralSupport1}</li>
                  <li id="referral-support-2">{t.referralSupport2}</li>
                  <li id="referral-support-3">{t.referralSupport3}</li>
                </ul>
              </div>
            </div>

            <div className="pt-6">
              <button
                id="referral-cta"
                onClick={openPartnerDrawer}
                className="px-8 py-4 brutalist-border bg-[#22c55e] text-[#004b1e] font-button-text text-button-text font-bold shadow-mint active:translate-y-0.5 transition-all cursor-pointer hover:opacity-95"
              >
                {t.referralCta}
              </button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="brutalist-border p-3 bg-white shadow-mint -rotate-2">
              <img
                className="w-full h-auto object-cover"
                alt="3D render of professional business partners shaking hands in a high-tech corporate lounge."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5O-XEqsd21Ar59E4OJqfEbQ1WDD_fdkGaN-hWa_l4k29HCKPBu6_gyKzbNULCZ17vZqHAl1p10rMj9fkkxXyqRcAqkh2ui_7cYZ-7tBznWlMZDLW8XRqNpbyHtzJVL6Yu9fMZT-yLWk72EMLLOH8Wtxe84ys8EXvlk8Bu4KVVCt8CqGLX8w0ChW2BKTAH6oFvKpNOm-kmO3W_OPT4tlhnYsQUDABzx8e2XE8I0y-MFDxUiOMU2eHq"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
