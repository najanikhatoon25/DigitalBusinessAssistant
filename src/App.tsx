import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { usePartnerReferral } from './hooks/usePartner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AnalysisSection } from './components/AnalysisSection';
import { PricingSection } from './components/PricingSection';
import { ReferralSection } from './components/ReferralSection';
import { Footer } from './components/Footer';
import { PartnerDrawer } from './components/PartnerDrawer';
import { Toast } from './components/Toast';
import { LegalModal } from './components/LegalModal';
import './App.css';

const MainContent: React.FC = () => {
  const { activeView } = useApp();
  usePartnerReferral();

  return (
    <div className="font-body-md text-body-md overflow-x-hidden min-h-screen bg-surface text-on-surface">
      {activeView === 'home' ? (
        <>
          <Navbar />
          <main className="mt-20">
            <Hero />
            <AnalysisSection />
            <PricingSection />
            <ReferralSection />
          </main>
          <Footer />
        </>
      ) : (
        <LegalModal />
      )}
      <PartnerDrawer />
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
