'use client';
import { useState } from 'react';
import { notify } from './ToastProvider';
import styles from './ContactSection.module.css';

// Define the shape of the form data
interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3002';

export default function ContactSection() {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BACKEND_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to send message.');
      }

      notify('Message sent! We’ll reply soon.', 'success');
      // Clear the form on success
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      notify('An error occurred. Please try again later.', 'error');
    }
  };

  // ... rest of the component remains the same (inputs, textarea, button)
  return (
    <section id="contact" className={styles.section}>
      <h2 className={styles.title}>Contact Us</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* All input/textarea elements here, use form state as before */}
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