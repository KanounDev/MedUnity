import Link from 'next/link';
import { HeartIcon } from '@heroicons/react/24/solid';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.hero}>
      <HeartIcon className={styles.icon} />
      <h1 className={styles.title}>MedUnity</h1>
      <p className={styles.subtitle}>Votre laboratoire de pathologie de confiance</p>
      <div className={styles.actions}>
        <Link href="/our-activities" className={styles.btn}>Nos Activités</Link>
        <Link href="/team" className={styles.btn}>Notre Équipe</Link>
        <Link href="/contact" className={styles.btnOutline}>Nous Contacter</Link>
      </div>
    </div>
  );
}
