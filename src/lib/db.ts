import path from 'path';
import fs from 'fs';

export interface RSVP {
  name: string;
  attending: boolean;
  party_size: number;
  message: string | null;
}

export interface GuestbookMessage {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export interface RSVPStats {
  totalResponses: number;
  totalAttendingGuests: number;
  totalDeclined: number;
}

let adapter: any = null;

async function getAdapter() {
  if (adapter) return adapter;

  const isPostgres = !!(process.env.POSTGRES_URL || process.env.DATABASE_URL);

  if (isPostgres) {
    const { Pool } = await import('pg');
    const pool = new Pool({
      connectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    // Initialize Postgres table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS rsvps (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        attending BOOLEAN NOT NULL,
        party_size INTEGER NOT NULL,
        message TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    adapter = {
      async getGuestbookMessages(): Promise<GuestbookMessage[]> {
        const res = await pool.query(`
          SELECT id, name, message, created_at 
          FROM rsvps 
          WHERE message IS NOT NULL AND message != ''
          ORDER BY created_at DESC
        `);
        return res.rows.map(row => ({
          id: row.id,
          name: row.name,
          message: row.message,
          created_at: row.created_at.toISOString()
        }));
      },
      async saveRSVP(rsvp: RSVP): Promise<number | string> {
        const res = await pool.query(`
          INSERT INTO rsvps (name, attending, party_size, message)
          VALUES ($1, $2, $3, $4)
          RETURNING id
        `, [rsvp.name, rsvp.attending, rsvp.party_size, rsvp.message]);
        return res.rows[0].id;
      },
      async getStats(): Promise<RSVPStats> {
        const totalRSVPsRes = await pool.query('SELECT COUNT(*) as count FROM rsvps');
        const totalAttendingRes = await pool.query('SELECT SUM(party_size) as count FROM rsvps WHERE attending = TRUE');
        const totalDeclinedRes = await pool.query('SELECT COUNT(*) as count FROM rsvps WHERE attending = FALSE');
        
        return {
          totalResponses: parseInt(totalRSVPsRes.rows[0].count, 10),
          totalAttendingGuests: parseInt(totalAttendingRes.rows[0].count || '0', 10),
          totalDeclined: parseInt(totalDeclinedRes.rows[0].count, 10)
        };
      }
    };
  } else {
    const Database = (await import('better-sqlite3')).default;
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const dbPath = path.join(dataDir, 'invitation.db');
    const db = new Database(dbPath);

    db.exec(`
      CREATE TABLE IF NOT EXISTS rsvps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        attending BOOLEAN NOT NULL,
        party_size INTEGER NOT NULL,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    adapter = {
      async getGuestbookMessages(): Promise<GuestbookMessage[]> {
        const stmt = db.prepare(`
          SELECT id, name, message, created_at 
          FROM rsvps 
          WHERE message IS NOT NULL AND message != ''
          ORDER BY created_at DESC
        `);
        return stmt.all() as any[];
      },
      async saveRSVP(rsvp: RSVP): Promise<number | string> {
        const stmt = db.prepare(`
          INSERT INTO rsvps (name, attending, party_size, message)
          VALUES (?, ?, ?, ?)
        `);
        const result = stmt.run(rsvp.name, rsvp.attending ? 1 : 0, rsvp.party_size, rsvp.message);
        return result.lastInsertRowid as number | string;
      },
      async getStats(): Promise<RSVPStats> {
        const totalRSVPsStmt = db.prepare('SELECT COUNT(*) as count FROM rsvps');
        const totalAttendingStmt = db.prepare('SELECT SUM(party_size) as count FROM rsvps WHERE attending = 1');
        const totalDeclinedStmt = db.prepare('SELECT COUNT(*) as count FROM rsvps WHERE attending = 0');
        
        const rsvps = totalRSVPsStmt.get() as { count: number };
        const attending = totalAttendingStmt.get() as { count: number | null };
        const declined = totalDeclinedStmt.get() as { count: number };
        
        return {
          totalResponses: rsvps.count,
          totalAttendingGuests: attending.count || 0,
          totalDeclined: declined.count
        };
      }
    };
  }

  return adapter;
}

export async function getGuestbookMessages(): Promise<GuestbookMessage[]> {
  const db = await getAdapter();
  return db.getGuestbookMessages();
}

export async function saveRSVP(rsvp: RSVP): Promise<number | string> {
  const db = await getAdapter();
  return db.saveRSVP(rsvp);
}

export async function getStats(): Promise<RSVPStats> {
  const db = await getAdapter();
  return db.getStats();
}
