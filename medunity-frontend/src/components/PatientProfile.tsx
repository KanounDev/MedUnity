// components/PatientProfile.tsx
"use client";

import { useState, useEffect } from 'react';
import { Patient } from '@/types';
import { API_BASE_URL } from '@/config/api';
import styles from './Profile.module.css'; // Same CSS as DoctorProfile (shared styles)

interface PatientProfileProps {
  onClose: () => void;
}

const PatientProfile: React.FC<PatientProfileProps> = ({ onClose }) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');

  useEffect(() => {
    const patientId = sessionStorage.getItem('patientId');
    if (!patientId) {
      setError('No patient ID found');
      setLoading(false);
      return;
    }

    fetch(`${API_BASE_URL}/patients/${patientId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
      })
      .then(data => {
        setPatient(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load profile');
        setLoading(false);
      });
  }, []);

  const handleUpdatePassword = async () => {
    setUpdateError('');
    setUpdateSuccess('');
    if (newPassword !== confirmPassword) {
      setUpdateError('Passwords do not match');
      return;
    }
    if (!newPassword) {
      setUpdateError('Password cannot be empty');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/patients/${patient?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });
      if (!res.ok) throw new Error('Update failed');
      setUpdateSuccess('Password updated successfully');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      setUpdateError('Failed to update password');
    }
  };

  if (loading) return <div className={styles.modalOverlay}><div className={styles.modalContent}>Loading...</div></div>;
  if (error) return <div className={styles.modalOverlay}><div className={styles.modalContent}>{error}</div></div>;
  if (!patient) return <div className={styles.modalOverlay}><div className={styles.modalContent}>No data</div></div>;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2 className={styles.title}>Patient Profile</h2>
        {patient.photo && <img src={patient.photo} alt="Profile Photo" className={styles.photo} />}
        <p><strong>Full Name:</strong> {patient.fullName}</p>
        <p><strong>Email:</strong> {patient.email}</p>
        <p><strong>Birth Date:</strong> {patient.birthDate}</p>
        <p><strong>Phone:</strong> {patient.phone}</p>

        <h3>Change Password</h3>
        <div className={styles.inputGroup}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="New Password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.toggleGroup}>
          <button onClick={() => setShowPassword(!showPassword)} className={styles.toggleButton}>
            {showPassword ? 'Hide' : 'Show'} Password
          </button>
          <button onClick={handleUpdatePassword} className={styles.updateButton}>
            Update Password
          </button>
        </div>
        {updateError && <p className={styles.errorMessage}>{updateError}</p>}
        {updateSuccess && <p className={styles.successMessage}>{updateSuccess}</p>}
      </div>
    </div>
  );
};

export default PatientProfile;