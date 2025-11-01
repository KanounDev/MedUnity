'use client';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Activity } from '@/types';
import { notify } from './ToastProvider';
import styles from './ActivityCard.module.css';

type Props = { activity: Activity; onEdit: () => void; onDelete: () => void };

export default function ActivityCard({ activity, onEdit, onDelete }: Props) {
  return (
    <div className={styles.card}>
      {activity.image ? (
        <Image src={activity.image} alt={activity.title} width={80} height={80} className={styles.img} />
      ) : (
        <div className={styles.placeholder} />
      )}
      <div className={styles.info}>
        <h3 className={styles.title}>{activity.title}</h3>
        <p className={styles.desc}>{activity.description}</p>
      </div>
      <div className={styles.actions}>
        <button onClick={onEdit} className={styles.iconBtn}><PencilIcon className={styles.icon} /></button>
        <button onClick={() => { onDelete(); notify('Activity removed','success'); }} className={styles.iconBtn}>
          <TrashIcon className={styles.icon} />
        </button>
      </div>
    </div>
  );
}