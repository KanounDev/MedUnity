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
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <HeartIcon className={styles.icon} />
          <span className={styles.name}>MedUnity</span>
        </Link>
        <div className={styles.links}>
          <Link
            href="/team"
            className={isActive('/team') ? styles.active : styles.link}
          >
            Our Team
          </Link>
          <Link
            href="/contact"
            className={isActive('/contact') ? styles.active : styles.link}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
}