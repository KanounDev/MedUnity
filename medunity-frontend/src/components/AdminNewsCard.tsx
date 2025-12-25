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
  // Prefer an existing paragraphs array (from backend), otherwise split the content string into paragraphs.
  // Split on any blank line (handles '\n\n', '\r\n\r\n', or lines with only whitespace).
  const rawParagraphs: string[] = (news as any).paragraphs && Array.isArray((news as any).paragraphs)
    ? (news as any).paragraphs
    : news.content
    ? (news.content as string).split(/\r?\n\s*\r?\n/)
    : [];

  const paragraphs: string[] = rawParagraphs.map((p: string) => p.trim()).filter((p): p is string => Boolean(p));

  return (
    <div className={styles.card}>
      {/* Image */}
      <div className={styles.imageWrapper}>
        <Image
          src={news.image?.trim() || '/placeholder-news.jpg'} 
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
          {paragraphs.map((para: string, i: number) => (
            <p key={i} className={styles.description}>
              {/** Preserve internal single newlines within a paragraph by rendering <br/> where needed */}
              {para.split(/\r?\n/).map((line: string, idx: number) => (
                <span key={idx}>
                  {line}
                  {idx < para.split(/\r?\n/).length - 1 && <br />}
                </span>
              ))}
            </p>
          ))}
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