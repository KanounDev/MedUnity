import Image from 'next/image';
import { Doctor } from '@/types';
import styles from './DoctorCard.module.css';

type Props = {
  doctor: Doctor;
  onClick: () => void;
};

export default function DoctorCard({ doctor, onClick }: Props) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.photo}>
        <Image
          src={doctor.photo}
          alt={doctor.name}
          width={180}
          height={180}
          className={styles.img}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{doctor.name}</h3>
        <p className={styles.title}>{doctor.title}</p>
      </div>
    </div>
  );
}