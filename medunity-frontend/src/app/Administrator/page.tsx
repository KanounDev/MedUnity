'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "@/components/AddEditModal.module.css";
import AdminSection from '@/components/AdminSection';
import AdminDoctorCard from '@/components/AdminDoctorCard';
import AdminActivityCard from '@/components/AdminActivityCard';
import AdminNewsCard from '@/components/AdminNewsCard';
import AdminPatientCard from '@/components/AdminPatientCard';
import AddEditModal from '@/components/AddEditModal';
import AdminHeader from '@/components/AdminHeader';
import { Doctor, Activity, News } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Extended types
interface Patient {
  id: string;
  fullName: string;
  birthDate: string;
  phone: string;
  email: string;
  qrCode?: string;
}

// Mock data
const initialDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Samir Feki',
    specialty: 'Dermato-Pathologie et Médecine Légale',
    degrees: [
      'Ancien Interne et Assistant des Hôpitaux de Paris',
      'D.E.S. d’Anatomie-Pathologique',
      'D.E.S.C. de Dermato-Pathologie',
    ],
    photo: '/doctors/samir-feki.jpg',
    title: 'Professeur',
    experience: '20 ans',
    bio: 'Expert en dermato-pathologie et médecine légale.',
  },
  {
    id: '2',
    name: 'Dr. Hazem Jemai',
    specialty: 'Dermato-Pathologie et Médecine Légale',
    degrees: ['D.E.S. d’Anatomie-Pathologique', 'D.E.S.C. de Dermato-Pathologie'],
    photo: '/doctors/hazem-jemai.jpg',
    title: 'Docteur',
    experience: '15 ans',
    bio: 'Spécialiste en anatomie-pathologique et dermato-pathologie.',
  },
];

const initialActivities: Activity[] = [
  {
    id: 'a1',
    title: 'CYTOLOGIE – Le prélèvement',
    description: 'Le prélèvement est réalisé au cabinet du médecin ou au laboratoire. Il consiste à prélever des cellules...',
    image: '/activities/cyto-prelevement.jpg',
  },
  {
    id: 'a2',
    title: 'CYTOLOGIE – Le diagnostic',
    description: 'Le diagnostic repose sur l’examen microscopique des cellules obtenues...',
    image: '/activities/cyto-diagnostic.jpg',
  },
];

const initialNews: News[] = [];

const initialPatients: Patient[] = [
  {
    id: 'p1',
    fullName: 'Ahmed Ben Salah',
    birthDate: '1985-03-15',
    phone: '+216 98 123 456',
    email: 'ahmed.bensalah@gmail.com',
    qrCode: 'QR-AHMED-001',
  },
];

