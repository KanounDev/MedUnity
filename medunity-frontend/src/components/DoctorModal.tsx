'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Doctor } from '@/types';
import styles from './DoctorModal.module.css';

type Props = {
  doctor: Doctor | null;
  onClose: () => void;
};

export default function DoctorModal({ doctor, onClose }: Props) {
  if (!doctor) return null;

  return (
    <Transition show={!!doctor} as={Fragment}>
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
                <button onClick={onClose} className={styles.close}>
                  <XMarkIcon className={styles.icon} />
                </button>

                <div className={styles.grid}>
                  <div className={styles.photo}>
                    <Image
                      src={doctor.photo}
                      alt={doctor.name}
                      width={200}
                      height={200}
                      className={styles.img}
                    />
                  </div>
                  <div className={styles.content}>
                    <h2 className={styles.name}>{doctor.name}</h2>
                    <p className={styles.specialty}>{doctor.specialty}</p>
                    <p className={styles.exp}>Expérience: {doctor.experience}</p>
                    <ul className={styles.degrees}>
                      {doctor.degrees.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                    <p className={styles.bio}>{doctor.bio}</p>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}