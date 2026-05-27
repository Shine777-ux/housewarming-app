import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, attending, party_size, message } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const stmt = db.prepare(`
      INSERT INTO rsvps (name, attending, party_size, message)
      VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(name, attending ? 1 : 0, party_size || (attending ? 1 : 0), message || null);

    return NextResponse.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    console.error('RSVP Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
