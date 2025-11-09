import styles from "./ExamTable.module.css";

type Exam = {
  type: string;
  date: string;
  status: "Ready" | "In Progress" | "Pending";
  fileUrl?: string;
};

type ExamTableProps = {
  patient: { name: string };
  exams: Exam[];
};

export default function ExamTable({ patient, exams }: ExamTableProps) {
  return (
    <div className={styles["exam-info"]}>
      <h2>Exams for {patient.name}</h2>
      <table className={styles.examTable}>
        <thead>
          <tr>
            <th>Exam Type</th>
            <th>Date</th>
            <th>Status</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam, index) => (
            <tr key={index}>
              <td>{exam.type}</td>
              <td>{exam.date}</td>
              <td className={`${styles.status} ${styles[exam.status.toLowerCase().replace(' ', '-')]} `}>
                {exam.status}
              </td>
              <td>
                {exam.status === "Ready" && exam.fileUrl ? (
                  <a href={exam.fileUrl} download className={styles["download-btn"]}>
                    ⬇️ Download
                  </a>
                ) : (
                  <button className={`${styles["download-btn"]} ${styles.disabled}`} disabled>
                    Not ready
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
