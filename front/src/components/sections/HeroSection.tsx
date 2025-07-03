"use client";

import React from 'react';
import Image from 'next/image'; // Pour des images optimisées
import LocationCrossIcon from '../../icons/LocationCrossIcon'; // Notre icône personnalisée
import styles from '../../styles/sections.module.css';
import uiStyles from '../../styles/ui.module.css';
import Link from 'next/link';

 function StatsSection() {
  const stats = [
    { value: "1000+", label: "Pharmacies Partenaires" },
    { value: "500+", label: "Hôpitaux Référencés" },
    { value: "24/7", label: "Disponibilité" },
  ];

  return (
    <section className="bg-white py-1 px-3">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl border border-blue-400 bg-slate-50/2 animate-fade-in-up"
            style={{ animationDelay: `${index * 150}ms`, animationFillMode: "both" }}
          >
            <h3 className="recoleta text-4xl font-bold text-blue-600">{stat.value}</h3>
            <p className="recoleta text-gray-700 text-lg">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className="recoleta text-5xl">Medimap : Votre Santé, à Portée de Main.</h1>
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
          <Link href="/map" passHref> {/* Assure-toi que la route /map est correcte */}
          <button className="bg-blue-600 rounded-full text-white px-8 py-4  text-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg">
            Commencer
          </button>
        </Link>
        </div>
        {/* <div className="">
          <span><strong>1000+</strong> Pharmacies Partenaires</span>
          <span><strong>500+</strong> Hôpitaux Référencés</span>
          <span><strong>24/7</strong> Disponibilité</span>
        </div> */}
<StatsSection/>
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