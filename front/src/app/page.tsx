"use client"; // Indique que ce composant est un client component, nécessaire pour l'interactivité

import HeroSection from '../components/sections/HeroSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import WhyMedimapSection from '../components/sections/WhyMedimapSection';
import CallToActionSection from '../components/sections/CallToActionSection';

import styles from '../styles/home.module.css'; // Styles spécifiques à la page Home

export default function HomePage() {
  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <HeroSection />
        <HowItWorksSection />
        <WhyMedimapSection />
        <CallToActionSection />
      </main>
    </div>
  );
}