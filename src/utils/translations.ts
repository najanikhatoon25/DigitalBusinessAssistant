export type Language = 'en' | 'hn';

export interface TranslationDictionary {
  brand: string;
  home: string;
  analysis: string;
  pricing: string;
  referral: string;
  bookDemo: string;
  tryFree: string;
  heroEyebrow: string;
  heroTitle: string;
  heroCopy: string;
  heroPrimary: string;
  heroSecondary: string;
  analysisEyebrow: string;
  analysisTitle: string;
  analysisBusinessLabel: string;
  analysisChallengeLabel: string;
  analysisSupportLabel: string;
  analysisSubmit: string;
  analysisCardTitle: string;
  analysisBenefit1: string;
  analysisBenefit2: string;
  analysisBenefit3: string;
  analysisBenefit4: string;
  analysisBusinessPlaceholder: string;
  analysisChallengePlaceholder: string;
  pricingEyebrow: string;
  pricingTitle: string;
  plan1Title: string;
  plan2Title: string;
  plan3Title: string;
  plan1Btn: string;
  plan2Btn: string;
  plan3Btn: string;
  pricingHelpTitle: string;
  pricingHelpCopy: string;
  pricingWhatsapp: string;
  referralEyebrow: string;
  referralTitle: string;
  referralCopy: string;
  referralWhyTitle: string;
  referralWhy1: string;
  referralWhy2: string;
  referralWhy3: string;
  referralSupportTitle: string;
  referralSupport1: string;
  referralSupport2: string;
  referralSupport3: string;
  referralCta: string;
  footerPrivacy: string;
  footerTerms: string;
  footerContact: string;
  footerLinkedIn: string;
  footerTwitter: string;
  termsTitle: string;
  termsCopy: string;
  termsCopy2: string;
  privacyTitle: string;
  privacyCopy: string;
  privacyCopy2: string;
  back: string;
  langLabel: string;
  partnerTitle: string;
  partnerCloseLabel: string;
  partnerNameLabel: string;
  partnerEmailLabel: string;
  partnerBusinessLabel: string;
  partnerSelectPlaceholder: string;
  partnerSubmit: string;
  partnerSuccess: string;
  partnerError: string;
  partnerRequired: string;
  welcomeBack: string;
  thankYouNetwork: string;
  totalReferrals: string;
  estimatedEarnings: string;
  yourReferralLink: string;
  copyReferralLink: string;
  copied: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    brand: 'JhaTech Growth',
    home: 'Home',
    analysis: 'Analysis',
    pricing: 'Pricing',
    referral: 'Referral',
    bookDemo: 'Book Now',
    tryFree: 'Try for Free',
    heroEyebrow: 'AI-Driven Digital Growth Platform',
    heroTitle: 'Grow your business with a smart website and marketing plan.',
    heroCopy: 'Built for shop owners, local brands, and partners who want faster growth, transparent pricing, and a simpler path to digital success.',
    heroPrimary: 'Start Your Growth Check',
    heroSecondary: 'Join Referral Program',
    analysisEyebrow: '1. CUSTOMER PAIN-POINT ANALYSIS',
    analysisTitle: 'Understand your challenge before building a solution.',
    analysisBusinessLabel: 'Business name',
    analysisChallengeLabel: 'Main challenge',
    analysisSupportLabel: 'Preferred support',
    analysisSubmit: 'Analyze with AI',
    analysisCardTitle: 'What you get',
    analysisBenefit1: 'AI-powered business analysis report',
    analysisBenefit2: 'Website + marketing recommendations',
    analysisBenefit3: 'Direct WhatsApp inquiry support',
    analysisBenefit4: 'Competitor performance benchmarking',
    analysisBusinessPlaceholder: 'e.g. Acme Studio',
    analysisChallengePlaceholder: 'What is holding you back?',
    pricingEyebrow: '2. TRANSPARENT PRICING & VALUE',
    pricingTitle: 'Simple pricing with clear value at every step.',
    plan1Title: 'Starter Growth Site',
    plan2Title: 'Growth Marketing Bundle',
    plan3Title: 'AI Smart Growth',
    plan1Btn: 'Get Started',
    plan2Btn: 'Go Premium',
    plan3Btn: 'Inquire Now',
    pricingHelpTitle: 'Need instant help?',
    pricingHelpCopy: 'Message us directly on WhatsApp for quick answers and project guidance.',
    pricingWhatsapp: 'Chat on WhatsApp',
    referralEyebrow: '3. REFERRAL PARTNER PROGRAM',
    referralTitle: 'Bring more clients and earn while helping businesses grow.',
    referralCopy: 'Our partner ecosystem rewards community members who connect high-potential businesses with our growth infrastructure.',
    referralWhyTitle: 'Why join?',
    referralWhy1: 'Earn ₹1,000 per successful sale',
    referralWhy2: 'No degree required to join',
    referralWhy3: 'AI-guided support and pitch help',
    referralSupportTitle: 'Support',
    referralSupport1: 'Ready-to-use promo scripts',
    referralSupport2: 'Exclusive growth webinars',
    referralSupport3: 'Dedicated partner dashboard',
    referralCta: 'Become a Partner',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms & Conditions',
    footerContact: 'Contact Support',
    footerLinkedIn: 'LinkedIn',
    footerTwitter: 'Twitter',
    termsTitle: 'Terms & Conditions',
    termsCopy: 'These terms outline how you may use the platform and the responsibilities of both parties.',
    termsCopy2: 'By using this site, you agree to use the content responsibly and not share misleading information.',
    privacyTitle: 'Privacy Policy',
    privacyCopy: 'We collect only the information needed to improve your experience and support your inquiries.',
    privacyCopy2: 'Your data is stored securely and is never shared without your permission.',
    back: 'Back',
    langLabel: 'Language switcher',
    partnerTitle: 'Become a Partner',
    partnerCloseLabel: 'Close partner drawer',
    partnerNameLabel: 'Full Name',
    partnerEmailLabel: 'Email Address',
    partnerBusinessLabel: 'Business Type',
    partnerSelectPlaceholder: 'Select one',
    partnerSubmit: 'Submit',
    partnerSuccess: 'Thanks! Your partner request has been received.',
    partnerError: 'Please check the form and try again.',
    partnerRequired: 'Please fill in all required fields.',
    welcomeBack: 'Welcome back, {name}!',
    thankYouNetwork: 'Thank you for being a part of our growth network.',
    totalReferrals: 'Total Referrals',
    estimatedEarnings: 'Estimated Earnings',
    yourReferralLink: 'Your Referral Link',
    copyReferralLink: 'Copy Referral Link',
    copied: 'Copied!',
  },
  hn: {
    brand: 'JhaTech Growth',
    home: 'होम',
    analysis: 'विश्लेषण',
    pricing: 'मूल्य',
    referral: 'रेफरल',
    bookDemo: 'अभी बुक करें',
    tryFree: 'मुफ़्त आज़माएँ',
    heroEyebrow: 'एआई-संचालित डिजिटल ग्रोथ प्लेटफ़ॉर्म',
    heroTitle: 'एक स्मार्ट वेबसाइट और मार्केटिंग प्लान के साथ अपने व्यवसाय को बढ़ाएँ।',
    heroCopy: 'दुकान मालिकों, स्थानीय ब्रांडों और Partners के लिए बनाया गया, जो तेज़ वृद्धि, पारदर्शी कीमत और डिजिटल सफलता की आसान राह चाहते हैं।',
    heroPrimary: 'अपना ग्रोथ चेक शुरू करें',
    heroSecondary: 'रेफरल प्रोग्राम में शामिल हों',
    analysisEyebrow: '1. ग्राहक समस्या-विश्लेषण',
    analysisTitle: 'एक समाधान बनाने से पहले अपनी चुनौती समझें।',
    analysisBusinessLabel: 'व्यवसाय का नाम',
    analysisChallengeLabel: 'मुख्य चुनौती',
    analysisSupportLabel: 'पसंदीदा सहायता',
    analysisSubmit: 'एआई के साथ विश्लेषण करें',
    analysisCardTitle: 'आपको क्या मिलेगा',
    analysisBenefit1: 'एआई-संचालित व्यवसाय विश्लेषण रिपोर्ट',
    analysisBenefit2: 'वेबसाइट + मार्केटिंग सिफ़ारिशें',
    analysisBenefit3: 'सीधी WhatsApp पूछताछ सहायता',
    analysisBenefit4: 'प्रतिस्पर्धी प्रदर्शन बेंचमार्किंग',
    analysisBusinessPlaceholder: 'उदा. Acme Studio',
    analysisChallengePlaceholder: 'आपको क्या रोक रहा है?',
    pricingEyebrow: '2. पारदर्शी मूल्य निर्धारण और मूल्य',
    pricingTitle: 'हर कदम पर स्पष्ट मूल्य के साथ सरल कीमतें।',
    plan1Title: 'स्टार्टर ग्रोथ साइट',
    plan2Title: 'ग्रोथ मार्केटिंग बंडल',
    plan3Title: 'एआई स्मार्ट ग्रोथ',
    plan1Btn: 'शुरू करें',
    plan2Btn: 'प्रीमियम जाएँ',
    plan3Btn: 'अब पूछें',
    pricingHelpTitle: 'तुरंत मदद चाहिए?',
    pricingHelpCopy: 'त्वरित उत्तर और परियोजना मार्गदर्शन के लिए सीधे WhatsApp पर हमें संदेश भेजें।',
    pricingWhatsapp: 'WhatsApp पर चैट करें',
    referralEyebrow: '3. रेफरल पार्टनर प्रोग्राम',
    referralTitle: 'अधिक ग्राहक लाएँ और व्यवसाय बढ़ाते हुए कमाएँ।',
    referralCopy: 'हमारा पार्टनर पारिस्थितिकी तंत्र उन समुदाय सदस्यों को पुरस्कृत करता है जो उच्च-उम्मीदवारी वाले व्यवसायों को हमारी वृद्धि संरचना से जोड़ते हैं।',
    referralWhyTitle: 'क्यों शामिल हों?',
    referralWhy1: 'प्रत्येक सफल बिक्री पर ₹1,000 कमाएँ',
    referralWhy2: 'शामिल होने के लिए डिग्री की आवश्यकता नहीं',
    referralWhy3: 'एआई-निर्देशित सहायता और पिच हेल्प',
    referralSupportTitle: 'सहायता',
    referralSupport1: 'तैयार-पैकेज प्रचार स्क्रिप्ट',
    referralSupport2: 'विशेष वृद्धि वेबिनार',
    referralSupport3: 'समर्पित पार्टनर डैशबोर्ड',
    referralCta: 'पार्टनर बनें',
    footerPrivacy: 'गोपनीयता नीति',
    footerTerms: 'शर्तें और नियम',
    footerContact: 'समर्थन से संपर्क करें',
    footerLinkedIn: 'लिंक्डइन',
    footerTwitter: 'ट्विटर',
    termsTitle: 'शर्तें और नियम',
    termsCopy: 'ये शर्तें बताते हैं कि आप इस प्लेटफ़ॉर्म का उपयोग कैसे कर सकते हैं और दोनों पक्षों की ज़िम्मेदारियाँ क्या हैं।',
    termsCopy2: 'इस साइट का उपयोग करके, आप सामग्री का जिम्मेदारी से उपयोग करने और भ्रामक जानकारी साझा नहीं करने पर सहमत होते हैं।',
    privacyTitle: 'गोपनीयता नीति',
    privacyCopy: 'हम आपके अनुभव को बेहतर बनाने और आपकी पूछताछ का समर्थन करने के लिए केवल आवश्यक जानकारी एकत्र करते हैं।',
    privacyCopy2: 'आपका डेटा सुरक्षित रूप से संग्रहीत किया जाता है और आपकी अनुमति के बिना साझा नहीं किया जाता है।',
    back: 'वापस',
    langLabel: 'भाषा बदलने वाला',
    partnerTitle: 'पार्टनर बनें',
    partnerCloseLabel: 'पार्टनर डैशबोर्ड बंद करें',
    partnerNameLabel: 'पूरा नाम',
    partnerEmailLabel: 'ईमेल पता',
    partnerBusinessLabel: 'व्यवसाय प्रकार',
    partnerSelectPlaceholder: 'एक चुनें',
    partnerSubmit: 'भेजें',
    partnerSuccess: 'धन्यवाद! आपकी पार्टनर अनुरोध प्राप्त हो गई है।',
    partnerError: 'कृपया फॉर्म की जाँच करें और फिर से कोशिश करें।',
    partnerRequired: 'कृपया सभी अनिवार्य फील्ड भरें।',
    welcomeBack: 'स्वागत है, {name}!',
    thankYouNetwork: 'हमारे विकास नेटवर्क का हिस्सा बनने के लिए धन्यवाद।',
    totalReferrals: 'कुल रेफरल',
    estimatedEarnings: 'अनुमानित कमाई',
    yourReferralLink: 'आपका रेफरल लिंक',
    copyReferralLink: 'रेफरल लिंक कॉपी करें',
    copied: 'कॉपी किया गया!',
  },
};
