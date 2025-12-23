// components/PatientSpace.tsx
"use client";

import { useState, useEffect } from 'react';
import styles from './PatientSpace.module.css';
import PatientSpaceHeader from './PatientSpaceHeader';
import { API_BASE_URL } from '@/config/api';
import { Exam } from '@/types'; // Use shared type

export default function PatientSpace() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExams = async () => {
      const patientId = sessionStorage.getItem('patientId');

      if (!patientId) {
        window.location.href = '/contact'; // Redirect to patient login
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/exams/patient/${patientId}`);
        if (!response.ok) throw new Error('Failed to load exams');

        const data: Exam[] = await response.json();
        setExams(data);
      } catch (err: any) {
        setError('Impossible de charger les examens. Veuillez réessayer.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  return (
    <div className={styles.patientPage}>
      <PatientSpaceHeader />
      <div className={styles.box}>
        <div className={styles.listContainer}>
          <h2 className={styles.listHeader}>My Exam Results</h2>

          <div className={styles.testListCard}>
            {loading ? (
              <p className={styles.loading}>Chargement des examens...</p>
            ) : error ? (
              <p className={styles.error}>{error}</p>
            ) : exams.length === 0 ? (
              <p>Aucun examen disponible pour le moment.</p>
            ) : (
              <table className={styles.testTable}>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {exams.map((exam) => (
                    <tr key={exam.id}>
                      <td>{exam.type}</td>
                      <td>{exam.date}</td>
                      <td className={`${styles.status} ${styles[exam.status.toLowerCase().replace(' ', '')]}`}>
                        {exam.status === 'Ready' || exam.status === 'Completed' ? 'Ready' : exam.status}
                      </td>
                      <td>
                        {exam.status === 'Ready' && exam.fileUrl ? (
                          <a
                            href={`${API_BASE_URL}${exam.fileUrl}`}
                            download
                            className={styles.downloadBtn}
                          >
                            PDF
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}