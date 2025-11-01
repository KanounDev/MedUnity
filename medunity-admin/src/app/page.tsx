'use client';
import { useState } from 'react';
import Section from '@/components/Section';
import DoctorCard from '@/components/DoctorCard';
import ActivityCard from '@/components/ActivityCard';
import NewsCard from '@/components/NewsCard';
import AddEditModal from '@/components/AddEditModal';
import { Doctor, Activity, News } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// ---------- Mock data (replace later with API) ----------
const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Jean Dupont',
    specialty: 'Dermato-Pathologie et Médecine Légale',
    degrees: [
      'Ancien Interne et Assistant des Hôpitaux de Paris',
      'D.E.S. d’Anatomie-Pathologique',
      'D.E.S.C. de Dermato-Pathologie',
    ],
    photo: '/doctor1.jpg',
  },
  {
    id: '2',
    name: 'Dr. Marie Curie',
    specialty: 'Dermato-Pathologie et Médecine Légale',
    degrees: ['D.E.S. d’Anatomie-Pathologique', 'D.E.S.C. de Dermato-Pathologie'],
    photo: '/doctor2.jpg',
  },
];

const mockActivities: Activity[] = [
  {
    id: 'a1',
    title: 'CYTOLOGIE – Le prélèvement',
    description:
      'Le prélèvement est réalisé au cabinet du médecin ou au laboratoire. Il consiste à prélever des cellules...',
    image: '/cyto1.jpg',
  },
  {
    id: 'a2',
    title: 'CYTOLOGIE – Le diagnostic',
    description:
      'Le diagnostic repose sur l’examen microscopique des cellules obtenues...',
    image: '/cyto2.jpg',
  },
];

const mockNews: News[] = [
  {
    id: 'n1',
    title: 'Changement d’horaires',
    date: 'Novembre 2025',
    content:
      'À partir du 1er novembre, le laboratoire sera ouvert de 8h à 18h...',
    image: '/news1.jpg',
  },
  {
    id: 'n2',
    title: 'Meet-up',
    date: 'Novembre 2025',
    content: 'Rencontre avec les équipes le 12 novembre...',
    image: '/meetup.jpg',
  },
];

