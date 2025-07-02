"use client";

import React from 'react';
import Image from 'next/image'; // Pour des images optimisées
import LocationCrossIcon from '../../icons/LocationCrossIcon'; // Notre icône personnalisée
import styles from '../../styles/sections.module.css';
import uiStyles from '../../styles/ui.module.css';

const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Medimap : Votre Santé, à Portée de Main.</h1>
        <p className={styles.heroSubtitle}>
          Trouvez instantanément la pharmacie ou l'hôpital le plus proche, disponible et adapté à vos besoins.
          Simplifiez votre accès aux soins avec une recherche intuitive et des informations fiables.
        </p>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Rechercher un produit, une pharmacie, une spécialité..."
            className={uiStyles.inputField}
          />
          <button className={uiStyles.primaryButton}>Commencer</button>
        </div>
        <div className={styles.heroStats}>
          <span><strong>1000+</strong> Pharmacies Partenaires</span>
          <span><strong>500+</strong> Hôpitaux Référencés</span>
          <span><strong>24/7</strong> Disponibilité</span>
        </div>
      </div>
      <div className={styles.heroVisual}>
        {/* L'icône de localisation avec une touche médicale */}
        <LocationCrossIcon className={styles.heroIcon} width={350} height={350} color="#0070f3" />
        {/* Tu peux ajouter une image de fond de carte stylisée ici */}
        {/* <Image src="/hero-map-illustration.png" alt="Carte stylisée" width={500} height={400} className={styles.mapIllustration} /> */}
      </div>
    </section>
  );
};

export default HeroSection;