'use client';

import styles from './AdminPatientCard.module.css';

interface Patient {
  id: string;
  fullName: string;
  birthDate: string;
  phone: string;
  email: string;
  qrCode?: string;
}

interface Props {
  patient: Patient;
  onEdit: () => void;
  onDelete: () => void;
}

export default function AdminPatientCard({ patient, onEdit, onDelete }: Props) {
  const formatDate = (date: string) => new Date(date).toLocaleDateString('fr-FR');

  const initials = patient.fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <div className={styles.avatar}>
          {initials}
        </div>
        <div className={styles.details}>
          <h4 className={styles.name}>{patient.fullName}</h4>
          <p>Né(e) le : {formatDate(patient.birthDate)}</p>
          <p>Téléphone : {patient.phone}</p>
          <p>Email : {patient.email}</p>
          {patient.qrCode && (
            <p className={styles.qrCode}>QR: <span>{patient.qrCode}</span></p>
          )}
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