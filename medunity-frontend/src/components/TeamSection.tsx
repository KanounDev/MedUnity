// components/TeamSection.tsx
"use client";

import { useState, useEffect } from "react";
import DoctorCard from "./DoctorCard";
import DoctorModal from "./DoctorModal";
import { Doctor } from "@/types";
import styles from "./TeamSection.module.css";
import Image from "next/image";

const API_URL = "http://localhost:3002"; 

export default function TeamSection() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selected, setSelected] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${API_URL}/doctors`);
        if (!res.ok) throw new Error("Unable to load doctors");
        const data = await res.json();

        // Map backend fields → frontend expected fields
        const mappedDoctors: Doctor[] = data.map((d: any) => ({
          id: d.id,
          name: d.name,
          title: d.title || "",
          specialty: d.specialty,
          degrees: d.degrees || [],
          experience: d.experience || "",
          photo: d.photo || "/placeholder-doctor.jpg", // fallback image
          bio: d.bio || "Experienced pathologist.",
          email: d.email,
        }));

        setDoctors(mappedDoctors);
      } catch (err) {
        setError("Error loading the medical team");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <section className={styles.container}>
        <p className="text-center py-20 text-gray-600">Loading the medical team...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.container}>
        <p className="text-center py-20 text-red-600">{error}</p>
      </section>
    );
  }

  return (
    <>
      <section className={styles.container}>
        <h1 className={styles.title}>A Team of Passionate Doctors</h1>
        <p className={styles.subtitle}>
          {doctors.length} doctor(s) at your service, trained in the top institutions
        </p>

        {/* Banners */}
        <div className={styles.banners}>
          <div className={styles.banner}>
            <Image src="/banners/1.png" alt="Availability" width={300} height={110} />
            <p>Always available to listen and explain</p>
          </div>
          <div className={styles.banner}>
            <Image src="/banners/2.png" alt="Conventions" width={300} height={110} />
            <p>Conventions: sector 1, direct billing, checks</p>
          </div>
          <div className={styles.banner}>
            <Image src="/banners/3.png" alt="Quality" width={300} height={110} />
            <p>Quality in Anatomical and Cytological Pathology</p>
          </div>
          <div className={styles.banner}>
            <Image src="/banners/4.png" alt="Training" width={300} height={110} />
            <p>Trained in top institutions</p>
          </div>
        </div>

        <div className={styles.count}>
          <h2>{doctors.length} DOCTOR(S)</h2>
        </div>

        <hr className={styles.divider} />

        {/* Doctor Grid */}
        {doctors.length === 0 ? (
          <p className="text-center py-16 text-gray-500">
            No doctors have been added yet.
          </p>
        ) : (
          <div className={styles.grid}>
            {doctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} onClick={() => setSelected(doc)} />
            ))}
          </div>
        )}

        <DoctorModal doctor={selected} onClose={() => setSelected(null)} />
      </section>
    </>
  );
}
