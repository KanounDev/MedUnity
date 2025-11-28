'use client';

import { useState, useEffect } from 'react';
import styles from './AddEditModal.module.css';

interface Props<T> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initial?: Partial<T>;
  onSave: (data: T) => void;
  children: (data: Partial<T>, setData: (u: Partial<T>) => void) => React.ReactNode;
}

export default function AddEditModal<T>({
  isOpen,
  onClose,
  title,
  initial = {},
  onSave,
  children,
}: Props<T>) {
  const [data, setData] = useState<Partial<T>>(initial);

  useEffect(() => {
    if (isOpen) setData(initial);
  }, [isOpen, initial]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(data as T);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Colored top bar */}
        <div className={styles.accentBar} />

        <div className={styles.body}>
          <h2 className={styles.title}>{title}</h2>

          <div className={styles.form}>
            {children(data, (updates) => setData((prev) => ({ ...prev, ...updates })))}
          </div>

          <div className={styles.actions}>
            <button onClick={onClose} className={styles.btnCancel}>
              Cancel
            </button>
            <button onClick={handleSave} className={styles.btnSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}