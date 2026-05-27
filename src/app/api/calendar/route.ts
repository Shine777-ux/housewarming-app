import { NextResponse } from 'next/server';
import { createEvent } from 'ics';

export async function GET() {
  const event = {
    start: [2026, 6, 7, 12, 15] as [number, number, number, number, number],
    duration: { hours: 4, minutes: 0 },
    title: 'Our Housewarming Ceremony',
    description: 'Please join us to celebrate our new home!',
    location: 'Our New Home',
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
    alarms: [
      {
        action: 'display',
        description: 'Reminder',
        trigger: { hours: 2, minutes: 0, before: true }
      }
    ]
  };

  return new Promise((resolve, reject) => {
    // @ts-ignore - ics types are slightly mismatched for some reason
    createEvent(event, (error, value) => {
      if (error) {
        console.error('ICS generation error:', error);
        resolve(NextResponse.json({ error: 'Failed to generate calendar file' }, { status: 500 }));
        return;
      }

      const response = new NextResponse(value, {
        headers: {
          'Content-Type': 'text/calendar; charset=utf-8',
          'Content-Disposition': 'attachment; filename="housewarming.ics"'
        }
      });
      resolve(response);
    });
  });
}
