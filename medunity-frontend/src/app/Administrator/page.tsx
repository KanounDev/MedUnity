// app/Administrator/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "@/components/AddEditModal.module.css";
import "./page.css";
import AdminSection from '@/components/AdminSection';
import AdminDoctorCard from '@/components/AdminDoctorCard';
import AdminActivityCard from '@/components/AdminActivityCard';
import AdminNewsCard from '@/components/AdminNewsCard';
import AdminPatientCard from '@/components/AdminPatientCard';
import AddEditModal from '@/components/AddEditModal';
import AdminHeader from '@/components/AdminHeader';
import { Doctor, Patient, Activity, News } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'http://localhost:3002'; // ← Your NestJS backend

export default function AdministratorPage() {
  const router = useRouter();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [news, setNews] = useState<News[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  const [modal, setModal] = useState<{
    open: boolean;
    type: 'doctor' | 'activity' | 'news' | 'patient';
    edit?: any;
  }>({ open: false, type: 'doctor' });

  // === FETCH ALL DATA ON MOUNT ===
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [docRes, actRes, newsRes, patRes] = await Promise.all([
          fetch(`${API_URL}/doctors`),
          fetch(`${API_URL}/activities`),
          fetch(`${API_URL}/news`),
          fetch(`${API_URL}/patients`),
        ]);

        if (docRes.ok) setDoctors(await docRes.json());
        if (actRes.ok) setActivities(await actRes.json());
        if (newsRes.ok) setNews(await newsRes.json());
        if (patRes.ok) setPatients(await patRes.json());
      } catch (err) {
        console.error('Failed to fetch data', err);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      router.push('/DoctorAuthentification');
    }
  }, [router]);

  // === MODAL HELPERS ===
  const openAdd = (type: typeof modal.type) => setModal({ open: true, type });
  const openEdit = (type: typeof modal.type, item: any) => setModal({ open: true, type, edit: item });
  const closeModal = () => setModal({ open: false, type: 'doctor' });

  // === SAVE DOCTOR (CREATE / UPDATE) ===
  const saveDoctor = async (data: Doctor) => {
    const method = modal.edit ? 'PATCH' : 'POST';
    const url = modal.edit ? `${API_URL}/doctors/${data.id}` : `${API_URL}/doctors`;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const res = await fetch(`${API_URL}/doctors`);
    setDoctors(await res.json());
    closeModal();
  };

  // === DELETE DOCTOR ===
  const deleteDoctor = async (id: string) => {
    await fetch(`${API_URL}/doctors/${id}`, { method: 'DELETE' });
    setDoctors(prev => prev.filter(d => d.id !== id));
  };
  const saveActivity = async (data: Activity) => {
    const method = modal.edit ? 'PATCH' : 'POST';
    const url = modal.edit ? `${API_URL}/activities/${data.id}` : `${API_URL}/activities`;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const res = await fetch(`${API_URL}/activities`);
    setActivities(await res.json());
    closeModal();
  };

  // === DELETE ACTIVITY ===
  const deleteActivity = async (id: string) => {
    await fetch(`${API_URL}/activities/${id}`, { method: 'DELETE' });
    setActivities(prev => prev.filter(a => a.id !== id));
  };
  // === SAVE NEWS ===
  const saveNews = async (data: News) => {
    const method = modal.edit ? 'PATCH' : 'POST';
    const url = modal.edit ? `${API_URL}/news/${data.id}` : `${API_URL}/news`;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const res = await fetch(`${API_URL}/news`);
    setNews(await res.json());
    closeModal();
  };

  // === DELETE NEWS ===
  const deleteNews = async (id: string) => {
    await fetch(`${API_URL}/news/${id}`, { method: 'DELETE' });
    setNews(prev => prev.filter(n => n.id !== id));
  };
  // === SAVE PATIENT ===
  const savePatient = async (data: Patient) => {
    const method = modal.edit ? 'PATCH' : 'POST';
    const url = modal.edit ? `${API_URL}/patients/${data.id}` : `${API_URL}/patients`;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const res = await fetch(`${API_URL}/patients`);
    setPatients(await res.json());
    closeModal();
  };

  // === DELETE PATIENT ===
  const deletePatient = async (id: string) => {
    await fetch(`${API_URL}/patients/${id}`, { method: 'DELETE' });
    setPatients(prev => prev.filter(p => p.id !== id));
  };
  return (
    <div className="adminPageContainer">
      <AdminHeader />

      <main className="adminPageMain">

        {/* DOCTORS SECTION */}
        <AdminSection title="List of Doctors" onAdd={() => openAdd('doctor')}>
          {doctors.length === 0 ? (
            <p>No doctors are added yet</p>
          ) : (
            doctors.map(doctor => (
              <AdminDoctorCard
                key={doctor.id}
                doctor={doctor}
                onEdit={() => openEdit('doctor', doctor)}
                onDelete={() => deleteDoctor(doctor.id)}
              />
            ))
          )}
        </AdminSection>
        <AdminSection title="List of Activities" onAdd={() => openAdd('activity')}>
          {activities.length === 0 ? (
            <p>No activity added yet.</p>
          ) : (
            activities.map(activity => (
              <AdminActivityCard
                key={activity.id}
                activity={activity}
                onEdit={() => openEdit('activity', activity)}
                onDelete={() => deleteActivity(activity.id)}
              />
            ))
          )}
        </AdminSection>

        {/* News Section */}
        <AdminSection title="List of News" onAdd={() => openAdd('news')}>
          {news.length === 0 ? (
            <p>No news are added</p>
          ) : (
            news.map(n => (
              <AdminNewsCard
                key={n.id}
                news={n}
                onEdit={() => openEdit('news', n)}
                onDelete={() => deleteNews(n.id)}
              />
            ))
          )}
        </AdminSection>

        {/* Patients Section - NEW */}
        <AdminSection title="List of Patients" onAdd={() => openAdd('patient')}>
          {patients.length === 0 ? (
            <p>No patient is added</p>
          ) : (
            patients.map(patient => (
              <AdminPatientCard
                key={patient.id}
                patient={patient}
                onEdit={() => openEdit('patient', patient)}
                onDelete={() => deletePatient(patient.id)}
              />
            ))
          )}
        </AdminSection>
        {/* ACTIVITIES, NEWS, PATIENTS — same pattern */}
        {/* ... keep your other sections ... */}


        {/* DOCTOR MODAL */}
        <AddEditModal<Doctor>
          isOpen={modal.open && modal.type === 'doctor'}
          onClose={closeModal}
          title={modal.edit ? 'Edit Doctor' : 'Add Doctor'}
          initial={modal.edit}
          onSave={saveDoctor}
        >
          {(data, set) => {
            const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const result = reader.result as string;
                  setPhotoPreview(result);
                  set({ photo: result }); // Save as base64
                };
                reader.readAsDataURL(file);
              }
            };
            return (
              <>
                <input className={styles.input} placeholder="Full Name" value={data.name ?? ''} onChange={e => set({ name: e.target.value })} />
                {/* <input className={styles.input} placeholder="Titre" value={data.title ?? ''} onChange={e => set({ title: e.target.value })} /> */}
                <input className={styles.input} placeholder="Specialty" value={data.specialty ?? ''} onChange={e => set({ specialty: e.target.value })} />
                <input className={styles.input} placeholder="Email" value={data.email ?? ''} onChange={e => set({ email: e.target.value })} />
                <textarea
                  className={styles.textarea}
                  placeholder="Diplomats (one per line)"
                  value={(data.degrees ?? []).join('\n')}
                  onChange={e => set({ degrees: e.target.value.split('\n').filter(Boolean) })}
                  rows={4}
                />
                {/* <input className={styles.input} placeholder="Expérience" value={data.experience ?? ''} onChange={e => set({ experience: e.target.value })} /> */}
                <div className={styles.photoUploadContainer}>
                  <label className={styles.photoUploadLabel}>Doctor Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className={styles.photoFileInput}
                  />
                  {data.photo && (
                    <img src={data.photo} alt="Preview" className={styles.photoPreviewImg} />
                  )}
                </div>
              </>
            );
          }}
        </AddEditModal>
        {/* ACTIVITY MODAL */}
        <AddEditModal<Activity>
          isOpen={modal.open && modal.type === 'activity'}
          onClose={closeModal}
          title={modal.edit ? 'Edit Activity' : 'Add Activity'}
          initial={modal.edit}
          onSave={saveActivity}
        >
          {(data, set) => {
            const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const result = reader.result as string;
                  set({ image: result });
                };
                reader.readAsDataURL(file);
              }
            };

            return (
              <>
                <input
                  className={styles.input}
                  placeholder="Title"
                  value={data.title ?? ''}
                  onChange={e => set({ title: e.target.value })}
                />
                <textarea
                  className={styles.textarea}
                  placeholder="Description"
                  value={data.description ?? ''}
                  onChange={e => set({ description: e.target.value })}
                  rows={6}
                />
                <div className={styles.photoUploadContainer}>
                  <label className={styles.photoUploadLabel}>Image de l'activité</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={styles.photoFileInput}
                  />
                  {data.image && (
                    <img src={data.image} alt="Preview" className={styles.photoPreviewImg} />
                  )}
                </div>
              </>
            );
          }}
        </AddEditModal>
        {/* NEWS MODAL */}
        <AddEditModal<News>
          isOpen={modal.open && modal.type === 'news'}
          onClose={closeModal}
          title={modal.edit ? 'Edit News' : 'Add News'}
          initial={modal.edit}
          onSave={saveNews}
        >
          {(data, set) => {
            const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  set({ image: reader.result as string });
                };
                reader.readAsDataURL(file);
              }
            };

            return (
              <>
                <input className={styles.input} placeholder="Title" value={data.title ?? ''} onChange={e => set({ title: e.target.value })} />
                <input className={styles.input} placeholder="Date (ex: Novembre 2025)" value={data.date ?? ''} onChange={e => set({ date: e.target.value })} />
                <textarea className={styles.textarea} placeholder="Full Content" value={data.content ?? ''} onChange={e => set({ content: e.target.value })} rows={10} />

                <div className={styles.photoUploadContainer}>
                  <label className={styles.photoUploadLabel}>Image de l'actualité</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} className={styles.photoFileInput} />
                  {data.image && <img src={data.image} alt="Preview" className={styles.photoPreviewImg} />}
                </div>
              </>
            );
          }}
        </AddEditModal>
        {/* PATIENT MODAL */}
        <AddEditModal<Patient>
          isOpen={modal.open && modal.type === 'patient'}
          onClose={closeModal}
          title={modal.edit ? 'Edit Patient' : 'Add a patient'}
          initial={modal.edit}
          onSave={savePatient}
        >
          {(data, set) => {
            const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  set({ photo: reader.result as string });
                };
                reader.readAsDataURL(file);
              }
            };

            return (
              <>
                <input className={styles.input} placeholder="Full Name" value={data.fullName ?? ''} onChange={e => set({ fullName: e.target.value })} />
                <input className={styles.input} placeholder="Email" value={data.email ?? ''} onChange={e => set({ email: e.target.value })} />
                <input className={styles.input} placeholder="Birth Date (ex: 1990-05-15)" value={data.birthDate ?? ''} onChange={e => set({ birthDate: e.target.value })} />
                <input className={styles.input} placeholder="Phone Number" value={data.phone ?? ''} onChange={e => set({ phone: e.target.value })} />

                <div className={styles.photoUploadContainer}>
                  <label className={styles.photoUploadLabel}>Photo du patient</label>
                  <input type="file" accept="image/*" onChange={handlePhotoChange} className={styles.photoFileInput} />
                  {data.photo && <img src={data.photo} alt="Preview" className={styles.photoPreviewImg} />}
                </div>
              </>
            );
          }}
        </AddEditModal>
        {/* Keep other modals as before */}

      </main>
    </div>
  );
}