// src/components/AdminSection.tsx
'use client';

import { ReactNode } from 'react';
import styles from './AdminSection.module.css';

interface Props {
  title: string;
  onAdd: () => void;
  children: ReactNode;
}

export default function AdminSection({ title, onAdd, children }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <button onClick={onAdd} className={styles.addButton} aria-label="Ajouter">
          +
        </button>
      </div>

      {/* Centered white card container */}
      <div className={styles.container}>
        {children}
      </div>
    </section>
  );
}