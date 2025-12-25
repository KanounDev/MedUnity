// app/Administrator/ContactMessages/page.tsx
'use client';

import { useState, useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader';
import AdminMessageCard from '@/components/AdminMessageCard';
import { ContactMessage } from '@/types';
import styles from './ContactMessagesPage.module.css';

const API_URL = 'http://localhost:3002';

type StatusFilter = 'ALL' | 'UNREAD' | 'READ' ;

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>([]);
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    let filtered = [...messages];

    // Apply status filter
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(m => m.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'DESC' ? dateB - dateA : dateA - dateB;
    });

    setFilteredMessages(filtered);
  }, [messages, sortOrder, statusFilter]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_URL}/contact`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      alert('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this message?')) return;

    try {
      const res = await fetch(`${API_URL}/contact/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages(prev => prev.filter(m => m.id !== id));
      } else {
        alert('Failed to delete message');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Delete failed');
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'READ') => {
    try {
      const res = await fetch(`${API_URL}/contact/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setMessages(prev =>
          prev.map(m => (m.id === id ? { ...m, status: newStatus } : m))
        );
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Status update error:', error);
      alert('Status update failed');
    }
  };

  const toggleSort = () => {
    setSortOrder(prev => (prev === 'DESC' ? 'ASC' : 'DESC'));
  };

  return (
    <div className={styles.pageContainer}>
      <AdminHeader />

      <main className={styles.main}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#83ede4ff', marginBottom: '1.5rem' }}>
          Contact Messages
        </h1>

        <div className={styles.controls}>
          <button onClick={toggleSort} className={styles.sortButton}>
            Sort: {sortOrder === 'DESC' ? 'Newest First' : 'Oldest First'}
          </button>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className={styles.filterSelect}
          >
            <option value="ALL">All Messages</option>
            <option value="UNREAD">Unread Only</option>
            <option value="READ">Read Only</option>
          </select>
        </div>

        {loading ? (
          <p className={styles.noMessages}>Loading messages...</p>
        ) : filteredMessages.length === 0 ? (
          <p className={styles.noMessages}>No messages found.</p>
        ) : (
          <div className={styles.messagesGrid}>
            {filteredMessages.map(message => (
              <AdminMessageCard
                key={message.id}
                message={message}
                onDelete={() => handleDelete(message.id)}
                onStatusChange={(newStatus) => handleStatusChange(message.id, newStatus)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}