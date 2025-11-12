// src/app/messages/page.tsx
import { MessageStatus } from '@/types'; // Assuming you add MessageStatus to types.ts

export const metadata = {
  title: 'MedUnity – Contact Messages',
};

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

// In a real application, this fetch would be done in a client component or a wrapper.
async function getMessages(): Promise<ContactMessage[]> {
  // Use the correctly named and defined environment variable
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'; 
  
  const res = await fetch(`${BACKEND_URL}/contact`, { // <-- This line is corrected
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch messages');
  }
  return res.json();
}

// Client component to handle status updates (for marking as read)
import MessageList from './MessageList'; // Assume we create this client component

export default async function MessagesPage() {
  const messages = await getMessages();

  return (
    <div style={{ padding: '2rem 0' }}>
      <h1>Contact Messages</h1>
      <p style={{ marginBottom: '1.5rem', color: '#666' }}>
        Manage inquiries submitted through the public contact form.
      </p>

      {/* MessageList will be a client component to handle sorting, filtering, and status updates */}
      <MessageList initialMessages={messages} />

    </div>
  );
}