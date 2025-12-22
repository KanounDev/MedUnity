"use client";
import React, { useState } from 'react';
import styles from './DoctorAuthentification.module.css';

const HeartIcon = () => (
  <div className={styles.heartIconContainer}>
    <svg className={styles.heartIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="#37678C" strokeWidth="1.5" fill="none" />
    </svg>
  </div>
);

const DoctorAuthentification: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === 'admin@medunity.com') {
      sessionStorage.setItem('isAdmin', 'true');
      window.location.href = '/Administrator';
    } else {
      // Any other email → regular doctor
      sessionStorage.setItem('isDoctor', 'true');
      window.location.href = '/DoctorSpace'; // Redirect to new DoctorSpace
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
              <label htmlFor="username">Email:</label>
              <input
                id="username"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.authInput}
                required
                placeholder="doctor@medunity.com"
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

export default DoctorAuthentification;