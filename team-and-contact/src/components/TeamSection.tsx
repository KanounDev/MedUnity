// src/components/TeamSection.tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import DoctorCard from './DoctorCard';
import DoctorModal from './DoctorModal';
import { Doctor } from '@/types';
import styles from './TeamSection.module.css';

const fetchDoctors = async (): Promise<Doctor[]> => {
  const { data } = await axios.get('http://localhost:3002/doctors');
  return data;
};

export default function TeamSection() {
  const [selected, setSelected] = useState<Doctor | null>(null);

  const {
    data: doctors = [],
    isLoading,
    isError,
    error,
  } = useQuery<Doctor[], Error>({
    queryKey: ['doctors'],
    queryFn: fetchDoctors,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <section className={styles.section}>
      {/* Hero */}
      <div className={styles.hero}>
        <h1 className={styles.title}>Our Team</h1>
        <p className={styles.subtitle}>UNE ÉQUIPE DE MÉDECINS</p>
      </div>

      {/* Banners */}
      <div className={styles.banners}>
        <div className={styles.banner}>
          <img src="/banners/1.jpg" alt="Disponibilité" />
          <p>Toujours disponibles pour écouter et expliquer</p>
        </div>
        <div className={styles.banner}>
          <img src="/banners/2.jpg" alt="Conventions" />
          <p>Conventions : secteur 1, tiers payant, chèques</p>
        </div>
        <div className={styles.banner}>
          <img src="/banners/3.jpg" alt="Qualité" />
          <p>Qualité en Anatomie et Cytologie Pathologiques</p>
        </div>
        <div className={styles.banner}>
          <img src="/banners/4.jpg" alt="Formation" />
          <p>Formés dans les grands établissements</p>
        </div>
      </div>

      {/* Count */}
      <div className={styles.count}>
        <h2>
          {isLoading
            ? 'Chargement...'
            : isError
            ? 'Erreur'
            : `${doctors.length} MÉDECINS PATHOLOGISTES`}
        </h2>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className={styles.loader}>
          <div className={styles.spinner}></div>
          <p>Chargement des médecins...</p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className={styles.error}>
          <p>Impossible de charger les médecins.</p>
          <p className={styles.errorMsg}>{(error as Error)?.message}</p>
        </div>
      )}

      {/* Doctors Grid */}
      {!isLoading && !isError && doctors.length === 0 && (
        <div className={styles.empty}>Aucun médecin trouvé.</div>
      )}

      {!isLoading && !isError && doctors.length > 0 && (
        <div className={styles.grid}>
          {doctors.map((doc) => (
            <DoctorCard
              key={doc.id}
              doctor={doc}
              onClick={() => setSelected(doc)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      <DoctorModal doctor={selected} onClose={() => setSelected(null)} />
    </section>
  );
}