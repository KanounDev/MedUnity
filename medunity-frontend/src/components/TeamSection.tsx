// components/TeamSection.tsx
"use client";

import { useState, useEffect } from "react";
import DoctorCard from "./DoctorCard";
import DoctorModal from "./DoctorModal";
import { Doctor } from "@/types";
import styles from "./TeamSection.module.css";
import Image from "next/image";

const API_URL = "http://localhost:3002"; // Your NestJS backend

export default function TeamSection() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selected, setSelected] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${API_URL}/doctors`);
        if (!res.ok) throw new Error("Impossible de charger les médecins");
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
          bio: d.bio || "Médecin pathologiste expérimenté.",
          email: d.email,
        }));

        setDoctors(mappedDoctors);
      } catch (err) {
        setError("Erreur lors du chargement de l'équipe");
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
        <p className="text-center py-20 text-gray-600">Chargement de l'équipe médicale...</p>
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
        <h1 className={styles.title}>Une Équipe de Médecins Passionnés</h1>
        <p className={styles.subtitle}>
          {doctors.length} médecin(s) pathologiste(s) à votre service, formés dans les plus grands établissements
        </p>

        {/* Banners */}
        <div className={styles.banners}>
          <div className={styles.banner}>
            <Image src="/banners/1.png" alt="Disponibilité" width={300} height={110} />
            <p>Toujours disponibles pour écouter et expliquer</p>
          </div>
          <div className={styles.banner}>
            <Image src="/banners/2.png" alt="Conventions" width={300} height={110} />
            <p>Conventions : secteur 1, tiers payant, chèques</p>
          </div>
          <div className={styles.banner}>
            <Image src="/banners/3.png" alt="Qualité" width={300} height={110} />
            <p>Qualité en Anatomie et Cytologie Pathologiques</p>
          </div>
          <div className={styles.banner}>
            <Image src="/banners/4.png" alt="Formation" width={300} height={110} />
            <p>Formés dans les grands établissements</p>
          </div>
        </div>

        <div className={styles.count}>
          <h2>{doctors.length} MÉDECINS PATHOLOGISTES</h2>
        </div>

        <hr className={styles.divider} />

        {/* Doctor Grid */}
        {doctors.length === 0 ? (
          <p className="text-center py-16 text-gray-500">
            Aucun médecin n'a encore été ajouté.
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