// components/QRSection.tsx
"use client";

import { useState, FormEvent } from "react";
import styles from "./QRSection.module.css";

interface GeminiResponse {
  answer: string;
}

export default function QRSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const BACKEND_URL = "http://localhost:3002/gemini/ask";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setAnswer("En attente de la réponse de l'IA...");

    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data: GeminiResponse = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error(error);
      setAnswer(
        "Désolé, il y a eu un problème de connexion avec le service Q&R. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setQuestion("");
    setAnswer("");
  };

  return (
    <>
      <section className={styles.container}>
        <h1 className={styles.title}>Questions – Réponses</h1>
        <p className={styles.subtitle}>
          Posez vos questions sur l’anatomie pathologique, nos services, ou notre institut.
        </p>

        <div className={styles.faqList}>
          <details className={styles.faqItem}>
            <summary>Qu’est-ce que l’anatomie-pathologique ?</summary>
            <p>
              L’anatomie-pathologique est une discipline médicale méconnue du grand public.
              Elle est pratiquée par un médecin spécialiste en anatomie et cytologie pathologiques,
              appelé « anatomo-pathologiste » ou « pathologiste ». Il exerce sa spécialité sur des
              prélèvements réalisés par votre médecin. L’examen au microscope permet de proposer un
              diagnostic précis.
            </p>
          </details>

          <details className={styles.faqItem}>
            <summary>Pourquoi votre spécialité est-elle aussi peu connue du grand public ?</summary>
            <p>
              Nous ne sommes pas en contact direct avec les patients, mais avec les médecins
              correspondants qui nous sollicitent pour l’analyse des prélèvements.
            </p>
          </details>

          <details className={styles.faqItem}>
            <summary>Êtes-vous un laboratoire de biologie médicale ?</summary>
            <p>
              Non, nous sommes un cabinet de Médecins spécialistes. Les laboratoires de biologie
              médicale réalisent des analyses biochimiques (sang, urine, etc.). Notre domaine
              concerne l’analyse tissulaire et cellulaire.
            </p>
          </details>
        </div>
      </section>

      {/* FAB BUTTON – NOW PERFECTLY VISIBLE & STYLED */}
      <button
        onClick={() => {
          setIsModalOpen(true);
          setAnswer("");
        }}
        className={styles.fabButton}   // ← This was the missing fix!
        aria-label="Poser une question"
      >
        +
      </button>

      {/* Modal – unchanged */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Poser une question à l'IA MedUnity</h2>
              <button onClick={closeModal} className={styles.modalCloseBtn} aria-label="Fermer">
                ×
              </button>
            </div>

            <form className={styles.modalForm} onSubmit={handleSubmit}>
              <textarea
                placeholder="Écrivez votre question ici, par exemple : Quel est le rôle de l'Admin ?"
                rows={5}
                className={styles.modalTextarea}
                required
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                  if (answer) setAnswer("");
                }}
                disabled={isLoading}
              />
              <button type="submit" className={styles.modalSubmitBtn} disabled={isLoading}>
                {isLoading ? "Envoi en cours..." : "Envoyer"}
              </button>
            </form>

            {answer && (
              <div className={styles.aiResponseBox}>
                <h3>Réponse de l’IA MedUnity :</h3>
                <p>{answer}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}