"use client";

import React from 'react';
import styles from '../../styles/sections.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faShieldAlt, faMobileAlt, faBell } from '@fortawesome/free-solid-svg-icons';

const WhyMedimapSection: React.FC = () => {
  return (
    <section id="why-us" className={styles.whyMedimapSection}>
      <h2>Pourquoi Choisir Medimap ?</h2>
      <div className={styles.benefitsGrid}>
        <div className={styles.benefitCard}>
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faClock} />
          </div>
          <h3>Gain de Temps Précieux</h3>
          <p>Évitez les recherches frustrantes et trouvez ce dont vous avez besoin en quelques secondes.</p>
        </div>
        <div className={styles.benefitCard}>
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faShieldAlt} />
          </div>
          <h3>Fiabilité et Précision</h3>
          <p>Des informations vérifiées et mises à jour en temps réel pour une tranquillité d'esprit.</p>
        </div>
        <div className={styles.benefitCard}>
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faMobileAlt} />
          </div>
          <h3>Interface Intuitive</h3>
          <p>Une expérience utilisateur fluide et agréable, accessible à tous.</p>
        </div>
        <div className={styles.benefitCard}>
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faBell} />
          </div>
          <h3>Alertes et Mises à Jour</h3>
          <p>Recevez des notifications sur les ouvertures exceptionnelles et les stocks (fonctionnalité à venir).</p>
        </div>
      </div>
    </section>
  );
};

export default WhyMedimapSection;