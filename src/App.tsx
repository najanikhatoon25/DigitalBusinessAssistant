import './App.css'

const painPoints = [
  'Low footfall and slow inquiries',
  'Website looks outdated on mobile',
  'No clear lead generation funnel',
  'Marketing budget feels uncertain',
]

const pricingCards = [
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
]

const referralPerks = [
  'Earn ₹1,000 for every successful sale',
  'No degree required to join',
  'Receive AI-guided support and pitch help',
]

function App() {
  return (
    <div className="app-shell">
      <header className="hero-section">
        <nav className="topbar">
          <div className="brand">JhaTech Growth</div>
          <a className="nav-link" href="#pricing">
            View Pricing
          </a>
        </nav>

        <div className="hero-grid">
          <div>
            <p className="eyebrow">AI-Driven Digital Growth Platform</p>
            <h1>Grow your business with a smart website and marketing plan.</h1>
            <p className="hero-copy">
              Built for shop owners, local brands, and partners who want faster growth,
              transparent pricing, and a simpler path to digital success.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="#pain-point-form">
                Start Your Growth Check
              </a>
              <a className="secondary-btn" href="#referral">
                Join Referral Program
              </a>
            </div>
          </div>

          <div className="hero-card">
            <h3>What you get</h3>
            <ul>
              <li>AI-powered business analysis</li>
              <li>Website + marketing recommendations</li>
              <li>Direct WhatsApp inquiry support</li>
            </ul>
          </div>
        </div>
      </header>

      <main>
        <section id="pain-point-form" className="section-card">
          <div className="section-heading">
            <p className="eyebrow">1. Customer Pain-Point Analysis</p>
            <h2>Understand your challenge before building a solution.</h2>
          </div>

          <div className="content-grid">
            <form className="form-card">
              <label>
                Business name
                <input type="text" placeholder="e.g. Shri Saree House" />
              </label>
              <label>
                Main challenge
                <textarea placeholder="Tell us what is slowing your growth right now." />
              </label>
              <label>
                Preferred support
                <select defaultValue="">
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option>Website development</option>
                  <option>Digital marketing</option>
                  <option>Both</option>
                </select>
              </label>
              <button type="button" className="primary-btn full-width">
                Analyze with AI
              </button>
            </form>

            <div className="insight-card">
              <h3>Suggested AI report</h3>
              <ul>
                {painPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p>
                The system will turn your responses into a clear report with website and
                marketing recommendations tailored to your business.
              </p>
            </div>
          </div>
        </section>

        <section id="pricing" className="section-card">
          <div className="section-heading">
            <p className="eyebrow">2. Transparent Pricing & Value</p>
            <h2>Simple pricing with clear value at every step.</h2>
          </div>

          <div className="pricing-grid">
            {pricingCards.map((card) => (
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
            <h3>Need instant help?</h3>
            <p>Message us directly on WhatsApp for quick answers and project guidance.</p>
            <a className="primary-btn" href="https://wa.me/919999999999" target="_blank" rel="noreferrer">
              Chat on WhatsApp
            </a>
          </div>
        </section>

        <section id="referral" className="section-card">
          <div className="section-heading">
            <p className="eyebrow">3. Referral Partner Program</p>
            <h2>Bring more clients and earn while helping businesses grow.</h2>
          </div>

          <div className="content-grid">
            <div className="insight-card">
              <h3>Why join?</h3>
              <ul>
                {referralPerks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
            </div>

            <div className="form-card">
              <h3>Partner support</h3>
              <p>
                Get AI-powered guidance, promo scripts, and quick doubt-clearing support to
                recommend our services confidently.
              </p>
              <button type="button" className="primary-btn full-width">
                Become a Partner
              </button>
            </div>
          </div>
        </section>

        <section className="section-card">
          <div className="section-heading">
            <p className="eyebrow">4. Continuous Improvement</p>
            <h2>Stay ahead with AI insights and feature upgrades.</h2>
          </div>

          <div className="improvement-list">
            <div>
              <h3>Competitor analysis</h3>
              <p>Track new offers and features in your market to keep your offer fresh.</p>
            </div>
            <div>
              <h3>Trend-based feature ideas</h3>
              <p>Recommend improvements like booking forms, chat widgets, and local SEO tools.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
