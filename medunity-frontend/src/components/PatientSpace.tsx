import React from 'react';
// Importation du module CSS
import styles from './PatientSpace.module.css';
import PatientSpaceHeader from './PatientSpaceHeader';

// Interface pour le type de test
interface Test {
  id: number;
  type: string;
  date: string;
  status: 'completed' | 'pending';
}

// Les données fictives pour la liste
const mockTests: Test[] = [
  {
    id: 1,
    type: 'Ana-Path normal',
    date: '21/12/2025',
    status: 'completed',
  },
  {
    id: 2,
    type: 'Cytology',
    date: '28/12/2025',
    status: 'completed',
  },
];

const PatientSpace: React.FC = () => {
  return (
    <div className={styles.patientPage}>
      <PatientSpaceHeader />
      <div className={styles.box}>
      {/* Conteneur principal de la liste des tests */}
        <div className={styles.listContainer}>
            <h2 className={styles.listHeader}>List of Tests</h2>
            
            {/* Carte des résultats */}
            <div className={styles.testListCard}>
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
                {mockTests.map((test) => (
                    <tr key={test.id}>
                    <td>{test.type}</td>
                    <td>{test.date}</td>
                    <td>{test.status}</td>
                    <td>
                        {/* Le bouton utilise une classe spécifique pour le style */}
                        <button className={styles.downloadBtn}>PDF</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    </div>
  );
};

export default PatientSpace;