"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function RSVPForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    attending: "yes",
    party_size: "1",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          attending: formData.attending === "yes",
          party_size: parseInt(formData.party_size)
        })
      });

      if (res.ok) {
        setStatus("success");
        if (formData.attending === "yes") {
          fireConfetti();
        }
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const fireConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#d4af37", "#f3e5ab", "#ffffff"]
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#d4af37", "#f3e5ab", "#ffffff"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  if (status === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20 px-4 max-w-2xl mx-auto"
      >
        <h3 className="font-serif text-4xl text-gold mb-4">Thank You!</h3>
        <p className="text-xl text-gray-300 font-light">
          {formData.attending === "yes" 
            ? "We can't wait to celebrate with you!" 
            : "We will miss you, but thank you for letting us know."}
        </p>
      </motion.div>
    );
  }

  return (
    <section className="py-24 px-4 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">RSVP</h2>
          <p className="text-gray-400 font-light">Please let us know if you can make it by May 25th.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gold-light uppercase tracking-widest font-light mb-2">Your Name</label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-navy border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gold-light uppercase tracking-widest font-light mb-2">Will you attend?</label>
              <select 
                value={formData.attending}
                onChange={(e) => setFormData({...formData, attending: e.target.value})}
                className="w-full bg-navy border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors appearance-none"
              >
                <option value="yes">Joyfully Accept</option>
                <option value="no">Regretfully Decline</option>
              </select>
            </div>
            
            {formData.attending === "yes" && (
              <div>
                <label className="block text-sm text-gold-light uppercase tracking-widest font-light mb-2">Party Size</label>
                <select 
                  value={formData.party_size}
                  onChange={(e) => setFormData({...formData, party_size: e.target.value})}
                  className="w-full bg-navy border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors appearance-none"
                >
                  {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm text-gold-light uppercase tracking-widest font-light mb-2">Leave a Wish (Digital Guestbook)</label>
            <textarea 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-navy border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors min-h-[100px]"
              placeholder="Looking forward to it! / Wishing you the best..."
            />
          </div>

          <button 
            disabled={status === "submitting"}
            className="w-full bg-gold text-navy font-medium py-4 rounded-xl text-lg hover:bg-gold-light transition-colors disabled:opacity-50 mt-4"
          >
            {status === "submitting" ? "Sending..." : "Submit RSVP"}
          </button>
          
          {status === "error" && (
            <p className="text-red-400 text-center mt-4">Something went wrong. Please try again.</p>
          )}
        </form>
      </motion.div>
    </section>
  );
}
