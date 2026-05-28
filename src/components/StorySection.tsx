"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Calendar, Clock } from "lucide-react";

export default function StorySection() {
  return (
    <section className="py-24 px-4 max-w-5xl mx-auto space-y-32">
      
      {/* House Reveal */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="flex flex-col md:flex-row items-center gap-12"
      >
        <div className="w-full md:w-1/2">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10">
            <Image 
              src="/house.jpeg" 
              alt="Our New Home" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="font-serif text-3xl md:text-4xl text-gold">The Next Chapter</h2>
          <p className="text-gray-300 font-light leading-relaxed">
            After months of searching and planning, we have finally found our dream space. A place to rest, to create, and most importantly, a place to share with the people we cherish the most.
          </p>
        </div>
      </motion.div>

      {/* Family Reveal */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="flex flex-col md:flex-row-reverse items-center gap-12"
      >
        <div className="w-full md:w-1/2">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10">
            <Image 
              src="/family.jpeg" 
              alt="Our Family" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="font-serif text-3xl md:text-4xl text-gold">With Gratitude</h2>
          <p className="text-gray-300 font-light leading-relaxed">
            Your support and love have meant the world to us during this journey. We cannot wait to celebrate this milestone with you. Expect good food, great music, and endless laughter.
          </p>
        </div>
      </motion.div>

      {/* Event Details & Map */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="bg-navy-light/40 border border-gold/20 p-8 md:p-12 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
        
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">When & Where</h2>
          <div className="w-16 h-px bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="flex items-center gap-4 bg-navy/50 p-6 rounded-2xl border border-white/5">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm text-gold-light uppercase tracking-widest font-light mb-1">Date</p>
              <p className="text-xl">Sunday, 7th June 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-navy/50 p-6 rounded-2xl border border-white/5">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-gold-light uppercase tracking-widest font-light mb-1">Time</p>
              <p className="text-xl">12:15 PM Onwards</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <a 
            href="https://maps.app.goo.gl/ZtBTpfrNJHyzQKDj8" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gold text-navy font-medium rounded-full overflow-hidden transition-transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out" />
            <MapPin size={20} />
            <span>Open in Google Maps</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
