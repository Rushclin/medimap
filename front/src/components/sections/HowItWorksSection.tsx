"use client";

import React from 'react';
import styles from '../../styles/sections.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faSearch, faRoute } from '@fortawesome/free-solid-svg-icons';

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className={styles.howItWorksSection}>
      <h2>Comment Medimap Facilite Votre Quotidien ?</h2>
      <div className={styles.stepsContainer}>
        <div className={styles.stepCard}>
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </div>
          <h3>1. Localisez-vous Rapidement</h3>
          <p>Activez votre position ou saisissez une adresse pour trouver les services les plus proches.</p>
        </div>
        <div className={styles.stepCard}>
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <h3>2. Cherchez ce qu'il vous faut</h3>
          <p>Utilisez notre barre de recherche intuitive pour trouver produits, pharmacies ou spécialités médicales.</p>
        </div>
        <div className={styles.stepCard}>
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faRoute} />
          </div>
          <h3>3. Accédez au Service</h3>
          <p>Obtenez des itinéraires détaillés, les horaires et les informations de contact nécessaires.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;