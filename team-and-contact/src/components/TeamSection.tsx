'use client';
import { useState } from 'react';
import DoctorCard from './DoctorCard';
import DoctorModal from './DoctorModal';
import { Doctor } from '@/types';
import styles from './TeamSection.module.css';

const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr Thomas PETIT',
    title: 'Pathologiste',
    specialty: 'Cytologie & Histologie',
    degrees: ['MD', 'PhD en Pathologie'],
    experience: '15+ ans',
    photo: '/doctors/thomas.jpg',
    bio: 'Spécialiste en cytologie et histologie, ancien chef de service à l’Hôpital Cochin.',
  },
  {
    id: '2',
    name: 'Dr Philippe CAMPARO',
    title: 'Pathologiste',
    specialty: 'Uropathologie',
    degrees: ['MD', 'Spécialiste en Uropathologie'],
    experience: '20+ ans',
    photo: '/doctors/philippe.jpg',
    bio: 'Expert en uropathologie, conférencier international.',
  },
  {
    id: '3',
    name: 'Dr Céline BERTOCCHI',
    title: 'Pathologiste',
    specialty: 'Dermatopathologie',
    degrees: ['MD', 'DES de Dermatopathologie'],
    experience: '12+ ans',
    photo: '/doctors/celine.jpg',
    bio: 'Spécialisée en dermatopathologie et médecine légale.',
  },
  // Add more...
];

export default function TeamSection() {
  const [selected, setSelected] = useState<Doctor | null>(null);

  return (
    <section id="team" className={styles.section}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Our Team</h1>
        <p className={styles.subtitle}>UNE ÉQUIPE DE MÉDECINS</p>
      </div>

      <div className={styles.banners}>
        <div className={styles.banner}>
          <img src="/banners/1.jpg" alt="" />
          <p>Toujours disponibles pour écouter et expliquer</p>
        </div>
        <div className={styles.banner}>
          <img src="/banners/2.jpg" alt="" />
          <p>Conventions : secteur 1, tiers payant, chèques</p>
        </div>
        <div className={styles.banner}>
          <img src="/banners/3.jpg" alt="" />
          <p>Qualité en Anatomie et Cytologie Pathologiques</p>
        </div>
        <div className={styles.banner}>
          <img src="/banners/4.jpg" alt="" />
          <p>Formés dans les grands établissements</p>
        </div>
      </div>

      <div className={styles.count}>
        <h2>9 MÉDECINS PATHOLOGISTES</h2>
      </div>

      <div className={styles.grid}>
        {doctors.map((doc) => (
          <DoctorCard key={doc.id} doctor={doc} onClick={() => setSelected(doc)} />
        ))}
      </div>

      <DoctorModal doctor={selected} onClose={() => setSelected(null)} />
    </section>
  );
}