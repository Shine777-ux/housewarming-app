import { NextResponse } from 'next/server';
import { saveRSVP } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, attending, party_size, message } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const lastInsertId = await saveRSVP({
      name,
      attending: !!attending,
      party_size: party_size || (attending ? 1 : 0),
      message: message || null
    });

    return NextResponse.json({ success: true, id: lastInsertId });
  } catch (error) {
    console.error('RSVP Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
