// components/ProfileDisplay.tsx
"use client";

import { useState } from 'react';
import styles from './ProfilePage.module.css';

interface ProfileDisplayProps {
  type: 'doctor' | 'patient';
  data: any; // Doctor or Patient from types.ts
}

export default function ProfileDisplay({ type, data }: ProfileDisplayProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [updateMsg, setUpdateMsg] = useState('');

  const handleUpdate = async () => {
    setUpdateMsg('');
    if (newPassword !== confirmPassword) {
      setUpdateMsg('Passwords do not match');
      return;
    }
    if (!newPassword) {
      setUpdateMsg('Enter a new password');
      return;
    }

    const endpoint = type === 'doctor' ? '/doctors' : '/patients';
    const res = await fetch(`http://localhost:3002${endpoint}/${data.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPassword }),
    });

    setUpdateMsg(res.ok ? 'Password updated successfully!' : 'Update failed');
    if (res.ok) {
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Profile</h1>

      {data.photo && <img src={data.photo} alt="Profile" className={styles.photo} />}

      <div className={styles.info}>
        {type === 'doctor' ? (
          <>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Title:</strong> {data.title}</p>
            <p><strong>Specialty:</strong> {data.specialty}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Degrees:</strong> {data.degrees?.join(', ') || 'N/A'}</p>
            <p><strong>Experience:</strong> {data.experience || 'N/A'}</p>
            <p><strong>Bio:</strong> {data.bio || 'No bio available'}</p>
          </>
        ) : (
          <>
            <p><strong>Full Name:</strong> {data.fullName}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Birth Date:</strong> {data.birthDate || 'N/A'}</p>
            <p><strong>Phone:</strong> {data.phone || 'N/A'}</p>
          </>
        )}
      </div>

      <div className={styles.passwordSection}>
        <h2>Change Password</h2>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={styles.input}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={styles.input}
        />
        <div className={styles.buttons}>
          <button onClick={() => setShowPassword(!showPassword)} className={styles.toggleBtn}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
          <button onClick={handleUpdate} className={styles.updateBtn}>
            Update Password
          </button>
        </div>
        {updateMsg && (
          <p className={updateMsg.includes('success') ? styles.success : styles.error}>
            {updateMsg}
          </p>
        )}
      </div>
    </div>
  );
}