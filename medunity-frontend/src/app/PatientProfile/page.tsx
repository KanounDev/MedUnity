// app/PatientProfile/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PatientSpaceHeader from '@/components/PatientSpaceHeader';
import ProfileDisplay from '@/components/ProfileDisplay';
import { Patient } from '@/types';
import styles from '@/components/ProfilePage.module.css';

export default function PatientProfilePage() {
  const router = useRouter();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const patientId = sessionStorage.getItem('patientId');
    if (!patientId) {
      router.push('/contact');
      return;
    }

    fetch(`http://localhost:3002/patients/${patientId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setPatient(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        router.push('/contact');
      });
  }, [router]);

  if (loading) return <div className={styles.page}>Loading...</div>;

  return (
    <div className={styles.page}>
      <PatientSpaceHeader />
      {patient ? <ProfileDisplay type="patient" data={patient} /> : <p>No profile data</p>}
    </div>
  );
}