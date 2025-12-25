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
    setAnswer("Waiting for the AI response...");

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
        "We apologize, there was a problem with the Q&R service. Please try again."
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
        <h1 className={styles.title}>Frequently Asked Questions</h1>
        <p className={styles.subtitle}>
          Find answers to common questions about our clinic, services, and your secure patient portal.
        </p>

        <div className={styles.faqList}>
          <details className={styles.faqItem}>
            <summary>How can I access my medical exams and results?</summary>
            <p>
              Registered patients can securely log in to their personal portal on MedUnity.
              There, you can view your consultation history, download exam results (blood tests, X-rays, MRIs, etc.),
              and check the status of ongoing exams (Pending, In Progress, Ready, or Completed).
              Your data is fully protected and confidential.
            </p>
          </details>

          <details className={styles.faqItem}>
            <summary>What specialties do you offer at MedUnity?</summary>
            <p>
              We provide comprehensive care across multiple specialties, including Cardiology, Pediatrics,
              Neurology, Radiology, and General Medicine. Our experienced doctors collaborate to offer
              personalized treatment plans for all ages.
            </p>
          </details>

          <details className={styles.faqItem}>
            <summary>How do I book an appointment or contact the clinic?</summary>
            <p>
              You can use the contact form on our website to send a message, request an appointment,
              or ask general questions. Our administrative team will respond promptly.
              For urgent matters, please call us directly during opening hours.
            </p>
          </details>

          <details className={styles.faqItem}>
            <summary>Is my personal and medical information secure?</summary>
            <p>
              Yes, absolutely. MedUnity uses secure authentication (JWT) and restricted access based on user roles
              (patient, doctor, administrator). Only you and authorized medical staff can view your records.
              We prioritize data privacy and compliance with health regulations.
            </p>
          </details>

          <details className={styles.faqItem}>
            <summary>Can I share my results with another doctor?</summary>
            <p>
              Yes! From your patient portal, you can download PDF reports and share them securely with
              any healthcare professional. Our collaborative tools also allow doctors to exchange information
              when needed for your care.
            </p>
          </details>
        </div>
      </section>

      {/* FAB BUTTON – Ask a question */}
      <button
        onClick={() => {
          setIsModalOpen(true);
          setAnswer("");
        }}
        className={styles.fabButton}
        aria-label="Ask a question"
      >
        +
      </button>

      {/* Modal – Updated to English */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Ask MedUnity AI a Question</h2>
              <button onClick={closeModal} className={styles.modalCloseBtn} aria-label="Close">
                ×
              </button>
            </div>

            <form className={styles.modalForm} onSubmit={handleSubmit}>
              <textarea
                placeholder="Type your question here, e.g., How do I download my exam results?"
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
                {isLoading ? "Sending..." : "Send"}
              </button>
            </form>

            {answer && (
              <div className={styles.aiResponseBox}>
                <h3>MedUnity AI Response:</h3>
                <p>{answer}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}