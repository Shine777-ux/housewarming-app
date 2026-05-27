"use client";

import { motion } from "framer-motion";

interface HeroSectionProps {
  name?: string;
}

export default function HeroSection({ name }: HeroSectionProps) {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-light to-navy -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-3xl mx-auto"
      >
        <p className="text-gold-light uppercase tracking-[0.3em] text-sm md:text-base font-light mb-6">
          {name ? `Hey ${name}, you are warmly invited` : "You are warmly invited"}
        </p>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-light mb-6 drop-shadow-lg">
          Housewarming<br/>
          <span className="italic font-light">Ceremony</span>
        </h1>
        
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-8" />
        
        <p className="text-gray-300 font-light text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
          Please join us as we open the doors of our new home and fill it with love, laughter, and beautiful new memories.
        </p>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-gray-400 text-sm uppercase tracking-widest mb-2 font-light">Scroll to discover</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
