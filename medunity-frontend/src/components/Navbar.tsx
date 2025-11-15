// src/components/Navbar.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeartIcon } from '@heroicons/react/24/solid';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/medunity.png" alt="MedUnity logo" />
        <span>MedUnity</span>
      </div>
      <nav className={styles.navLinks}>
        <Link href="/" className={isActive('/Home') ? styles.active : styles.link}>Home</Link>
        <Link href="/our-activities" className={isActive('/our-activities') ? styles.active : styles.link}>Our Activities</Link>
        <Link href="/news" className={isActive('/news') ? styles.active : styles.link}>News</Link>
        <Link href="/team" className={isActive('/stuff') ? styles.active : styles.link}>Our Stuff</Link>
        <Link href="/contact" className={isActive('/contact') ? styles.active : styles.link}>Contact</Link>
        <Link href="/qr" className={isActive('/qr') ? styles.active : styles.link}>Q/R</Link>
      </nav>
    </header>
  );
}