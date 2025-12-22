"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './AdminHeader.module.css'; // We'll create this CSS file

export default function DoctorSpaceHeader() {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem('isDoctor');
    sessionStorage.removeItem('isAdmin');
    router.push('/DoctorAuthentication');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoSection}>
        <Image
          src="/medunity.png"
          alt="MedUnity Logo"
          width={42}
          height={42}
          className={styles.logoImg}
          priority
        />
        <span className={styles.logoText}>MedUnity</span>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.pageInfo}>
          <h2 className={styles.pageTitle}>Doctor Space</h2>
        </div>

        <button onClick={handleLogout} className={styles.logoutButton}>
          Log Out
        </button>
      </div>
    </header>
  );
}