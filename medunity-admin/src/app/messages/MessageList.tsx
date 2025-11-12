// src/app/messages/MessageList.tsx
'use client'; // This is essential for a Client Component

import { useState } from 'react';
import { MessageStatus } from '@/types'; // Adjust the import path for types if needed

// Define the component props interface
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  createdAt: string;
  status: MessageStatus;
}

interface MessageListProps {
  initialMessages: ContactMessage[];
}

// Client Component definition
export default function MessageList({ initialMessages }: MessageListProps) {
  const [messages, setMessages] = useState(initialMessages);

  // You will add the logic for marking as read, sorting, and filtering here later.

  return (
    <div>
      {/* Example of rendering the messages */}
      {messages.length === 0 ? (
        <p>No contact messages found.</p>
      ) : (
        <ul>
          {messages.map((msg) => (
            <li key={msg.id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0', backgroundColor: msg.status === MessageStatus.UNREAD ? '#fff3cd' : '#fff' }}>
              <strong>From:</strong> {msg.name} ({msg.email})<br />
              <strong>Subject:</strong> {msg.subject} <br />
              <strong>Status:</strong> {msg.status} <br />
              <p style={{ marginTop: '0.5rem' }}>{msg.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}