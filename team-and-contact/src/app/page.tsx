// src/app/page.tsx
import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/solid';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.hero}>
      <HeartIcon className={styles.icon} />
      <h1 className={styles.title}>MedUnity</h1>
      <p className={styles.subtitle}>Votre laboratoire de pathologie de confiance</p>
      <div className={styles.actions}>
        <Link href="/team" className={styles.btn}>Notre Équipe</Link>
        <Link href="/contact" className={styles.btnOutline}>Nous Contacter</Link>
      </div>
    </div>
  );
}