'use client';
import { useState } from 'react';
import { notify } from './ToastProvider';
import styles from './ContactSection.module.css';

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate send
    notify('Message sent! We’ll reply soon.', 'success');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className={styles.section}>
      <h2 className={styles.title}>Contact Us</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className={styles.input}
        />
        <input
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={styles.input}
        />
        <input
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          required
          className={styles.input}
        />
        <textarea
          placeholder="Your message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={6}
          required
          className={styles.textarea}
        />
        <button type="submit" className={styles.submit}>
          Send Message
        </button>
      </form>
    </section>
  );
}