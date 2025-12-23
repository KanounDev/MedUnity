// components/DoctorProfile.tsx
"use client";

import { useState, useEffect } from 'react';
import { Doctor } from '@/types';
import { API_BASE_URL } from '@/config/api';
import styles from './Profile.module.css'; // Create this CSS file with styles referenced from attached codes (e.g., similar to AdminSection.module.css or PatientAuthentification.module.css)

interface DoctorProfileProps {
  onClose: () => void;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({ onClose }) => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');

  useEffect(() => {
    const doctorId = sessionStorage.getItem('doctorId');
    if (!doctorId) {
      setError('No doctor ID found');
      setLoading(false);
      return;
    }

    fetch(`${API_BASE_URL}/doctors/${doctorId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
      })
      .then(data => {
        setDoctor(data);
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
      const res = await fetch(`${API_BASE_URL}/doctors/${doctor?.id}`, {
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
  if (!doctor) return <div className={styles.modalOverlay}><div className={styles.modalContent}>No data</div></div>;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2 className={styles.title}>Doctor Profile</h2>
        {doctor.photo && <img src={doctor.photo} alt="Profile Photo" className={styles.photo} />}
        <p><strong>Name:</strong> {doctor.name}</p>
        <p><strong>Title:</strong> {doctor.title}</p>
        <p><strong>Specialty:</strong> {doctor.specialty}</p>
        <p><strong>Email:</strong> {doctor.email}</p>
        <p><strong>Degrees:</strong> {doctor.degrees.join(', ')}</p>
        <p><strong>Experience:</strong> {doctor.experience}</p>
        <p><strong>Bio:</strong> {doctor.bio}</p>

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

export default DoctorProfile;