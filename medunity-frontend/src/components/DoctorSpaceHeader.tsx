// components/DoctorSpaceHeader.tsx (Updated)
"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './AdminHeader.module.css'; // New CSS file

export default function DoctorSpaceHeader() {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.clear(); // Or specifically remove doctorId, isDoctor, etc.
    router.push('/'); // Or '/DoctorAuthentication' if separate
  };
  const handleHome = () => {
    router.push('/DoctorSpace');
  };
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
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

        <Link href="/DoctorProfile" className={styles.profileIconLink}>
          <svg
            className={styles.profileIcon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="View Profile"
          >
            <circle cx="12" cy="8" r="4" stroke="#37678C" strokeWidth="1.5" />
            <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#37678C" strokeWidth="1.5" />
          </svg>
        </Link>
      </div>

      <div className={styles.rightSection}>
        <h2 className={styles.pageTitle}>Doctor Space</h2>
        <button onClick={handleHome} className={styles.dashboardButton}>
          Dashboard
        </button>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Log Out
        </button>
      </div>
    </header>
  );
}