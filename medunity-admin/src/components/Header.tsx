import styles from './Header.module.css';
import { HeartIcon } from '@heroicons/react/24/solid';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img src="/logo4.png" alt="MedUnity logo" height="40px"/>
          <span>MedUnity</span>
        </div>
        <span className={styles.subtitle}>Admin Page</span>
      </div>
    </header>
  );
}