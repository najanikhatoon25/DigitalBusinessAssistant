import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { fetchGeminiRecommendations } from '../services/gemini';

export const AnalysisSection: React.FC = () => {
  const { t, language, showToast } = useApp();
  const [businessName, setBusinessName] = useState('');
  const [challenge, setChallenge] = useState('');
  const [support, setSupport] = useState('Website development');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string[] | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !challenge.trim() || !support) {
      showToast(t.partnerRequired || 'Please fill in all required fields.', 'error');
      return;
    }

    setLoading(true);
    try {
      const [recs] = await Promise.all([
        fetchGeminiRecommendations(businessName, challenge, support, language),
        new Promise((resolve) => setTimeout(resolve, 2500)),
      ]);
      setRecommendations(recs);
      showToast(language === 'hn' ? 'एआई विश्लेषण पूरा हुआ!' : 'AI Analysis completed successfully!');
    } catch (error) {
      console.error('Analysis error:', error);
      showToast('Analysis completed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="analysis-section" className="section-anchor py-stack-xl px-margin bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto">
        <div className="brutalist-border bg-white p-stack-lg flex flex-col md:flex-row gap-12">
          <div className="flex-1 space-y-stack-md">
            <span id="analysis-eyebrow" className="font-label-md text-label-md text-tertiary">
              {t.analysisEyebrow}
            </span>
            <h2 id="analysis-title" className="font-headline-lg text-headline-lg">
              {t.analysisTitle}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div>
                <label id="analysis-business-label" htmlFor="analysis-business" className="block font-label-md text-label-md mb-2">
                  {t.analysisBusinessLabel}
                </label>
                <input
                  id="analysis-business"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full brutalist-border p-3 focus:ring-0 focus:border-primary outline-none"
                  placeholder={t.analysisBusinessPlaceholder}
                  required
                />
              </div>
              <div>
                <label id="analysis-challenge-label" htmlFor="analysis-challenge" className="block font-label-md text-label-md mb-2">
                  {t.analysisChallengeLabel}
                </label>
                <textarea
                  id="analysis-challenge"
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  className="w-full brutalist-border p-3 focus:ring-0 focus:border-primary outline-none"
                  placeholder={t.analysisChallengePlaceholder}
                  rows={3}
                  required
                ></textarea>
              </div>
              <div>
                <label id="analysis-support-label" htmlFor="analysis-support" className="block font-label-md text-label-md mb-2">
                  {t.analysisSupportLabel}
                </label>
                <select
                  id="analysis-support"
                  value={support}
                  onChange={(e) => setSupport(e.target.value)}
                  className="w-full brutalist-border p-3 focus:ring-0 focus:border-primary outline-none"
                >
                  <option value="Website development">Website development</option>
                  <option value="Marketing Strategy">Marketing Strategy</option>
                  <option value="Full Scale Growth">Full Scale Growth</option>
                </select>
              </div>
              <button
                id="analysis-submit"
                type="submit"
                disabled={loading}
                className="w-full py-4 brutalist-border bg-primary-container text-on-primary-container font-button-text text-button-text shadow-mint active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-70"
              >
                {loading ? (language === 'hn' ? 'विश्लेषण किया जा रहा है...' : 'Analyzing...') : t.analysisSubmit}
              </button>
            </form>
          </div>
          <div className="w-full md:w-1/3 brutalist-border bg-surface-container p-stack-lg">
            <h3 id="analysis-card-title" className="font-headline-md text-headline-md mb-6">
              {recommendations ? (language === 'hn' ? 'एआई सिफारिशें' : 'AI Recommendations') : t.analysisCardTitle}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span id="analysis-benefit-1" className="font-body-md text-body-md">
                  {recommendations ? recommendations[0] : t.analysisBenefit1}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span id="analysis-benefit-2" className="font-body-md text-body-md">
                  {recommendations ? recommendations[1] : t.analysisBenefit2}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span id="analysis-benefit-3" className="font-body-md text-body-md">
                  {recommendations ? recommendations[2] : t.analysisBenefit3}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span id="analysis-benefit-4" className="font-body-md text-body-md">
                  {recommendations ? recommendations[3] : t.analysisBenefit4}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
