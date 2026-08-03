import { useEffect } from 'react';
import { processReferralCode } from '../services/firebase';

export function usePartnerReferral() {
  useEffect(() => {
    const handleReferralActivation = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const refCode = urlParams.get('ref');
      if (refCode) {
        try {
          await processReferralCode(refCode);
        } catch (error) {
          console.error('Failed to process referral activation:', error);
        }
      }
    };

    handleReferralActivation();
  }, []);
}
