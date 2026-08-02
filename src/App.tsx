import { useState, useEffect, type FormEvent } from 'react'
import './App.css'
import { db } from './firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

type Language = 'en' | 'hi'

type AnalysisResult = {
  recommendations: string[]
}

const translations = {
  en: {
    brand: 'JhaTech Growth',
    viewPricing: 'View Pricing',
    eyebrow: 'AI-Driven Digital Growth Platform',
    heroTitle: 'Grow your business with a smart website and marketing plan.',
    heroCopy:
      'Built for shop owners, local brands, and partners who want faster growth, transparent pricing, and a simpler path to digital success.',
    startGrowth: 'Start Your Growth Check',
    joinReferral: 'Join Referral Program',
    bookNow: 'Book Now',
    whatYouGetTitle: 'What you get',
    whatYouGetItems: [
      'AI-powered business analysis',
      'Website + marketing recommendations',
      'Direct WhatsApp inquiry support',
    ],
    analysisTitle: 'AI analysis',
    analysisHint: 'Share a short detail and get 4 quick recommendations right here.',
    businessNameLabel: 'Business name',
    businessNamePlaceholder: 'e.g. Shri Saree House',
    challengeLabel: 'Main challenge',
    challengePlaceholder: 'Tell us what is slowing your growth right now.',
    supportLabel: 'Preferred support',
    supportPlaceholder: 'Select an option',
    supportOptionWebsite: 'Website development',
    supportOptionMarketing: 'Digital marketing',
    supportOptionBoth: 'Both',
    analyzeButton: 'Analyze with AI',
    analysisReady: 'Here are 4 quick recommendations for your business.',
    formError: 'Please complete every field before analyzing.',
    analysisSectionTitle: 'Suggested AI report',
    analysisSectionText:
      'The system turns your responses into a clear report with website and marketing recommendations tailored to your business.',
    painPoints: [
      'Low footfall and slow inquiries',
      'Website looks outdated on mobile',
      'No clear lead generation funnel',
      'Marketing budget feels uncertain',
    ],
    sectionOneEyebrow: '1. Customer Pain-Point Analysis',
    sectionOneTitle: 'Understand your challenge before building a solution.',
    sectionTwoEyebrow: '2. Transparent Pricing & Value',
    sectionTwoTitle: 'Simple pricing with clear value at every step.',
    sectionThreeEyebrow: '3. Referral Partner Program',
    sectionThreeTitle: 'Bring more clients and earn while helping businesses grow.',
    sectionFourEyebrow: '4. Continuous Improvement',
    sectionFourTitle: 'Stay ahead with AI insights and feature upgrades.',
    needHelpTitle: 'Need instant help?',
    needHelpCopy: 'Message us directly on WhatsApp for quick answers and project guidance.',
    chatWhatsApp: 'Chat on WhatsApp',
    whyJoinTitle: 'Why join?',
    referralPerks: [
      'Earn ₹1,000 for every successful sale',
      'No degree required to join',
      'Receive AI-guided support and pitch help',
    ],
    partnerSupportTitle: 'Partner support',
    partnerSupportCopy:
      'Get AI-powered guidance, promo scripts, and quick doubt-clearing support to recommend our services confidently.',
    becomePartner: 'Become a Partner',
    improvementOneTitle: 'Competitor analysis',
    improvementOneCopy: 'Track new offers and features in your market to keep your offer fresh.',
    improvementTwoTitle: 'Trend-based feature ideas',
    improvementTwoCopy:
      'Recommend improvements like booking forms, chat widgets, and local SEO tools.',
    pricingCards: [
      {
        name: 'Starter Growth Site',
        price: '₹18,000',
        features: ['5-page responsive website', 'WhatsApp booking button', 'Basic SEO setup'],
      },
      {
        name: 'Growth Marketing Bundle',
        price: '₹35,000',
        features: ['Everything in Starter', 'Google Business Profile setup', 'Social media content plan'],
      },
      {
        name: 'AI Smart Growth',
        price: '₹55,000',
        features: ['Everything in Growth', 'AI lead analysis', 'Monthly competitor insights'],
      },
    ],
    footer: '© 2026 JhaTech Growth. All rights reserved. Built for high-velocity enterprise expansion.',
    languageLabel: 'Language',
  },
  hi: {
    brand: 'JhaTech Growth',
    viewPricing: 'मूल्य देखें',
    eyebrow: 'AI-आधारित डिजिटल ग्रोथ प्लेटफ़ॉर्म',
    heroTitle: 'एक स्मार्ट वेबसाइट और मार्केटिंग प्लान के साथ अपने बिज़नेस को बढ़ाएँ।',
    heroCopy:
      'दुकान मालिकों, स्थानीय ब्रांड्स और साझेदारों के लिए बनाया गया, जो तेज़ ग्रोथ, स्पष्ट मूल्य और डिजिटल सफलता की आसान राह चाहते हैं।',
    startGrowth: 'अपनी ग्रोथ चेक शुरू करें',
    joinReferral: 'रेफ़रल प्रोग्राम में शामिल हों',
    bookNow: 'अभी बुक करें',
    whatYouGetTitle: 'आपको क्या मिलेगा',
    whatYouGetItems: [
      'AI-आधारित बिज़नेस विश्लेषण',
      'वेबसाइट + मार्केटिंग सिफ़ारिशें',
      'सीधा WhatsApp inquiry support',
    ],
    analysisTitle: 'AI विश्लेषण',
    analysisHint: 'एक संक्षिप्त विवरण साझा करें और यहाँ 4 त्वरित सिफ़ारिशें देखें।',
    businessNameLabel: 'व्यापार का नाम',
    businessNamePlaceholder: 'उदा. श्री साड़ी हाउस',
    challengeLabel: 'मुख्य चुनौती',
    challengePlaceholder: 'बताएँ कि आपकी ग्रोथ में क्या रुकावट आ रही है।',
    supportLabel: 'पसंदीदा सहायता',
    supportPlaceholder: 'किसी विकल्प का चयन करें',
    supportOptionWebsite: 'वेबसाइट डेवलपमेंट',
    supportOptionMarketing: 'डिजिटल मार्केटिंग',
    supportOptionBoth: 'दोनों',
    analyzeButton: 'AI से विश्लेषण करें',
    analysisReady: 'आपके बिज़नेस के लिए 4 त्वरित सिफ़ारिशें यहाँ हैं।',
    formError: 'विश्लेषण करने से पहले सभी फील्ड भरें।',
    analysisSectionTitle: 'सुझाई गई AI रिपोर्ट',
    analysisSectionText:
      'यह सिस्टम आपके जवाबों को एक स्पष्ट रिपोर्ट में बदलता है जिसमें आपकी बिज़नेस के लिए वेबसाइट और मार्केटिंग सिफ़ारिशें शामिल होती हैं।',
    painPoints: [
      'कम footfall और धीमी inquiries',
      'वेबसाइट मोबाइल पर पुरानी दिखती है',
      'स्पष्ट lead generation funnel नहीं है',
      'मार्केटिंग बजट अस्पष्ट है',
    ],
    sectionOneEyebrow: '1. ग्राहक समस्या-विचार विश्लेषण',
    sectionOneTitle: 'समाधान बनाने से पहले अपनी चुनौती को समझें।',
    sectionTwoEyebrow: '2. पारदर्शी मूल्य और मूल्य',
    sectionTwoTitle: 'हर कदम पर स्पष्ट मूल्य के साथ सरल pricing।',
    sectionThreeEyebrow: '3. रेफ़रल पार्टनर प्रोग्राम',
    sectionThreeTitle: 'अधिक ग्राहक लाएँ और बिज़नेस बढ़ाते हुए कमाएँ।',
    sectionFourEyebrow: '4. निरंतर सुधार',
    sectionFourTitle: 'AI insights और नई सुविधाओं के साथ आगे रहें।',
    needHelpTitle: 'तत्काल मदद चाहिए?',
    needHelpCopy: 'त्वरित उत्तर और प्रोजेक्ट मार्गदर्शन के लिए WhatsApp पर सीधे संदेश करें।',
    chatWhatsApp: 'WhatsApp पर चैट करें',
    whyJoinTitle: 'क्यों शामिल हों?',
    referralPerks: [
      'हर सफल sale पर ₹1,000 कमाएँ',
      'शामिल होने के लिए डिग्री की ज़रूरत नहीं',
      'AI-निर्देशित support और pitch help प्राप्त करें',
    ],
    partnerSupportTitle: 'पार्टनर support',
    partnerSupportCopy:
      'AI-आधारित guidance, promo scripts और त्वरित स्पष्टीकरण support से अपने सुझावों को आत्मविश्वास से साझा करें।',
    becomePartner: 'पार्टनर बनें',
    improvementOneTitle: 'प्रतिस्पर्धी विश्लेषण',
    improvementOneCopy: 'अपने बाजार में नए ऑफ़र और फीचर्स पर नज़र रखें ताकि आपकी पेशकश ताज़ा रहे।',
    improvementTwoTitle: 'रुझान-आधारित फीचर विचार',
    improvementTwoCopy:
      'बुकिंग फॉर्म, चैट विजेट और लोकल SEO टूल जैसे सुधार सुझाएँ।',
    pricingCards: [
      {
        name: 'स्टार्टर ग्रोथ साइट',
        price: '₹18,000',
        features: ['5-पेज responsive वेबसाइट', 'WhatsApp booking button', 'बुनियादी SEO setup'],
      },
      {
        name: 'ग्रोथ मार्केटिंग बंडल',
        price: '₹35,000',
        features: ['स्टार्टर की सब कुछ', 'Google Business Profile setup', 'सोशल मीडिया content plan'],
      },
      {
        name: 'AI स्मार्ट ग्रोथ',
        price: '₹55,000',
        features: ['ग्रोथ की सब कुछ', 'AI lead analysis', 'मासिक competitor insights'],
      },
    ],
    footer: '© 2026 JhaTech Growth. सर्वाधिकार सुरक्षित। हाई-वेलोसीटी एंटरप्राइज़ एक्स्पेंशन के लिए बनाया गया।',
    languageLabel: 'भाषा',
  },
}