export default function AdminPage() {
  // ---------- State ----------
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [news, setNews] = useState<News[]>(mockNews);

  const [modal, setModal] = useState<{
    open: boolean;
    type: 'doctor' | 'activity' | 'news';
    edit?: Doctor | Activity | News;
  }>({ open: false, type: 'doctor' });

  // ---------- Helpers ----------
  const openAdd = (type: typeof modal.type) => setModal({ open: true, type });
  const openEdit = (type: typeof modal.type, item: any) =>
    setModal({ open: true, type, edit: item });
  const closeModal = () => setModal({ open: false, type: 'doctor' });

  const saveDoctor = (data: Doctor) => {
    if (data.id) {
      setDoctors((p) => p.map((d) => (d.id === data.id ? data : d)));
    } else {
      setDoctors((p) => [...p, { ...data, id: uuidv4() }]);
    }
  };
  const deleteDoctor = (id: string) => setDoctors((p) => p.filter((d) => d.id !== id));

  const saveActivity = (data: Activity) => {
    if (data.id) {
      setActivities((p) => p.map((a) => (a.id === data.id ? data : a)));
    } else {
      setActivities((p) => [...p, { ...data, id: uuidv4() }]);
    }
  };
  const deleteActivity = (id: string) => setActivities((p) => p.filter((a) => a.id !== id));

  const saveNews = (data: News) => {
    if (data.id) {
      setNews((p) => p.map((n) => (n.id === data.id ? data : n)));
    } else {
      setNews((p) => [...p, { ...data, id: uuidv4() }]);
    }
  };
  const deleteNews = (id: string) => setNews((p) => p.filter((n) => n.id !== id));

  // ---------- Render ----------
  return (
    <>
      {/* DOCTORS */}
      <Section title="List of Doctors" onAdd={() => openAdd('doctor')}>
        {doctors.map((d) => (
          <DoctorCard
            key={d.id}
            doctor={d}
            onEdit={() => openEdit('doctor', d)}
            onDelete={() => deleteDoctor(d.id)}
          />
        ))}
      </Section>

      {/* ACTIVITIES */}
      <Section title="List of Activities" onAdd={() => openAdd('activity')}>
        {activities.map((a) => (
          <ActivityCard
            key={a.id}
            activity={a}
            onEdit={() => openEdit('activity', a)}
            onDelete={() => deleteActivity(a.id)}
          />
        ))}
      </Section>

      {/* NEWS */}
      <Section title="List of News" onAdd={() => openAdd('news')}>
        {news.map((n) => (
          <NewsCard
            key={n.id}
            news={n}
            onEdit={() => openEdit('news', n)}
            onDelete={() => deleteNews(n.id)}
          />
        ))}
      </Section>

      {/* ---------- MODALS ---------- */}
      <AddEditModal<Doctor>
        isOpen={modal.open && modal.type === 'doctor'}
        onClose={closeModal}
        title={modal.edit?.id ? 'Edit Doctor' : 'Add Doctor'}
        initial={modal.edit as Doctor}
        onSave={saveDoctor}
      >
        {(data, set) => (
          <>
            <input
              placeholder="Name"
              value={data.name ?? ''}
              onChange={(e) => set({ name: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              placeholder="Specialty"
              value={data.specialty ?? ''}
              onChange={(e) => set({ specialty: e.target.value })}
              className="w-full p-2 border rounded mt-2"
            />
            <textarea
              placeholder="Degrees (one per line)"
              value={(data.degrees ?? []).join('\n')}
              onChange={(e) =>
                set({ degrees: e.target.value.split('\n').filter(Boolean) })
              }
              rows={3}
              className="w-full p-2 border rounded mt-2"
            />
            <input
              placeholder="Photo URL (optional)"
              value={data.photo ?? ''}
              onChange={(e) => set({ photo: e.target.value })}
              className="w-full p-2 border rounded mt-2"
            />
          </>
        )}
      </AddEditModal>

      <AddEditModal<Activity>
        isOpen={modal.open && modal.type === 'activity'}
        onClose={closeModal}
        title={modal.edit?.id ? 'Edit Activity' : 'Add Activity'}
        initial={modal.edit as Activity}
        onSave={saveActivity}
      >
        {(data, set) => (
          <>
            <input
              placeholder="Title"
              value={data.title ?? ''}
              onChange={(e) => set({ title: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Description"
              value={data.description ?? ''}
              onChange={(e) => set({ description: e.target.value })}
              rows={4}
              className="w-full p-2 border rounded mt-2"
            />
            <input
              placeholder="Image URL (optional)"
              value={data.image ?? ''}
              onChange={(e) => set({ image: e.target.value })}
              className="w-full p-2 border rounded mt-2"
            />
          </>
        )}
      </AddEditModal>

      <AddEditModal<News>
        isOpen={modal.open && modal.type === 'news'}
        onClose={closeModal}
        title={modal.edit?.id ? 'Edit News' : 'Add News'}
        initial={modal.edit as News}
        onSave={saveNews}
      >
        {(data, set) => (
          <>
            <input
              placeholder="Title"
              value={data.title ?? ''}
              onChange={(e) => set({ title: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              placeholder="Date (e.g. Novembre 2025)"
              value={data.date ?? ''}
              onChange={(e) => set({ date: e.target.value })}
              className="w-full p-2 border rounded mt-2"
            />
            <textarea
              placeholder="Content"
              value={data.content ?? ''}
              onChange={(e) => set({ content: e.target.value })}
              rows={4}
              className="w-full p-2 border rounded mt-2"
            />
            <input
              placeholder="Image URL (optional)"
              value={data.image ?? ''}
              onChange={(e) => set({ image: e.target.value })}
              className="w-full p-2 border rounded mt-2"
            />
          </>
        )}
      </AddEditModal>
    </>
  );
}