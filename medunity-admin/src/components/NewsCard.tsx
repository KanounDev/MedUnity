'use client';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { News } from '@/types';
import { notify } from './ToastProvider';
import styles from './NewsCard.module.css';

type Props = { news: News; onEdit: () => void; onDelete: () => void };

export default function NewsCard({ news, onEdit, onDelete }: Props) {
  return (
    <div className={styles.card}>
      {news.image ? (
        <Image src={news.image} alt={news.title} width={80} height={80} className={styles.img} />
      ) : (
        <div className={styles.placeholder} />
      )}
      <div className={styles.info}>
        <h3 className={styles.title}>{news.title}</h3>
        <p className={styles.date}>{news.date}</p>
        <p className={styles.content}>{news.content}</p>
      </div>
      <div className={styles.actions}>
        <button onClick={onEdit} className={styles.iconBtn}><PencilIcon className={styles.icon} /></button>
        <button onClick={() => { onDelete(); notify('News removed','success'); }} className={styles.iconBtn}>
          <TrashIcon className={styles.icon} />
        </button>
      </div>
    </div>
  );
}