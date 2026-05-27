"use client";

import { useEffect, useState } from "react";
import { Users, CheckCircle, XCircle } from "lucide-react";

interface Stats {
  totalResponses: number;
  totalAttendingGuests: number;
  totalDeclined: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    // Poll every 5 seconds for "live" feel
    const fetchStats = () => {
      fetch("/api/stats")
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(console.error);
    };
    
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!stats) return <div className="min-h-screen flex items-center justify-center">Loading stats...</div>;

  return (
    <main className="min-h-screen bg-navy text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl text-gold mb-10">RSVP Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-navy-light/50 border border-white/10 p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Responses</p>
              <p className="text-3xl font-semibold">{stats.totalResponses}</p>
            </div>
          </div>
          
          <div className="bg-navy-light/50 border border-gold/30 p-6 rounded-2xl flex items-center gap-4 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
            <div className="w-12 h-12 rounded-full bg-gold/20 text-gold flex items-center justify-center">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-gold-light text-sm">Total Guests Attending</p>
              <p className="text-3xl font-semibold text-gold">{stats.totalAttendingGuests}</p>
            </div>
          </div>
          
          <div className="bg-navy-light/50 border border-white/10 p-6 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
              <XCircle size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Declined</p>
              <p className="text-3xl font-semibold">{stats.totalDeclined}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
