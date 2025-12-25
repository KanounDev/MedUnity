export type Doctor = {
  id: string;
  name: string;
  title: string; 
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
  date: string;        // e.g. "December 2025"
  content: string;    // Optional: used for display (joined from paragraphs)
  paragraphs?: string[]; // From DB
  image?: string;      // base64 or URL (nullable in DB)
  createdAt: string | Date;  // ← ADD THIS
  updatedAt: string | Date;  // ← ADD THIS (optional but good to have)
};
export type Activity = {
id:string;
title:string;
description:string;
image:string; 
};
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
export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: Date;
  status: 'UNREAD' | 'READ' ;
};