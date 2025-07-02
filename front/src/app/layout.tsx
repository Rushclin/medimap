// "use client"; // Pas nécessaire ici à moins d'interactions directes dans le layout lui-même.

import './globals.css'; // Importe tes styles CSS globaux de base.

// Ces imports pointent vers des composants dans src/components/layout
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// Métadonnées pour l'application (SEO, titre par défaut)
export const metadata = {
  title: 'Medimap - Trouvez Pharmacies et Hôpitaux Proches Facilement',
  description: 'Medimap : Votre guide santé local pour trouver rapidement pharmacies, hôpitaux et services médicaux. Localisation, horaires, et spécialités à portée de main.',
  keywords: ['pharmacie', 'hôpital', 'santé', 'localisation', 'médecin', 'urgence', 'Cameroun'],
  authors: [{ name: 'Medimap Team' }],
  creator: 'Medimap Team',
  publisher: 'Medimap Inc.',
  openGraph: { // Optimisation pour le partage sur les réseaux sociaux
    title: 'Medimap - Votre Santé, à Portée de Main',
    description: 'Trouvez et localisez pharmacies, hôpitaux et services de santé près de chez vous avec Medimap.',
    url: 'https://www.medimap.com', // Remplace par ton URL réelle
    siteName: 'Medimap',
    images: [
      {
        url: 'https://www.medimap.com/og-image.jpg', // Une image à créer pour l'aperçu OG
        width: 1200,
        height: 630,
        alt: 'Medimap - Localisation Santé',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: { // Optimisation pour Twitter
    card: 'summary_large_image',
    title: 'Medimap - Votre Santé, à Portée de Main',
    description: 'Trouvez et localisez pharmacies, hôpitaux et services de santé près de chez vous avec Medimap.',
    creator: '@MedimapApp', // Ton handle Twitter si tu en as un
    images: ['https://www.medimap.com/twitter-image.jpg'], // Image spécifique pour Twitter
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <Header />
        {children} {/* Le contenu de la page (ex: page.tsx) sera injecté ici */}
        <Footer />
      </body>
    </html>
  );
}