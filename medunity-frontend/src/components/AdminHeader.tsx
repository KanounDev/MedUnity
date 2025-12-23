// src/components/AdminHeader.tsx
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './AdminHeader.module.css';

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    router.push('/');
  };
  const handleManageExams = () => {
    router.push('/Administrator/ExamAssignment');
  };
  const handleDashboard = () => {
    router.push('/Administrator');
  };
  return (
    <header className={styles.header}>
      {/* Logo + Brand – exactly like public site */}
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

      {/* Right side */}
      <div className={styles.rightSection}>
        <div className={styles.pageInfo}>
          <h2 className={styles.pageTitle}>Administrator Space</h2>
        </div>

        <button onClick={handleManageExams} className={styles.examButton}>
          Manage Exams
        </button>
        <button onClick={handleDashboard} className={styles.dashboardButton}>
          Dashboard
        </button>

        <button onClick={handleLogout} className={styles.logoutButton}>
          Log Out
        </button>
      </div>
    </header>
  );
}