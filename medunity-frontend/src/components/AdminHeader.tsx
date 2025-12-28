'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './AdminHeader.module.css';
import { useState, useEffect } from 'react';

export default function AdminHeader() {
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await fetch('http://localhost:3002/contact/unread-count');
        if (res.ok) {
          const data = await res.json();
          setUnreadCount(data.count || 0);
        }
      } catch (error) {
        console.error('Error fetching unread count:', error);
      }
    };

    fetchUnreadCount();
  }, []);

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

        {/* Messages Icon – now close to the logo */}
        <Link href="/Administrator/ContactMessages" className={styles.messagesIconLink}>
          <svg
            className={styles.messagesIcon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="View Messages"
          >
            <path d="M4 6h16v12H4z" stroke="#37678C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 12l8 4 8-4" stroke="#37678C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {unreadCount > 0 && (
            <span className={styles.unreadBadge}>
              {unreadCount}
            </span>
          )}
        </Link>
      </div>

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