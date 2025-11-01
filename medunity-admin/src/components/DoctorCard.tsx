'use client';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Doctor } from '@/types';
import { notify } from './ToastProvider';
import styles from './DoctorCard.module.css';

type Props = {
  doctor: Doctor;
  onEdit: () => void;
  onDelete: () => void;
};

export default function DoctorCard({ doctor, onEdit, onDelete }: Props) {
  return (
    <div className={styles.card}>
      {doctor.photo ? (
        <Image
          src={doctor.photo}
          alt={doctor.name}
          width={64}
          height={64}
          className={styles.photo}
        />
      ) : (
        <div className={styles.placeholder} />
      )}
      <div className={styles.info}>
        <h3 className={styles.name}>{doctor.name}</h3>
        <p className={styles.specialty}>{doctor.specialty}</p>
        <ul className={styles.degrees}>
          {doctor.degrees.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>
      <div className={styles.actions}>
        <button onClick={onEdit} className={styles.iconBtn} title="Edit">
          <PencilIcon className={styles.icon} />
        </button>
        <button
          onClick={() => {
            onDelete();
            notify('Doctor deleted', 'success');
          }}
          className={styles.iconBtn}
          title="Delete"
        >
          <TrashIcon className={styles.icon} />
        </button>
      </div>
    </div>
  );
}