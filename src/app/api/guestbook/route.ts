import { NextResponse } from 'next/server';
import { getGuestbookMessages } from '@/lib/db';

export async function GET() {
  try {
    const messages = await getGuestbookMessages();

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Guestbook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
