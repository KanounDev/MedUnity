import styles from './Header.module.css';
import { HeartIcon } from '@heroicons/react/24/solid';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <HeartIcon className={styles.icon} />
        <h1 className={styles.title}>MedUnity</h1>
        <span className={styles.subtitle}>Admin Page</span>
      </div>
    </header>
  );
}