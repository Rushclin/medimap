"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/layout.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image src="/medimap-logo.svg" alt="Medimap Logo" width={150} height={40} priority />
        </Link>
      </div>
      <nav className={styles.navbarNav}>
        <Link href="#how-it-works" className={styles.navLink}>Comment ça marche ?</Link>
        <Link href="#why-us" className={styles.navLink}>Pourquoi Medimap ?</Link>
        <Link href="#contact" className={styles.navLink}>Contact</Link>
      </nav>
      <div className={styles.headerActions}>
        <Link href="/app/dashboard" className={styles.actionButton}>Accéder à l'App</Link>
      </div>
    </header>
  );
};

export default Header;