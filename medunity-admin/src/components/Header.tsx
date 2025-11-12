// src/components/Header.tsx
'use client';
import { HeartIcon, EnvelopeIcon } from '@heroicons/react/24/solid'; // Import EnvelopeIcon
import styles from './Header.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Simplified function to fetch unread count
async function getUnreadCount(): Promise<number> {
  // Use the dedicated internal Next.js API route
  const res = await fetch('/api/contact/unread-count', {
    cache: 'no-store', // Always fetch fresh data
  });
  if (!res.ok) {
    console.error('Failed to fetch unread count');
    return 0;
  }
  const count = await res.json();
  return count;
}

export default function Header() {
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Fetch count on component mount
  useEffect(() => {
    getUnreadCount().then(setUnreadCount);
    // You'd typically set up a polling interval or websockets here for real-time updates
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img src="/logo4.png" alt="MedUnity logo" height="40px" />
          <span>MedUnity</span>
        </div>
        <span className={styles.subtitle}>Admin Page</span>
        {/* NEW MESSAGE ICON */}
        <Link href="/messages" className={styles.messageIconContainer}>
          <EnvelopeIcon className={styles.messageIcon} />
          {unreadCount > 0 && (
            <span className={styles.badge}>{unreadCount}</span>
          )}
        </Link>
      </div>
    </header>
  );
}

// You will need to add corresponding styles to Header.module.css for .messageIconContainer, .messageIcon, and .badge.
// For example:
/*

*/