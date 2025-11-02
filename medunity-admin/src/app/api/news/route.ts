// medunity-admin/src/app/api/news/route.ts ⬅️ This file handles /api/news

import { NextRequest } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

// Handles GET /api/news (Fetch all news)
export async function GET() {
  const res = await fetch(`${BACKEND_URL}/news`, { cache: 'no-store' });
  const data = await res.json();
  return Response.json(data);
}

// Handles POST /api/news (Create a new news item)
export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await fetch(`${BACKEND_URL}/news`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return Response.json(data, { status: res.status });
}