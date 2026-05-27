"use client";

import { CalendarPlus } from "lucide-react";
import { motion } from "framer-motion";

export default function CalendarIntegration() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex justify-center my-12"
    >
      <a 
        href="/api/calendar" 
        className="flex items-center gap-3 px-6 py-3 bg-navy-light/50 hover:bg-navy-light border border-gold/30 rounded-full text-gold-light hover:text-gold transition-colors backdrop-blur-md shadow-lg"
      >
        <CalendarPlus size={20} />
        <span className="font-medium tracking-wide">Save to Calendar</span>
      </a>
    </motion.div>
  );
}
