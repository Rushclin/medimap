"use client";

import React from 'react';
import Link from 'next/link';
import styles from '../../styles/sections.module.css'; // Utilise les styles de sections.module.css pour la CTA

const CallToActionSection: React.FC = () => {
  return (
    <section id="contact" className={styles.ctaSection}>
      <h2>Prêt à Simplifier Votre Accès à la Santé ?</h2>
      <p>Rejoignez des milliers d'utilisateurs qui font confiance à Medimap pour trouver leurs services de santé essentiels.</p>
      <Link href="/app/dashboard" className={styles.ctaButton}>
        Démarrer Votre Recherche Maintenant
      </Link>
    </section>
  );
};

export default CallToActionSection;