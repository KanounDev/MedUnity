// components/TeamSection.tsx
"use client";

import { useState } from "react";
import DoctorCard from "./DoctorCard";
import DoctorModal from "./DoctorModal";
import { Doctor } from "@/types";
import styles from "./TeamSection.module.css";
import Image from "next/image";

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr Sami Feki",
    title: "Pathologiste",
    specialty: "Cytologie & Histologie",
    degrees: ["MD", "PhD en Pathologie"],
    experience: "15+ ans",
    photo: "/doctors/doctor1.png",
    bio: "Spécialiste en cytologie et histologie, ancien chef de service à l’Hôpital Cochin.",
  },
  {
    id: "2",
    name: "Dr Hasan Jemni",
    title: "Pathologiste",
    specialty: "Uropathologie",
    degrees: ["MD", "Spécialiste en Uropathologie"],
    experience: "20+ ans",
    photo: "/doctors/doctor2.png",
    bio: "Expert en uropathologie, conférencier international.",
  },
  {
    id: "3",
    name: "Dr Kamel Masmoudi",
    title: "Pathologiste",
    specialty: "Dermatopathologie",
    degrees: ["MD", "DES de Dermatopathologie"],
    experience: "12+ ans",
    photo: "/doctors/doctor3.png",
    bio: "Spécialisée en dermatopathologie et médecine légale.",
  },
  // Add more doctors...
];

export default function TeamSection() {
  const [selected, setSelected] = useState<Doctor | null>(null);

  return (
    <>

      <section className={styles.container}>
        <h1 className={styles.title}>Une Équipe de Médecins Passionnés</h1>
        <p className={styles.subtitle}>
          9 médecins pathologistes à votre service, formés dans les plus grands établissements
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
          <h2>9 MÉDECINS PATHOLOGISTES</h2>
        </div>

        <hr className={styles.divider} />

        {/* Doctor Grid */}
        <div className={styles.grid}>
          {doctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} onClick={() => setSelected(doc)} />
          ))}
        </div>

        <DoctorModal doctor={selected} onClose={() => setSelected(null)} />
      </section>
    </>
  );
}