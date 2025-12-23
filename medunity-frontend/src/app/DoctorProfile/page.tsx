// app/DoctorProfile/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DoctorSpaceHeader from '@/components/DoctorSpaceHeader';
import ProfileDisplay from '@/components/ProfileDisplay';
import { Doctor } from '@/types';
import styles from '@/components/ProfilePage.module.css';

export default function DoctorProfilePage() {
  const router = useRouter();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doctorId = sessionStorage.getItem('doctorId');
    if (!doctorId) {
      router.push('/contact');
      return;
    }

    fetch(`http://localhost:3002/doctors/${doctorId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setDoctor(data);
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
      <DoctorSpaceHeader />
      {doctor ? <ProfileDisplay type="doctor" data={doctor} /> : <p>No profile data</p>}
    </div>
  );
}