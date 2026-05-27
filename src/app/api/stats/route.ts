import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const totalRSVPsStmt = db.prepare('SELECT COUNT(*) as count FROM rsvps');
    const totalAttendingStmt = db.prepare('SELECT SUM(party_size) as count FROM rsvps WHERE attending = 1');
    const totalDeclinedStmt = db.prepare('SELECT COUNT(*) as count FROM rsvps WHERE attending = 0');
    
    const rsvps = totalRSVPsStmt.get() as { count: number };
    const attending = totalAttendingStmt.get() as { count: number | null };
    const declined = totalDeclinedStmt.get() as { count: number };

    return NextResponse.json({ 
      totalResponses: rsvps.count,
      totalAttendingGuests: attending.count || 0,
      totalDeclined: declined.count
    });
  } catch (error) {
    console.error('Stats Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
