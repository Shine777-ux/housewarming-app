import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const stmt = db.prepare(`
      SELECT id, name, message, created_at 
      FROM rsvps 
      WHERE message IS NOT NULL AND message != ''
      ORDER BY created_at DESC
    `);
    
    const messages = stmt.all();

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Guestbook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
