import React from 'react';
// Importez le composant principal que vous avez créé dans votre structure de répertoire
import PatientSpace from '@/components/PatientSpace'; // Assurez-vous que le composant est bien dans le même répertoire ou ajustez le chemin

/**
 * Composant de page Next.js pour l'espace patient.
 *
 * Dans Next.js App Router, un fichier 'page.tsx' exporte par défaut
 * le composant React qui sera rendu pour cette route.
 */
const PatientSpacePage = () => {
  return (
    // Nous enveloppons ici le composant PatientSpace
    <PatientSpace />
  );
};

export default PatientSpacePage;