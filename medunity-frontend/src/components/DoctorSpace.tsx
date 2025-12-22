"use client";

import { useState } from 'react';
import DoctorSpaceHeader from './DoctorSpaceHeader';
import styles from './DoctorSpace.module.css';

type Exam = {
  type: string;
  date: string;
  status: 'Ready' | 'In Progress' | 'Pending';
  fileUrl?: string;
};

type Patient = {
  id: number;
  name: string;
};

const patients: Patient[] = [
  { id: 1, name: 'Durand, Marie' },
  { id: 2, name: 'Lefèvre, Paul' },
  { id: 3, name: 'Garcia, Sofia' },
  { id: 4, name: 'Dubois, Claire' },
  { id: 5, name: 'Leroy, Thomas' },
  { id: 6, name: 'Petit, Julie' },
  { id: 7, name: 'Roux, Antoine' },
];

const exams: Record<number, Exam[]> = {
  1: [
    { type: 'Radiography Chest', date: '2024-03-10', status: 'Ready', fileUrl: '/files/radiography.pdf' },
    { type: 'Blood Test Complete', date: '2024-03-05', status: 'Ready', fileUrl: '/files/blood-test.pdf' },
    { type: 'Echography Abdomen', date: '2024-03-01', status: 'In Progress' },
    { type: 'MRI Brain', date: '2024-03-12', status: 'Pending' },
  ],
};

export default function DoctorSpace() {
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

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
                  {patient.name}
                </li>
              ))}
            </ul>
          </aside>

          {/* Exam info zone inside main block */}
          <main className={styles.examInfo}>
            {selectedPatient ? (
              <div>
                <h2 className={styles.examTitle}>
                  Exams for {patients.find((p) => p.id === selectedPatient)?.name}
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
                    {(exams[selectedPatient] || []).map((exam, index) => (
                      <tr key={index}>
                        <td>{exam.type}</td>
                        <td>{exam.date}</td>
                        <td className={`${styles.status} ${styles[exam.status.toLowerCase().replace(' ', '')]}`}>
                          {exam.status}
                        </td>
                        <td>
                          {exam.status === 'Ready' && exam.fileUrl ? (
                            <a href={exam.fileUrl} download className={styles.downloadBtn}>
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