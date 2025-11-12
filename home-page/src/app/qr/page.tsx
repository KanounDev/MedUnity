// app/qr/page.tsx
'use client';
import './global.css';
import React, { useState, FormEvent } from 'react';

// Define the shape of the backend response
interface GeminiResponse {
  answer: string;
}

export default function Qr() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // NOTE: Replace with your actual backend URL/port
  const BACKEND_URL = 'http://localhost:3002/gemini/ask'; // Example URL

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setAnswer('En attente de la réponse de l\'IA...');

    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error('Fetch error:', error);
      setAnswer("Désolé, il y a eu un problème de connexion avec le service Q&R. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset state when closing the modal
    setQuestion('');
    setAnswer('');
  }


  return (
    <main className="activities-page">
      {/* Hero Banner and FAQ sections remain the same */}
      <section className="hero-banner">
        <h1>QUESTIONS – RÉPONSES</h1>
      </section>

      <section className="content">
        <h2>QUESTIONS – RÉPONSES</h2>
        <div className="divider"></div>

        {/* The existing FAQ list goes here... */}
        <div className="faq-list">
          {/* ... existing <details> elements ... */}
          <details className="faq-item">
            <summary>Qu’est-ce que l’anatomie-pathologique ?</summary>
            <p>L’anatomie-pathologique est une discipline médicale méconnue du grand public.
            ...
            </p>
          </details>
          {/* ... all other existing <details> elements ... */}
        </div>
        {/* End of existing FAQ list */}
      </section>

      {/* Bouton flottant + */}
      <button
        onClick={() => {setIsModalOpen(true); setAnswer('');}} // Clear previous answer on open
        className="fab-button"
        aria-label="Poser une question"
      >
        +
      </button>

      {/* Modal pour poser une question */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">Poser une question à l'IA MedUnity</h2>
              <button
                onClick={closeModal}
                className="modal-close-btn"
                aria-label="Fermer"
              >
                ×
              </button>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              <textarea
                placeholder="Écrivez votre question ici, par exemple : Quel est le rôle de l'Admin ?"
                rows={4}
                className="modal-textarea"
                required
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                  setAnswer(''); // Clear answer when user starts typing a new question
                }}
                disabled={isLoading}
              />
              <button type="submit" className="modal-submit-btn" disabled={isLoading}>
                {isLoading ? 'Envoi en cours...' : 'Envoyer'}
              </button>
            </form>

            {/* Display the AI's Answer */}
            {answer && (
                <div className="ai-response-box">
                    <h3>Réponse de l'IA MedUnity :</h3>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{answer}</p>
                </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}