'use client';

import Image from 'next/image';
import { Doctor } from '@/types';
import styles from './AdminDoctorCard.module.css';

interface Props {
  doctor: Doctor;
  onEdit: () => void;
  onDelete: () => void;
}

export default function AdminDoctorCard({ doctor, onEdit, onDelete }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <div className={styles.photo}>
          <Image
            src={doctor.photo || '/placeholder-doctor.jpg'}
            alt={doctor.name}
            width={80}
            height={80}
            className={styles.photoImg}
          />
        </div>
        <div className={styles.details}>
          <h3 className={styles.name}>{doctor.name}</h3>
          <p className={styles.specialty}>{doctor.specialty}</p>
          <ul className={styles.degrees}>
            {doctor.degrees.map((deg, i) => (
              <li key={i}>{deg}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.actions}>
        <button onClick={onEdit} className={styles.iconButton} aria-label="Modifier">
          <svg className="edit-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button onClick={onDelete} className={styles.deleteButton} aria-label="Supprimer">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 7l-.867 12.142A2.175 2.175 0 0116.138 21H7.862a2.175 2.175 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}