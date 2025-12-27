// app/Administrator/ExamAssignment/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/components/AddEditModal.module.css';
import '../page.css';
import AdminSection from '@/components/AdminSection';
import AdminExamCard from '@/components/AdminExamCard';
import AddEditModal from '@/components/AddEditModal';
import AdminHeader from '@/components/AdminHeader';
import localStyles from './page.module.css';
import { Exam, Doctor, Patient } from '@/types';

const API_URL = 'http://localhost:3002';

export default function ExamAssignmentPage() {
    const router = useRouter();
    const [searchType, setSearchType] = useState('');
    const [searchDoctor, setSearchDoctor] = useState('');
    const [searchPatient, setSearchPatient] = useState('');
    const [exams, setExams] = useState<Exam[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [modal, setModal] = useState<{
        open: boolean;
        edit?: Exam | null;
    }>({ open: false });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [examRes, docRes, patRes] = await Promise.all([
                    fetch(`${API_URL}/exams`),
                    fetch(`${API_URL}/doctors`),
                    fetch(`${API_URL}/patients`),
                ]);

                if (examRes.ok) setExams(await examRes.json());
                if (docRes.ok) setDoctors(await docRes.json());
                if (patRes.ok) setPatients(await patRes.json());
            } catch (err) {
                console.error('Failed to fetch data', err);
            }
        };

        fetchData();
    }, []);

    const openModal = (exam?: Exam) => {
        setModal({ open: true, edit: exam ?? null });
    };

    const closeModal = () => {
        setModal({ open: false, edit: null });
    };

    // Extended type for form data (includes raw File)
    type ExamFormData = {
        type: string;
        date: string;
        status: 'Pending' | 'In Progress' | 'Ready' | 'Completed';
        doctorId: string;
        patientId: string;
        file?: File; // Raw file for upload
        fileUrl?: string; // Existing URL if editing
    };

    const saveExam = async (formData: ExamFormData) => {
        try {
            const payload = new FormData();
            payload.append('type', formData.type);
            payload.append('date', formData.date);
            payload.append('status', formData.status);
            payload.append('doctorId', formData.doctorId);
            payload.append('patientId', formData.patientId);
            if (formData.file) {
                payload.append('file', formData.file);
            }

            const method = modal.edit ? 'PATCH' : 'POST';
            const url = modal.edit ? `${API_URL}/exams/${modal.edit.id}` : `${API_URL}/exams`;

            const response = await fetch(url, {
                method,
                body: payload,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to save exam');
            }

            const res = await fetch(`${API_URL}/exams`);
            if (res.ok) setExams(await res.json());

            closeModal();
        } catch (error: any) {
            console.error('Error saving exam:', error);
            alert('Erreur : ' + (error.message || 'Impossible de sauvegarder'));
        }
    };

    const deleteExam = async (id: string) => {
        try {
            await fetch(`${API_URL}/exams/${id}`, { method: 'DELETE' });
            setExams(exams.filter((e) => e.id !== id));
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    useEffect(() => {
        if (sessionStorage.getItem('isAdmin') !== 'true') {
            router.push('/DoctorAuthentification');
        }
    }, [router]);

    return (
        <div className="adminPageContainer">
            <AdminHeader />

            <main className="adminPageMain">
                <div className={localStyles.searchContainer}>
                    <div className={localStyles.searchWrapper}>
                        <input
                            type="text"
                            placeholder="Search by exam type..."
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                            className={localStyles.searchInput}
                        />
                        <div className={localStyles.searchIcon}>🔍</div>
                    </div>

                    <div className={localStyles.searchWrapper}>
                        <input
                            type="text"
                            placeholder="Search by doctor name..."
                            value={searchDoctor}
                            onChange={(e) => setSearchDoctor(e.target.value)}
                            className={localStyles.searchInput}
                        />
                        <div className={localStyles.searchIcon}>🔍</div>
                    </div>

                    <div className={localStyles.searchWrapper}>
                        <input
                            type="text"
                            placeholder="Search by patient name..."
                            value={searchPatient}
                            onChange={(e) => setSearchPatient(e.target.value)}
                            className={localStyles.searchInput}
                        />
                        <div className={localStyles.searchIcon}>🔍</div>
                    </div>
                </div>
                <AdminSection title="Exams Management" onAdd={() => openModal()}>
                    {(() => {
                        const filteredExams = exams.filter((exam) => {
                            const typeMatch = searchType === '' || exam.type.toLowerCase().includes(searchType.toLowerCase());
                            const doctorMatch = searchDoctor === '' || exam.doctor?.name?.toLowerCase().includes(searchDoctor.toLowerCase());
                            const patientMatch = searchPatient === '' || exam.patient?.fullName?.toLowerCase().includes(searchPatient.toLowerCase());
                            return typeMatch && doctorMatch && patientMatch;
                        });

                        if (filteredExams.length === 0) {
                            return (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '3rem 1.5rem',
                                    color: '#666',
                                    fontSize: '1.1rem',
                                    background: 'rgba(255, 255, 255, 0.7)',
                                    borderRadius: '20px',
                                    margin: '1rem 0',
                                    backdropFilter: 'blur(8px)',
                                    border: '1px solid rgba(20, 184, 166, 0.2)',
                                }}>
                                    <p style={{ margin: 0, fontWeight: '600' }}>
                                        Aucun résultat trouvé
                                    </p>
                                </div>
                            );
                        }

                        return filteredExams.map((exam) => (
                            <AdminExamCard
                                key={exam.id}
                                exam={exam}
                                onEdit={() => openModal(exam)}
                                onDelete={() => deleteExam(exam.id)}
                            />
                        ));
                    })()}
                </AdminSection>

                <AddEditModal<ExamFormData>
                    isOpen={modal.open}
                    onClose={closeModal}
                    title={modal.edit ? 'Modify an Exam' : 'Assign an Exam'}
                    initial={modal.edit ? {
                        type: modal.edit.type,
                        date: modal.edit.date,
                        status: modal.edit.status,
                        doctorId: modal.edit.doctorId,
                        patientId: modal.edit.patientId,
                        fileUrl: modal.edit.fileUrl,
                    } : {
                        type: '',
                        date: new Date().toISOString().split('T')[0],
                        status: 'Pending',
                        doctorId: '',
                        patientId: '',
                    }}
                    onSave={saveExam}
                >
                    {(data, set) => {
                        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                set({ file });
                            }
                        };

                        return (
                            <>
                                <input
                                    className={styles.input}
                                    placeholder="Exam Type *"
                                    value={data.type}
                                    onChange={(e) => set({ type: e.target.value })}
                                    required
                                />

                                <input
                                    className={styles.input}
                                    type="date"
                                    value={data.date}
                                    onChange={(e) => set({ date: e.target.value })}
                                    required
                                />

                                <select
                                    className={styles.input}
                                    value={data.status}
                                    onChange={(e) => set({ status: e.target.value as ExamFormData['status'] })}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Ready">Ready</option>
                                    <option value="Completed">Completed</option>
                                </select>

                                <select
                                    className={styles.input}
                                    value={data.doctorId}
                                    onChange={(e) => set({ doctorId: e.target.value })}
                                    required
                                >
                                    <option value="">Select a doctor</option>
                                    {doctors.map((doc) => (
                                        <option key={doc.id} value={doc.id}>
                                            {doc.name} ({doc.specialty})
                                        </option>
                                    ))}
                                </select>

                                <select
                                    className={styles.input}
                                    value={data.patientId}
                                    onChange={(e) => set({ patientId: e.target.value })}
                                    required
                                >
                                    <option value="">Select a patient</option>
                                    {patients.map((pat) => (
                                        <option key={pat.id} value={pat.id}>
                                            {pat.fullName}
                                        </option>
                                    ))}
                                </select>

                                <div className={styles.photoUploadContainer}>
                                    <label className={styles.photoUploadLabel}>
                                        PDF Result (optional)
                                    </label>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={handleFileChange}
                                        className={styles.photoFileInput}
                                    />
                                    {data.fileUrl && (
                                        <a
                                            href={data.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ display: 'block', marginTop: '0.5rem', color: '#14b8a6' }}
                                        >
                                            View the current PDF
                                        </a>
                                    )}
                                </div>
                            </>
                        );
                    }}
                </AddEditModal>
            </main>
        </div>
    );
}