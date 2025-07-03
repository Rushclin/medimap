import React from 'react';
import Link from 'next/link';
import styles from '../../styles/layout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import Logo from '../ui/logo/Logo';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          {/* <Image src="/medimap-logo.svg" alt="Medimap Logo" width={120} height={35} /> */}
          <Logo/>
          <p className={styles.footerDescription}>Votre guide indispensable pour trouver rapidement la pharmacie et les produits dont vous avez besoin, près de chez vous.</p>
          <div className={styles.socialLinks}>
            <a href="https://facebook.com/medimap" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="https://twitter.com/medimap" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="https://instagram.com/medimap" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="https://linkedin.com/company/medimap" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedinIn} /></a>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3>Liens Rapides</h3>
          <ul>
            <li><Link href="/#how-it-works" className={styles.footerLink}>Comment ça marche ?</Link></li>
            <li><Link href="/#why-us" className={styles.footerLink}>Pourquoi Medimap ?</Link></li>
            <li><Link href="/contact" className={styles.footerLink}>Contact</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Support</h3>
          <ul>
            <li><Link href="/faq" className={styles.footerLink}>FAQ</Link></li>
            <li><Link href="/privacy" className={styles.footerLink}>Politique de Confidentialité</Link></li>
            <li><Link href="/terms" className={styles.footerLink}>Conditions d'Utilisation</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Contactez-nous</h3>
          <p>Email: <a href="mailto:contact@medimap.com" className={styles.footerLink}>contact@medimap.com</a></p>
          <p>Téléphone: <a href="tel:+2376XXXXXXXX" className={styles.footerLink}>+237 6XX XXX XXX</a></p>
          <p>Adresse: Yaoundé, Cameroun</p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        &copy; {new Date().getFullYear()} Medimap. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;