// src/components/AdminMessageCard.tsx
'use client';

import { ContactMessage } from '@/types';
import styles from './AdminMessageCard.module.css';

interface Props {
  message: ContactMessage;
  onDelete: () => void;
  onStatusChange: (status: 'READ') => void;
}

export default function AdminMessageCard({ message, onDelete, onStatusChange }: Props) {
  const formatDate = (date: Date) => new Date(date).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });

  let statusClass = '';
  switch (message.status) {
    case 'UNREAD':
      statusClass = styles.statusUnread;
      break;
    case 'READ':
      statusClass = styles.statusRead;
      break;
  }

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <div className={styles.details}>
          <h3 className={styles.name}>{message.name}</h3>
          <p className={styles.email}>
            {message.email} {message.phone && `| ${message.phone}`}
          </p>
          <p className={styles.subject}>{message.subject}</p>
          <p className={styles.message}>{message.message}</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.75rem' }}>
            <span className={`${styles.status} ${statusClass}`}>
              {message.status}
            </span>

            {message.status === 'UNREAD' && (
              <button
                onClick={() => onStatusChange('READ')}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 3px 8px rgba(20, 184, 166, 0.25)',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                Mark as Read
              </button>
            )}
          </div>

          <p className={styles.date}>Received: {formatDate(message.createdAt)}</p>
        </div>

        <div className={styles.actions}>
          <button onClick={onDelete} className={styles.deleteButton} aria-label="Delete">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 7l-.867 12.142A2.175 2.175 0 0116.138 21H7.862a2.175 2.175 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}