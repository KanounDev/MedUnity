// medunity-admin/src/app/api/contact/route.ts
import { NextRequest } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3002';

// GET all messages (for the list page)
export async function GET() {
  const res = await fetch(`${BACKEND_URL}/contact`, { cache: 'no-store' });
  const data = await res.json();
  return Response.json(data);
}

// GET unread count (for the header badge)
export async function GET_UNREAD_COUNT() {
  const res = await fetch(`${BACKEND_URL}/contact/unread-count`, { cache: 'no-store' });
  const count = await res.json(); // Backend returns a number
  return Response.json(count);
}

// PATCH to update message status (e.g., mark as read)
export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return new Response('Missing ID', { status: 400 });

  const body = await request.json(); // Should contain { status: 'READ' | 'ARCHIVED' }
  const res = await fetch(`${BACKEND_URL}/contact/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (res.status === 404) {
    return new Response('Message not found', { status: 404 });
  }

  const data = await res.json();
  return Response.json(data, { status: res.status });
}