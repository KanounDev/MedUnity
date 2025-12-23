export type Doctor = {
  id: string;
  name: string;
  title: string; // e.g. "Dr Thomas PETIT"
  specialty: string;
  email:string;
  password:string;
  degrees: string[];
  experience: string;
  photo: string;
  bio: string;
};
export type Patient = {
  id: string;
  fullName: string;
  email?: string;
  password?: string;
  birthDate?: string;
  phone?: string;
  photo?: string;
}
export type News = {
  id: string;
  title: string;
  date: string;        // e.g. "Novembre 2025"
  content: string;
  image: string;       // base64 or URL
};
export type Activity = {
id:string;
title:string;
description:string;
image:string; // base64 or URL
};
// Add to src/types.ts (assuming you have a types file)
export interface Exam {
  id: string;
  type: string;
  date: string;
  status: 'Pending' | 'In Progress' | 'Ready' | 'Completed';
  fileUrl?: string;
  doctorId: string;
  patientId: string;
  doctor?: Pick<Doctor, 'id' | 'name' | 'specialty'>;
  patient?: Pick<Patient, 'id' | 'fullName'>;
  createdAt: string;
  updatedAt: string;
}