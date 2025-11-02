// medunity-admin/src/app/api/news/[id]/route.ts

import { NextRequest } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

// 1. Correct PATCH Handler
export async function PATCH(
  request: NextRequest,
  // ➡️ Must be Promise<{ id: string }> to satisfy Next.js validator
  context: { params: Promise<{ id: string }> }
) {
  // ➡️ Await to unwrap the parameters
  const params = await context.params;
  const id = params.id; 

  const body = await request.json();
  const res = await fetch(`${BACKEND_URL}/news/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return Response.json(data, { status: res.status });
}

// 2. Correct DELETE Handler
export async function DELETE(
  request: NextRequest,
  // ➡️ Must be Promise<{ id: string }>
  context: { params: Promise<{ id: string }> }
) {
  // ➡️ Await to unwrap the parameters
  const params = await context.params;
  const id = params.id;

  await fetch(`${BACKEND_URL}/news/${id}`, { method: 'DELETE' });
  return new Response(null, { status: 204 });
}

// 3. Correct GET Handler (for finding one news item)
export async function GET(
  request: NextRequest,
  // ➡️ Must be Promise<{ id: string }>
  context: { params: Promise<{ id: string }> }
) {
  // ➡️ Await to unwrap the parameters
  const params = await context.params;
  const id = params.id;

  const res = await fetch(`${BACKEND_URL}/news/${id}`, { cache: 'no-store' });
  const data = await res.json();
  return Response.json(data);
}