'use client';

import Image from 'next/image';
import { News } from '@/types';
import styles from './AdminNewsCard.module.css';

interface Props {
  news: News;
  onEdit: () => void;
  onDelete: () => void;
}

export default function AdminNewsCard({ news, onEdit, onDelete }: Props) {
  return (
    <div className={styles.card}>
      {/* Image */}
      <div className={styles.imageWrapper}>
        <Image
          src={news.image || '/placeholder-news.jpg'}
          alt={news.title}
          width={260}
          height={220}
          className={styles.image}
        />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.textContent}>
          <h3>{news.title}</h3>
          <span className={styles.date}>{news.date}</span>
          <p className={styles.description}>{news.content}</p>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button onClick={onEdit} className={styles.iconButton} aria-label="Modifier">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button onClick={onDelete} className={styles.deleteButton} aria-label="Supprimer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 7l-.867 12.142A2.175 2.175 0 0116.138 21H7.862a2.175 2.175 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}