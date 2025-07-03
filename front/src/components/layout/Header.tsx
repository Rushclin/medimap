"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/layout.module.css';
import Logo from '../ui/logo/Logo';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Logo withDescription/>
      </div>
      <nav className={styles.navbarNav}>
        <Link href="#how-it-works" className={styles.navLink}>Comment ça marche ?</Link>
        <Link href="#why-us" className={styles.navLink}>Pourquoi Medimap ?</Link>
        <Link href="#contact" className={styles.navLink}>Contact</Link>
      </nav>
      <div className={styles.headerActions}>
        <Link href="/map" className='border p-3 rounded-3xl border-blue-700 text-slate-600 hover:bg-blue-400 transition-colors hover:text-slate-800'>Accéder à l'App</Link>
      </div>
    </header>
  );
};

export default Header;