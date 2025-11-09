// page.tsx
"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ExamTable from "@/components/ExamTable";
import { patients, exams } from "@/components/types";
import styles from "./page.module.css"; // Import new CSS

export default function Home() {
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

  return (
    <div className={styles["page-container"]}>
      <Sidebar patients={patients} onSelect={setSelectedPatient} />
      <div className={styles["exam-info"]}>
        {selectedPatient ? (
          <ExamTable
            patient={patients.find(p => p.id === selectedPatient)!}
            exams={exams[selectedPatient] || []}
          />
        ) : (
          <p className="text-gray-500 p-4">
            Please select a patient to view their exams.
          </p>
        )}
      </div>
    </div>
  );
}