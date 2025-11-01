'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { notify } from './ToastProvider';
import styles from './AddEditModal.module.css';

type Props<T> = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initial?: T;
  onSave: (data: T) => void;
  children: (data: T, set: (p: Partial<T>) => void) => React.ReactNode;
};

export default function AddEditModal<T extends { id?: string }>({
  isOpen,
  onClose,
  title,
  initial,
  onSave,
  children,
}: Props<T>) {
  const [form, setForm] = useState<T>((initial ?? {}) as T);

  useEffect(() => {
    if (isOpen) setForm((initial ?? {}) as T);
  }, [isOpen, initial]);

  const handleSave = () => {
    onSave(form);
    notify(initial?.id ? 'Updated' : 'Added', 'success');
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className={styles.overlay} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={styles.backdrop} />
        </Transition.Child>

        <div className={styles.container}>
          <div className={styles.center}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={styles.panel}>
                <div className={styles.header}>
                  <Dialog.Title className={styles.title}>{title}</Dialog.Title>
                  <button onClick={onClose} className={styles.closeBtn}>
                    <XMarkIcon className={styles.closeIcon} />
                  </button>
                </div>

                <div className={styles.form}>{children(form, (p) => setForm({ ...form, ...p }))}</div>

                <div className={styles.footer}>
                  <button onClick={onClose} className={styles.cancel}>Cancel</button>
                  <button onClick={handleSave} className={styles.save}>Save</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}