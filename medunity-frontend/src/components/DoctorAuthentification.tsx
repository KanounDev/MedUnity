"use client";
import React, { useState } from 'react';
// 🚨 Importez le hook de redirection de Next.js
import { useRouter } from 'next/navigation'; 
// Importation du CSS Module
import styles from './PatientAuthentification.module.css';

// Icône de cœur stylisée (laissée intacte)
const HeartIcon = () => (
    // Utilisation de styles.heartIconContainer, etc.
    <div className={styles.heartIconContainer}>
        <svg className={styles.heartIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="#37678C" strokeWidth="1.5" fill="none"/>
        </svg>
    </div>
);

const PatientAuthentification: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // Initialiser le router
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Vérification que les champs NE SONT PAS vides
        if (username.trim() === '' || password.trim() === '') {
            // Afficher un message d'erreur si les champs sont vides
            alert('Veuillez remplir le nom d’utilisateur et le mot de passe pour vous connecter.');
            return; // Arrête la fonction
        }

        // 2. Logique de vérification de l'authentification (à compléter avec votre API)
        
        // Simuler une vérification réussie :
        // Si les champs sont non vides, on considère que la connexion est réussie pour cette démonstration.
        console.log('Authentification réussie pour:', username);
        
        // 3. Redirection vers la page /PatientSpace
        // Utilisez router.push pour une navigation rapide sans rechargement complet de la page
        router.push('/PatientSpace'); 
    };

    return (
        // Reste du JSX inchangé...
        <div className={styles.authPageContainer}>
            <div className={styles.authCardWrapper}>
                {/* Carte de Connexion */}
                <div className={styles.authCard}>
                    <h2 className={styles.cardTitle}>Patient Space</h2>
                    <p className={styles.cardSubtitle}>Access to exam results</p>
                    
                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="username">User Name:</label>
                            <input 
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={styles.authInput}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Password:</label>
                            <input 
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.authInput}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.connexionButton}>
                            Connexion
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PatientAuthentification;