export default function AdministratorPage() {
  const router = useRouter();

  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  // Doctor photo preview state for modal
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [news, setNews] = useState<News[]>(initialNews);
  const [patients, setPatients] = useState<Patient[]>(initialPatients);

  const [modal, setModal] = useState<{
    open: boolean;
    type: 'doctor' | 'activity' | 'news' | 'patient';
    edit?: any;
  }>({ open: false, type: 'doctor' });

  const openAdd = (type: typeof modal.type) => {
    setModal({ open: true, type });
    if (type === 'doctor') setPhotoPreview(null);
  };
  const openEdit = (type: typeof modal.type, item: any) => {
    setModal({ open: true, type, edit: item });
    if (type === 'doctor') setPhotoPreview(item?.photo || null);
  };
  const closeModal = () => {
    setModal({ open: false, type: 'doctor' });
    setPhotoPreview(null);
  };

  const saveDoctor = (data: Doctor) => {
    if (data.id) {
      setDoctors(prev => prev.map(d => d.id === data.id ? data : d));
    } else {
      setDoctors(prev => [...prev, { ...data, id: uuidv4() }]);
    }
    closeModal();
  };

  const deleteDoctor = (id: string) => setDoctors(prev => prev.filter(d => d.id !== id));

  const saveActivity = (data: Activity) => {
    if (data.id) {
      setActivities(prev => prev.map(a => a.id === data.id ? data : a));
    } else {
      setActivities(prev => [...prev, { ...data, id: uuidv4() }]);
    }
    closeModal();
  };

  const deleteActivity = (id: string) => setActivities(prev => prev.filter(a => a.id !== id));

  const saveNews = (data: News) => {
    if (data.id) {
      setNews(prev => prev.map(n => n.id === data.id ? data : n));
    } else {
      setNews(prev => [...prev, { ...data, id: uuidv4() }]);
    }
    closeModal();
  };

  const deleteNews = (id: string) => setNews(prev => prev.filter(n => n.id !== id));

  const savePatient = (data: Patient) => {
    if (data.id) {
      setPatients(prev => prev.map(p => p.id === data.id ? data : p));
    } else {
      setPatients(prev => [...prev, { ...data, id: uuidv4(), qrCode: `QR-${data.fullName.split(' ').join('-').toUpperCase()}-${Date.now().toString().slice(-4)}` }]);
    }
    closeModal();
  };

  const deletePatient = (id: string) => setPatients(prev => prev.filter(p => p.id !== id));

  // Redirect if not admin (simple check via localStorage or session)
  useEffect(() => {
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      router.push('/DoctorAuthentification');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Doctors Section */}
        <AdminSection title="List of Doctors" onAdd={() => openAdd('doctor')}>
          {doctors.map(doctor => (
            <AdminDoctorCard
              key={doctor.id}
              doctor={doctor}
              onEdit={() => openEdit('doctor', doctor)}
              onDelete={() => deleteDoctor(doctor.id)}
            />
          ))}
        </AdminSection>

        {/* Activities Section */}
        <AdminSection title="List of Activities" onAdd={() => openAdd('activity')}>
          {activities.map(activity => (
            <AdminActivityCard
              key={activity.id}
              activity={activity}
              onEdit={() => openEdit('activity', activity)}
              onDelete={() => deleteActivity(activity.id)}
            />
          ))}
        </AdminSection>

        {/* News Section */}
        <AdminSection title="List of News" onAdd={() => openAdd('news')}>
          {news.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Aucune actualité pour le moment.</p>
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
          {patients.map(patient => (
            <AdminPatientCard
              key={patient.id}
              patient={patient}
              onEdit={() => openEdit('patient', patient)}
              onDelete={() => deletePatient(patient.id)}
            />
          ))}
        </AdminSection>
      </main>

      {/* Modals */}
      {/* ==================== DOCTOR MODAL ==================== */}
      <AddEditModal<Doctor>
        isOpen={modal.open && modal.type === 'doctor'}
        onClose={closeModal}
        title={modal.edit ? 'Modifier le médecin' : 'Ajouter un médecin'}
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
              <input
                className={styles.input}
                placeholder="Nom complet"
                value={data.name ?? ''}
                onChange={(e) => set({ name: e.target.value })}
              />
              <input
                className={styles.input}
                placeholder="Spécialité"
                value={data.specialty ?? ''}
                onChange={(e) => set({ specialty: e.target.value })}
              />
              <textarea
                className={styles.textarea}
                placeholder="Diplômes (un par ligne)"
                value={(data.degrees ?? []).join('\n')}
                onChange={(e) => set({ degrees: e.target.value.split('\n').filter(Boolean) })}
                rows={5}
              />

              {/* PHOTO UPLOAD WITH PREVIEW */}
              <div className={`${styles.photoUploadContainer} space-y-3`}>
                <label className={styles.photoUploadLabel}>Doctor Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className={styles.photoFileInput}
                />
                {photoPreview && (
                  <div className={styles.photoPreview}>
                    <img
                      src={photoPreview}
                      alt="Aperçu"
                      className={styles.photoPreviewImg}
                    />
                  </div>
                )}
              </div>
            </>
          );
        }}
      </AddEditModal>

      {/* ==================== ACTIVITY MODAL ==================== */}
      <AddEditModal<Activity>
        isOpen={modal.open && modal.type === 'activity'}
        onClose={closeModal}
        title={modal.edit ? 'Modifier l’activité' : 'Ajouter une activité'}
        initial={modal.edit}
        onSave={saveActivity}
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
              <input
                className={styles.input}
                placeholder="Titre"
                value={data.title ?? ''}
                onChange={(e) => set({ title: e.target.value })}
              />
              <textarea
                className={styles.textarea}
                placeholder="Description"
                value={data.description ?? ''}
                onChange={(e) => set({ description: e.target.value })}
                rows={6}
              />
              <div className={`${styles.photoUploadContainer} space-y-3`}>
                <label className={styles.photoUploadLabel}>Activity Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className={styles.photoFileInput}
                />
                {photoPreview && (
                  <div className={styles.photoPreview}>
                    <img
                      src={photoPreview}
                      alt="Aperçu"
                      className={styles.photoPreviewImg}
                    />
                  </div>
                )}
              </div>
            </>
          );
        }}
      </AddEditModal>

      {/* ==================== NEWS MODAL ==================== */}
      <AddEditModal<News>
        isOpen={modal.open && modal.type === 'news'}
        onClose={closeModal}
        title={modal.edit ? 'Modifier l’actualité' : 'Ajouter une actualité'}
        initial={modal.edit}
        onSave={saveNews}
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
              <input
                className={styles.input}
                placeholder="Titre"
                value={data.title ?? ''}
                onChange={(e) => set({ title: e.target.value })}
              />
              <input
                className={styles.input}
                placeholder="Date (ex: Novembre 2025)"
                value={data.date ?? ''}
                onChange={(e) => set({ date: e.target.value })}
              />
              <textarea
                className={styles.textarea}
                placeholder="Contenu"
                value={data.content ?? ''}
                onChange={(e) => set({ content: e.target.value })}
                rows={7}
              />
              <div className={`${styles.photoUploadContainer} space-y-3`}>
                <label className={styles.photoUploadLabel}>News Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className={styles.photoFileInput}
                />
                {photoPreview && (
                  <div className={styles.photoPreview}>
                    <img
                      src={photoPreview}
                      alt="Aperçu"
                      className={styles.photoPreviewImg}
                    />
                  </div>
                )}
              </div>
            </>
          );
        }}
      </AddEditModal>

      {/* ==================== PATIENT MODAL ==================== */}
      <AddEditModal<Patient>
        isOpen={modal.open && modal.type === 'patient'}
        onClose={closeModal}
        title={modal.edit ? 'Modifier le patient' : 'Ajouter un patient'}
        initial={modal.edit}
        onSave={savePatient}
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
              <input
                className={styles.input}
                placeholder="Nom complet"
                value={data.fullName ?? ''}
                onChange={(e) => set({ fullName: e.target.value })}
              />
              <input
                type="date"
                className={styles.input}
                value={data.birthDate ?? ''}
                onChange={(e) => set({ birthDate: e.target.value })}
              />
              <input
                className={styles.input}
                placeholder="Téléphone"
                value={data.phone ?? ''}
                onChange={(e) => set({ phone: e.target.value })}
              />
              <div className={`${styles.photoUploadContainer} space-y-3`}>
                <label className={styles.photoUploadLabel}>Patient Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className={styles.photoFileInput}
                />
                {photoPreview && (
                  <div className={styles.photoPreview}>
                    <img
                      src={photoPreview}
                      alt="Aperçu"
                      className={styles.photoPreviewImg}
                    />
                  </div>
                )}
              </div>
            </>
          );
        }}
      </AddEditModal>
    </div>
  );
}