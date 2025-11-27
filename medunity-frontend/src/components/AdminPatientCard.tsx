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
        <button onClick={onEdit} className={styles.iconButton}>Edit Icon</button>
        <button onClick={onDelete} className={styles.deleteButton}>Delete Icon</button>
      </div>
    </div>
  );
}