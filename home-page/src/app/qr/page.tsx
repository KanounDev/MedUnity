'use client';
import './global.css';
import React, { useState } from 'react';

export default function Qr() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="activities-page">
      {/* Hero Banner */}
      <section className="hero-banner">
        <h1>QUESTIONS – RÉPONSES</h1>
      </section>

      {/* Contenu principal */}
      <section className="content">
        <h2>QUESTIONS – RÉPONSES</h2>
        <div className="divider"></div>

        {/* Exemple de questions (tu peux en ajouter autant que tu veux) */}
        <div className="faq-list">
          <details className="faq-item">
            <summary>Qu’est-ce que l’anatomie-pathologique ?</summary>
            <p>L’anatomie-pathologique est une discipline médicale méconnue du grand public.
            Elle est pratiquée par un médecin spécialiste en anatomie et cytologie pathologiques, appelé « anatomo-pathologiste » ou « pathologiste ». Il exerce sa spécialité sur des prélèvements (frottis, ponction, biopsie, exérèse, …) réalisés par votre médecin, généraliste, spécialiste ou chirurgien, lors d’une consultation ou d’une intervention chirurgicale.
            L’examen de ces prélèvements au microscope permet de proposer un diagnostic et de donner des informations au médecin prescripteur pour adapter le traitement et la conduite à tenir.
            </p>
          </details>
          <details className="faq-item">
            <summary>Pourquoi votre spécialité est-elle aussi peu connue du grand public ?</summary>
            <p>Nous ne sommes pas en contact direct avec les patients, mais avec les médecins correspondants qui nous sollicitent pour l’analyse des prélèvements.</p>
          </details>
          <details className="faq-item">
            <summary>Êtes-vous un laboratoire de biologie médicale ?</summary>
            <p>Non, nous sommes un cabinet de Médecins spécialistes.
               Les Laboratoires de Biologie Médicale prennent en charge les analyses biochimiques et bactériologiques (sang, selles, urines, …). Notre domaine concerne l’analyse tissulaire et cellulaire, avec la recherche et la caractérisation des cellules anormales (urines, liquide de ponctions, épanchements, …).</p>
          </details>
          <details className="faq-item">
            <summary>Quel est le rôle du médecin anatomo-pathologiste ?</summary>
            <p>Le médecin anatomo-pathologiste est un acteur fondamental du dépistage et du diagnostic. De plus, il apporte des éléments utiles au pronostic et aux décisions thérapeutiques.
               L’étude macroscopique et microscopique des prélèvements est parfois complétée par d’autres techniques (immuno-histochimie, analyse moléculaire, …). Le compte-rendu comporte une analyse descriptive, une proposition diagnostique, des éléments pronostiques, utiles à la décision thérapeutique.
               Parfois, à la demande du chirurgien, le pathologiste est présent au bloc opératoire pour réaliser une première analyse de prélèvements en cours d’intervention chirurgicale (examen extemporané) afin d’orienter la conduite technique.
               Le médecin pathologiste participe aussi aux réunions de concertation pluri disciplinaires (RCP) avec les spécialistes, les chirurgiens, les cancérologues et les radiologues pour contribuer à la décision thérapeutique.</p>
          </details>
          <details className="faq-item">
            <summary>Quels sont les prélèvements concernés ?</summary>
            <p>Nous ne sommes pas en contact direct avec les patients, mais avec les médecins correspondants qui nous sollicitent pour l’analyse des prélèvements.</p>
          </details>
          <details className="faq-item">
            <summary>Quelles sont les maladies diagnostiquées ?</summary>
            <p>Nous ne sommes pas en contact direct avec les patients, mais avec les médecins correspondants qui nous sollicitent pour l’analyse des prélèvements.</p>
          </details>
          <details className="faq-item">
            <summary>Qu’est-ce qu’un examen extemporané ?</summary>
            <p>Nous ne sommes pas en contact direct avec les patients, mais avec les médecins correspondants qui nous sollicitent pour l’analyse des prélèvements.</p>
          </details>
          <details className="faq-item">
            <summary>Pourquoi ai-je reçu une facture (note d’honoraires) de votre institut ?</summary>
            <p>Nous ne sommes pas en contact direct avec les patients, mais avec les médecins correspondants qui nous sollicitent pour l’analyse des prélèvements.</p>
          </details>
          <details className="faq-item">
            <summary>e reçois une note d’honoraires alors que j’ai déjà payé ma consultation. Pourquoi ?</summary>
            <p>Nous ne sommes pas en contact direct avec les patients, mais avec les médecins correspondants qui nous sollicitent pour l’analyse des prélèvements.</p>
          </details>
          <details className="faq-item">
            <summary>Comment régler ma note d’honoraires ?</summary>
            <p>Nous ne sommes pas en contact direct avec les patients, mais avec les médecins correspondants qui nous sollicitent pour l’analyse des prélèvements.</p>
          </details>
          <details className="faq-item">
            <summary>À quoi correspondent les frais d’acheminement et d’archivage ?</summary>
            <p>Nous ne sommes pas en contact direct avec les patients, mais avec les médecins correspondants qui nous sollicitent pour l’analyse des prélèvements.</p>
          </details>
          <details className="faq-item">
            <summary>Je suis pris en charge à 100 % pour une affection de longue durée (ALD) ou je bénéficie de la CSS. Que dois-je faire ?</summary>
            <p>Nous ne sommes pas en contact direct avec les patients, mais avec les médecins correspondants qui nous sollicitent pour l’analyse des prélèvements.</p>
          </details>
          <details className="faq-item">
            <summary>Pourquoi n’ai-je pas encore reçu mes résultats ?</summary>
            <p>Vous devez nous renvoyer la facture accompagnée d’une copie de votre attestation de Sécurité Sociale mentionnant :
               votre prise en charge à 100% pour une ALD en relation avec l’examen pratiqué.
               l’exonération de la part complémentaire au titre de la CSS.
               Nous demanderons à votre organisme d’Assurance Maladie de nous régler directement : vous n’aurez alors pas à procéder à l’avance des frais.</p>
             </details>
          <details className="faq-item">
            <summary>Puis-je avoir un premier résultat par téléphone ?</summary>
            <p>Aucun résultat ne peut être donné par téléphone, pour des raisons de sécurité et de confidentialité.</p>
          </details>
          <details className="faq-item">
            <summary>Je m’inquiète car l’examen de mon prélèvement n’est pas encore terminé.</summary>
            <p>Dans certains cas, l’interprétation de votre dossier nécessite des investigations complémentaires plus longues. Des expertises externes sont également parfois nécessaires.
               Ce délai ne doit pas vous inquiéter car il ne témoigne pas nécessairement d’un caractère de gravité.</p>
          </details>
          
        </div>
      </section>

      {/* Bouton flottant + */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fab-button"
        aria-label="Poser une question"
      >
        +
      </button>

      {/* Modal pour poser une question */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">Poser une question</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="modal-close-btn"
                aria-label="Fermer"
              >
                ×
              </button>
            </div>

            <form className="modal-form">
              <textarea
                placeholder="Écrivez votre question ici..."
                rows={4}
                className="modal-textarea"
                required
              />
              <button type="submit" className="modal-submit-btn">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
