'use client';

import { Exam } from '@/types';
import styles from './AdminExamCard.module.css';
import { API_BASE_URL } from '@/config/api'; // Import the config

interface Props {
  exam: Exam;
  onEdit: () => void;
  onDelete: () => void;
}

export default function AdminExamCard({ exam, onEdit, onDelete }: Props) {
  const pdfUrl = exam.fileUrl ? `${API_BASE_URL}${exam.fileUrl}` : null;

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <div className={styles.details}>
          <h3 className={styles.type}>{exam.type}</h3>
          <p className={styles.date}>Date: {exam.date}</p>
          <p className={styles.status}>Status: {exam.status}</p>
          <p className={styles.doctor}>Doctor: {exam.doctor?.name || 'N/A'}</p>
          <p className={styles.patient}>Patient: {exam.patient?.fullName || 'N/A'}</p>
          {pdfUrl && (
            <a 
              href={pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.fileLink}
            >
              View PDF
            </a>
          )}
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={onEdit} className={styles.iconButton} aria-label="Edit">
          <svg className="edit-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button onClick={onDelete} className={styles.deleteButton} aria-label="Delete">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 7l-.867 12.142A2.175 2.175 0 0116.138 21H7.862a2.175 2.175 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}