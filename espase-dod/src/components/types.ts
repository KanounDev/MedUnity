export type Exam = {
  type: string;
  date: string;
  status: "Ready" | "In Progress" | "Pending";
  fileUrl?: string;
};

export type Patient = {
  id: number;
  name: string;
};

export const patients: Patient[] = [
  { id: 1, name: "Durand, Marie" },
  { id: 2, name: "Lefèvre, Paul" },
  { id: 3, name: "Garcia, Sofia" },
];

export const exams: Record<number, Exam[]> = {
  1: [
    { type: "Radiography Chest", date: "2024-03-10", status: "Ready", fileUrl: "/files/radiography.pdf" },
    { type: "MRI Brain", date: "2024-03-12", status: "Pending" },
  ],
};
