"use client";

import { useState } from 'react';

// Définir un type pour un examen
type Exam = {
  type: string;
  date: string;
  status: 'Ready' | 'In Progress' | 'Pending';
  fileUrl?: string; // Nouveau champ optionnel pour le lien du fichier
};

// Définir un type pour un patient
type Patient = {
  id: number;
  name: string;
};

// Liste des patients
const patients: Patient[] = [
  { id: 1, name: 'Durand, Marie' },
  { id: 2, name: 'Lefèvre, Paul' },
  { id: 3, name: 'Garcia, Sofia' },
  { id: 4, name: 'Dubois, Claire' },
  { id: 5, name: 'Leroy, Thomas' },
  { id: 6, name: 'Petit, Julie' },
  { id: 7, name: 'Roux, Antoine' },
];

// Examens par patient
const exams: Record<number, Exam[]> = {
  1: [
    { type: 'Radiography Chest', date: '2024-03-10', status: 'Ready', fileUrl: '/files/radiography.pdf' },
    { type: 'Blood Test Complete', date: '2024-03-05', status: 'Ready', fileUrl: '/files/blood-test.pdf' },
    { type: 'Echography Abdomen', date: '2024-03-01', status: 'In Progress' },
    { type: 'MRI Brain', date: '2024-03-12', status: 'Pending' },
  ],
  // D'autres patients si nécessaire
};

export default function Home() {
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

  return (
    <div className="page-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>List of patient</h2>
        <ul>
          {patients.map((patient) => (
            <li
              key={patient.id}
              onClick={() => setSelectedPatient(patient.id)}
              className="patient-item"
            >
              {patient.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Zone d'information des examens */}
      <div className="exam-info">
        {selectedPatient ? (
          <div>
            <h2>
              Exams for {patients.find((p) => p.id === selectedPatient)?.name}
            </h2>
            <table>
              <thead>
                <tr>
                  <th>Exam Type</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Download</th> {/* ✅ Nouvelle colonne */}
                </tr>
              </thead>
              <tbody>
                {exams[selectedPatient]?.map((exam, index) => (
                  <tr key={index}>
                    <td>{exam.type}</td>
                    <td>{exam.date}</td>
                    <td
                      className={`status ${exam.status.toLowerCase().replace(' ', '-')}`}
                    >
                      {exam.status}
                    </td>
                    <td>
                      {exam.status === 'Ready' && exam.fileUrl ? (
                        <a
                          href={exam.fileUrl}
                          download
                          className="download-btn"
                        >
                          ⬇️ Download
                        </a>
                      ) : (
                        <button className="download-btn disabled" disabled>
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
          <p>Please select a patient to view their exams.</p>
        )}
      </div>
    </div>
  );
}





