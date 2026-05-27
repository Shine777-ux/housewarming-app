"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Message {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export default function Guestbook() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch("/api/guestbook")
      .then(res => res.json())
      .then(data => {
        if (data.messages) {
          setMessages(data.messages);
        }
      })
      .catch(console.error);
  }, []);

  if (messages.length === 0) return null;

  return (
    <section className="py-24 overflow-hidden border-t border-white/5 bg-navy/50">
      <div className="text-center mb-16 px-4">
        <h2 className="font-serif text-3xl md:text-4xl text-gold mb-4">Wishing Wall</h2>
        <p className="text-gray-400 font-light">Beautiful words from our loved ones.</p>
      </div>

      <div className="relative w-full overflow-hidden flex">
        {/* Left and right gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-navy to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-navy to-transparent z-10" />

        <motion.div 
          className="flex gap-6 px-4"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear"
          }}
        >
          {/* Double the array for seamless looping */}
          {[...messages, ...messages].map((msg, i) => (
            <div 
              key={`${msg.id}-${i}`}
              className="w-80 shrink-0 bg-navy-light/40 border border-gold/10 p-6 rounded-2xl backdrop-blur-sm"
            >
              <p className="text-gray-300 font-light italic mb-6 leading-relaxed">
                "{msg.message}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-navy font-bold text-sm">
                  {msg.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-gold-light text-sm tracking-wide">{msg.name}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
