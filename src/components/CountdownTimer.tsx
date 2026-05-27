"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TARGET_DATE = new Date('2026-06-07T12:15:00+05:30').getTime();

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex justify-center gap-4 md:gap-8 my-16"
    >
      {timeBlocks.map((block, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-24 md:h-24 flex items-center justify-center border border-gold/30 bg-navy-light/50 backdrop-blur-sm rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <span className="font-serif text-2xl md:text-4xl text-gold">{block.value}</span>
          </div>
          <span className="text-gray-400 text-xs md:text-sm uppercase tracking-widest mt-3 font-light">{block.label}</span>
        </div>
      ))}
    </motion.div>
  );
}
