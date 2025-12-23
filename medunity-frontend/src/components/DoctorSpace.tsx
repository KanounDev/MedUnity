"use client";

import { useState, useEffect } from 'react';
import DoctorSpaceHeader from './DoctorSpaceHeader';
import styles from './DoctorSpace.module.css';
import { API_BASE_URL } from '@/config/api';
import { Exam, Patient } from '@/types'; // Adjust path to your types.ts (e.g., '@/types' if in src/types.ts)

export default function DoctorSpace() {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [patients, setPatients] = useState<Pick<Patient, 'id' | 'fullName'>[]>([]); // Use subset of Patient type
  const [groupedExams, setGroupedExams] = useState<Record<string, Exam[]>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorId = sessionStorage.getItem('doctorId');
        if (!doctorId) {
          // Use router for redirect (import useRouter if needed)
          const router = (await import('next/navigation')).useRouter();
          router.push('/contact'); // Correct path to login page
          return;
        }

        const response = await fetch(`${API_BASE_URL}/exams/doctor/${doctorId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch exams');
        }
        const exams: Exam[] = await response.json();

        // Group exams by patientId
        const grouped = exams.reduce((acc: Record<string, Exam[]>, exam) => {
          const patientId = exam.patientId;
          if (!acc[patientId]) {
            acc[patientId] = [];
          }
          acc[patientId].push(exam);
          return acc;
        }, {});

        // Derive patients from grouped exams
        const derivedPatients = Object.keys(grouped).map((patientId) => ({
          id: patientId,
          fullName: grouped[patientId][0].patient?.fullName || 'Unknown', // Safe access
        }));

        setGroupedExams(grouped);
        setPatients(derivedPatients);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Optional: Show user-friendly error message
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <DoctorSpaceHeader />

      <div className={styles.pageContainer}>
        {/* Main centered block */}
        <div className={styles.mainBlock}>
          
          {/* Sidebar inside main block */}
          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Patients</h2>
            <ul className={styles.patientList}>
              {patients.map((patient) => (
                <li
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient.id)}
                  className={`${styles.patientItem} ${
                    selectedPatient === patient.id ? styles.selected : ''
                  }`}
                >
                  {patient.fullName}
                </li>
              ))}
            </ul>
          </aside>
          {/* Exam info zone inside main block */}
          <main className={styles.examInfo}>
            {selectedPatient ? (
              <div>
                <h2 className={styles.examTitle}>
                  Exams for {patients.find((p) => p.id === selectedPatient)?.fullName}
                </h2>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Exam Type</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(groupedExams[selectedPatient] || []).map((exam, index) => (
                      <tr key={index}>
                        <td>{exam.type}</td>
                        <td>{exam.date}</td>
                        <td className={`${styles.status} ${styles[exam.status.toLowerCase().replace(' ', '')]}`}>
                          {exam.status}
                        </td>
                        <td>
                          {exam.status === 'Ready' && exam.fileUrl ? (
                            <a href={`${API_BASE_URL}${exam.fileUrl}`} download className={styles.downloadBtn}>
                              Download
                            </a>
                          ) : (
                            <button className={styles.downloadBtnDisabled} disabled>
                              Not ready
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className={styles.noPatientMessage}>
                <p>Please select a patient from the list to view medical exams.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}