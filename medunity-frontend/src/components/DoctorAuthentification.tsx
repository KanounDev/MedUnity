// components/DoctorAuthentification.tsx
"use client";
import React, { useState } from 'react';
import styles from './DoctorAuthentification.module.css';
import { useRouter } from 'next/navigation';

const HeartIcon = () => (
  <div className={styles.heartIconContainer}>
    <svg className={styles.heartIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="#37678C" strokeWidth="1.5" fill="none" />
    </svg>
  </div>
);

const DoctorAuthentification: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3002/auth/login-doctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Échec de la connexion');
      }

      // Successful login
      if (data.role === 'admin') {
        sessionStorage.setItem('isAdmin', 'true');
        router.push('/Administrator');
      } else {
        sessionStorage.setItem('isDoctor', 'true');
        sessionStorage.setItem('doctorId', data.id); // Store doctorId here
        router.push('/DoctorSpace');
      }
    } catch (err: any) {
      setError(err.message || 'Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authPageContainer}>
      <div className={styles.authCardWrapper}>
        <div className={styles.authCard}>
          <h2 className={styles.cardTitle}>Doctor Space</h2>
          <p className={styles.cardSubtitle}>Access to patient exams</p>

          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.authInput}
                required
                placeholder="doctor@medunity.com"
                disabled={loading}
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
                disabled={loading}
              />
            </div>

            {error && <p className={styles.errorMessage}>{error}</p>}

            <button type="submit" className={styles.connexionButton} disabled={loading}>
              {loading ? 'Connexion en cours...' : 'Connexion'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorAuthentification;