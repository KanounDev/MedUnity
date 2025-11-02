'use client';
import { useState, useEffect } from 'react';
import Section from '@/components/Section';
import DoctorCard from '@/components/DoctorCard';
import ActivityCard from '@/components/ActivityCard';
import NewsCard from '@/components/NewsCard';
import AddEditModal from '@/components/AddEditModal';
import { Doctor, Activity, News } from '@/types';
import { notify } from '@/components/ToastProvider';

const API_BASE = '/api'; // Proxied to NestJS

export default function AdminPage() {
  // ---------- State ----------
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modal, setModal] = useState<{
    open: boolean;
    type: 'doctor' | 'activity' | 'news';
    edit?: Doctor | Activity | News;
  }>({ open: false, type: 'doctor' });

  // ---------- Fetch All Data ----------
  const fetchAll = async () => {
    try {
      setLoading(true);
      setError(null);

      const [docRes, actRes, newsRes] = await Promise.all([
        fetch(`${API_BASE}/doctors`),
        fetch(`${API_BASE}/activities`),
        fetch(`${API_BASE}/news`),
      ]);

      if (!docRes.ok || !actRes.ok || !newsRes.ok) throw new Error('Failed to fetch');

      const [docData, actData, newsData] = await Promise.all([
        docRes.json(),
        actRes.json(),
        newsRes.json(),
      ]);

      setDoctors(docData);
      setActivities(actData);
      setNews(newsData);
    } catch (err) {
      setError('Failed to load data. Please try again.');
      notify('Error loading data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // ---------- Helpers ----------
  const openAdd = (type: typeof modal.type) => setModal({ open: true, type });
  const openEdit = (type: typeof modal.type, item: any) =>
    setModal({ open: true, type, edit: item });
  const closeModal = () => setModal({ open: false, type: 'doctor' });

  // ---------- CRUD Operations ----------
  const saveDoctor = async (data: Doctor) => {
    const isEdit = !!data.id;
    const method = isEdit ? 'PATCH' : 'POST';
    const url = isEdit ? `${API_BASE}/doctors/${data.id}` : `${API_BASE}/doctors`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      const updated = await res.json();
      setDoctors((p) =>
        isEdit ? p.map((d) => (d.id === updated.id ? updated : d)) : [...p, updated]
      );
      notify(isEdit ? 'Doctor updated' : 'Doctor added', 'success');
      closeModal();
    } catch {
      notify('Failed to save doctor', 'error');
    }
  };

  const deleteDoctor = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/doctors/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setDoctors((p) => p.filter((d) => d.id !== id));
      notify('Doctor deleted', 'success');
    } catch {
      notify('Failed to delete', 'error');
    }
  };

  const saveActivity = async (data: Activity) => {
    const isEdit = !!data.id;
    const method = isEdit ? 'PATCH' : 'POST';
    const url = isEdit ? `${API_BASE}/activities/${data.id}` : `${API_BASE}/activities`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      const updated = await res.json();
      setActivities((p) =>
        isEdit ? p.map((a) => (a.id === updated.id ? updated : a)) : [...p, updated]
      );
      notify(isEdit ? 'Activity updated' : 'Activity added', 'success');
      closeModal();
    } catch {
      notify('Failed to save activity', 'error');
    }
  };

  const deleteActivity = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/activities/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setActivities((p) => p.filter((a) => a.id !== id));
      notify('Activity deleted', 'success');
    } catch {
      notify('Failed to delete', 'error');
    }
  };

  const saveNews = async (data: News) => {
    const isEdit = !!data.id;
    const method = isEdit ? 'PATCH' : 'POST';
    const url = isEdit ? `${API_BASE}/news/${data.id}` : `${API_BASE}/news`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      const updated = await res.json();
      setNews((p) =>
        isEdit ? p.map((n) => (n.id === updated.id ? updated : n)) : [...p, updated]
      );
      notify(isEdit ? 'News updated' : 'News added', 'success');
      closeModal();
    } catch {
      notify('Failed to save news', 'error');
    }
  };

  const deleteNews = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/news/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setNews((p) => p.filter((n) => n.id !== id));
      notify('News deleted', 'success');
    } catch {
      notify('Failed to delete', 'error');
    }
  };

  // ---------- Render ----------
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchAll}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

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