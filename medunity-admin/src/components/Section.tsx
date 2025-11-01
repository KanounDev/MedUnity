'use client';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import styles from './Section.module.css';

type Props = {
  title: string;
  children: React.ReactNode;
  onAdd: () => void;
};

export default function Section({ title, children, onAdd }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <section className={styles.section}>
      <div
        className={styles.header}
        onClick={() => setOpen(!open)}
      >
        <h2 className={styles.title}>{title}</h2>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
          className={styles.addBtn}
        >
          <PlusIcon className={styles.plus} />
        </button>
      </div>

      {open && <div className={styles.body}>{children}</div>}
    </section>
  );
}