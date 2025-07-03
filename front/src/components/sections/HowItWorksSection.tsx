"use client";

import React from 'react';
import styles from '../../styles/sections.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faSearch, faRoute } from '@fortawesome/free-solid-svg-icons';

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className={styles.howItWorksSection}>
      <h2 className='recoleta'>Comment Medimap Facilite Votre Quotidien ?</h2>
      <div className={styles.stepsContainer}>
        <div className={styles.stepCard}>
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </div>
          <div className='text-xl mb-2 recoleta'>Localisez-vous Rapidement</div>
          <p>Activez votre position ou saisissez une adresse pour trouver les services les plus proches.</p>
        </div>
        <div className={styles.stepCard}>
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <div className='text-xl mb-2 recoleta'>Cherchez ce qu'il vous faut</div>
          <p>Utilisez notre barre de recherche intuitive pour trouver produits, pharmacies ou spécialités médicales.</p>
        </div>
        <div className={styles.stepCard}>
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faRoute} />
          </div>
          <div className='text-xl mb-2 recoleta'>3. Accédez au Service</div>
          <p>Obtenez des itinéraires détaillés, les horaires et les informations de contact nécessaires.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;