export type Doctor = {
  id: string;
  name: string;
  title: string; // e.g. "Dr Thomas PETIT"
  specialty: string;
  email:string;
  degrees: string[];
  experience: string;
  photo: string;
  bio: string;
};
export type Patient = {
  id: string;
  fullName: string;
  email: string;
  birthDate: string;
  phone: string;
  photo: string;
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