function buildRecommendations(language: Language, businessName: string) {
  if (language === 'hi') {
    return [
      `“${businessName || 'आपका बिज़नेस'}” के लिए मोबाइल-फ्रेंडली लैंडिंग पेज बनाएँ।`,
      'एक स्पष्ट WhatsApp booking flow जोड़ें ताकि inquiries जल्दी हों।',
      'लोकल SEO और Google Business Profile से visibility बढ़ाएँ।',
      'एक सरल lead nurturing sequence शुरू करें ताकि ग्राहक जल्दी जवाब पाएँ।',
    ]
  }

  return [
    `Create a mobile-friendly landing page for ${businessName || 'your business'}.`,
    'Add a clear WhatsApp booking flow so inquiries are easier to convert.',
    'Improve local visibility with SEO and a stronger Google Business Profile.',
    'Set up a simple follow-up sequence so leads stay engaged after the first visit.',
  ]
}

function App() {
  const [language, setLanguage] = useState<Language>('en')
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [formData, setFormData] = useState({ businessName: '', challenge: '', support: '' })
  const [message, setMessage] = useState('')
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)

  const t = translations[language]

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if (refCode) {
      localStorage.setItem('jhaTechReferralCode', refCode);
    }
  }, []);

  const handleAnalyze = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formData.businessName.trim() || !formData.challenge.trim() || !formData.support.trim()) {
      setAnalysis(null)
      setMessage(t.formError)
      return
    }

    const recommendations = buildRecommendations(language, formData.businessName.trim())

    try {
      const refCode = localStorage.getItem('jhaTechReferralCode') || null;
      await addDoc(collection(db, 'analyses'), {
        businessName: formData.businessName.trim(),
        challenge: formData.challenge.trim(),
        support: formData.support.trim(),
        referralCode: refCode,
        submittedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('Failed to save analysis to Firestore', err);
    }

    setAnalysis({ recommendations })
    setMessage(t.analysisReady)
  }

  const openCalendly = () => {
    // --- CALENDLY URL PLACEHOLDER ---
    // You can replace the URL below with your custom Calendly link
    const calendlyUrl = 'https://calendly.com/jhatech-growth/30min';
    // ---------------------------------
    const calendlyObj = (window as any).Calendly;
    if (calendlyObj && typeof calendlyObj.initPopupWidget === 'function') {
      calendlyObj.initPopupWidget({ url: calendlyUrl });
    } else {
      window.open(calendlyUrl, '_blank', 'width=1000,height=700,scrollbars=1');
    }
  }

  return (
    <div className="app-shell">
      <header className="hero-section">
        <nav className="topbar">
          <div className="brand">{t.brand}</div>
          <div className="topbar-actions">
            <button type="button" className="secondary-btn" onClick={openCalendly}>
              {t.bookNow}
            </button>
            <div className="lang-switcher" aria-label={t.languageLabel}>
              <button
                type="button"
                className="lang-trigger"
                onClick={() => setLanguageMenuOpen((current) => !current)}
                aria-expanded={languageMenuOpen}
              >
                <span className="lang-icon" aria-hidden="true">
                  🌐
                </span>
              </button>
              {languageMenuOpen ? (
                <div className="lang-menu">
                  <button
                    type="button"
                    className={language === 'en' ? 'lang-option active' : 'lang-option'}
                    onClick={() => {
                      setLanguage('en')
                      setLanguageMenuOpen(false)
                    }}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    className={language === 'hi' ? 'lang-option active' : 'lang-option'}
                    onClick={() => {
                      setLanguage('hi')
                      setLanguageMenuOpen(false)
                    }}
                  >
                    Hindi
                  </button>
                </div>
              ) : null}
            </div>
            <a className="nav-link" href="#pricing">
              {t.viewPricing}
            </a>
          </div>
        </nav>

        <div className="hero-grid">
          <div>
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.heroTitle}</h1>
            <p className="hero-copy">{t.heroCopy}</p>
            <div className="hero-actions">
              <a className="primary-btn" href="#pain-point-form">
                {t.startGrowth}
              </a>
              <a className="secondary-btn" href="#referral">
                {t.joinReferral}
              </a>
            </div>
          </div>

          <div className="hero-stack">
            <div className="hero-card">
              <h3>{t.whatYouGetTitle}</h3>
              <ul>
                {t.whatYouGetItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="analysis-card">
              <h3>{t.analysisTitle}</h3>
              <p className="analysis-hint">{t.analysisHint}</p>
              <form onSubmit={handleAnalyze} className="form-card compact-form">
                <label>
                  {t.businessNameLabel}
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(event) =>
                      setFormData((current) => ({ ...current, businessName: event.target.value }))
                    }
                    placeholder={t.businessNamePlaceholder}
                  />
                </label>
                <label>
                  {t.challengeLabel}
                  <textarea
                    value={formData.challenge}
                    onChange={(event) =>
                      setFormData((current) => ({ ...current, challenge: event.target.value }))
                    }
                    placeholder={t.challengePlaceholder}
                  />
                </label>
                <label>
                  {t.supportLabel}
                  <select
                    value={formData.support}
                    onChange={(event) =>
                      setFormData((current) => ({ ...current, support: event.target.value }))
                    }
                  >
                    <option value="">{t.supportPlaceholder}</option>
                    <option value={t.supportOptionWebsite}>{t.supportOptionWebsite}</option>
                    <option value={t.supportOptionMarketing}>{t.supportOptionMarketing}</option>
                    <option value={t.supportOptionBoth}>{t.supportOptionBoth}</option>
                  </select>
                </label>
                <button type="submit" className="primary-btn full-width">
                  {t.analyzeButton}
                </button>
              </form>
              {message ? <p className="status-message">{message}</p> : null}
              {analysis ? (
                <div className="analysis-output">
                  <h4>{t.analysisSectionTitle}</h4>
                  <ul>
                    {analysis.recommendations.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p>{t.analysisSectionText}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="pain-point-form" className="section-card">
          <div className="section-heading">
            <p className="eyebrow">{t.sectionOneEyebrow}</p>
            <h2>{t.sectionOneTitle}</h2>
          </div>

          <div className="content-grid">
            <div className="insight-card">
              <h3>{t.analysisSectionTitle}</h3>
              <ul>
                {t.painPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p>{t.analysisSectionText}</p>
            </div>

            <div className="form-card">
              <h3>{t.analysisTitle}</h3>
              <p>{t.analysisHint}</p>
              <button type="button" className="primary-btn full-width" onClick={openCalendly}>
                {t.bookNow}
              </button>
            </div>
          </div>
        </section>

        <section id="pricing" className="section-card">
          <div className="section-heading">
            <p className="eyebrow">{t.sectionTwoEyebrow}</p>
            <h2>{t.sectionTwoTitle}</h2>
          </div>

          <div className="pricing-grid">
            {t.pricingCards.map((card) => (
              <article key={card.name} className="price-card">
                <h3>{card.name}</h3>
                <p className="price">{card.price}</p>
                <ul>
                  {card.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="whatsapp-box">
            <h3>{t.needHelpTitle}</h3>
            <p>{t.needHelpCopy}</p>
            <a className="primary-btn" href="https://wa.me/919999999999" target="_blank" rel="noreferrer">
              {t.chatWhatsApp}
            </a>
          </div>
        </section>

        <section id="referral" className="section-card">
          <div className="section-heading">
            <p className="eyebrow">{t.sectionThreeEyebrow}</p>
            <h2>{t.sectionThreeTitle}</h2>
          </div>

          <div className="content-grid">
            <div className="insight-card">
              <h3>{t.whyJoinTitle}</h3>
              <ul>
                {t.referralPerks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
            </div>

            <div className="form-card">
              <h3>{t.partnerSupportTitle}</h3>
              <p>{t.partnerSupportCopy}</p>
              <button type="button" className="primary-btn full-width" onClick={openCalendly}>
                {t.becomePartner}
              </button>
            </div>
          </div>
        </section>

        <section className="section-card">
          <div className="section-heading">
            <p className="eyebrow">{t.sectionFourEyebrow}</p>
            <h2>{t.sectionFourTitle}</h2>
          </div>

          <div className="improvement-list">
            <div>
              <h3>{t.improvementOneTitle}</h3>
              <p>{t.improvementOneCopy}</p>
            </div>
            <div>
              <h3>{t.improvementTwoTitle}</h3>
              <p>{t.improvementTwoCopy}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>{t.footer}</p>
      </footer>
    </div>
  )
}

export default App
