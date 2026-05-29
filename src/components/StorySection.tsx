"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Calendar, Clock, MessageCircle, Phone, Car } from "lucide-react";

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
          <h2 className="font-serif text-3xl md:text-4xl text-gold">The New Beginning</h2>
          <p className="text-gray-300 font-light leading-relaxed">
           After years of planning and dreaming, we finally have a place that feels like home — a space filled with peace, warmth, and new beginnings. More than just walls and rooms, it’s a place where memories will be made, laughter will echo, and moments will be shared with the people who mean the most to us.
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
            There are some moments in life that feel small to the world, but mean everything to us and this is one of those moments. After years of dreaming, hoping, planning, and waiting, we are finally opening the doors to a place we can call our own.
          </p>
          <p className="text-gray-300 font-light leading-relaxed">
            Through every step of this journey, your love, encouragement, and support have stayed with us, and we truly don’t think we could have reached this milestone without the people who stood beside us. This home is not just built with walls and windows, but with memories, prayers, sacrifices, and the love we’ve received from family and friends like you.
          </p>
          <p className="text-gray-300 font-light leading-relaxed">
            As we begin this beautiful new chapter, it would mean so much to have you with us. Come celebrate our happiness, bless our home, and share in the laughter, conversations, food, and moments that will stay in our hearts forever. Because a house becomes a home only when it is filled with the presence of loved ones.
          </p>
        </div>
      </motion.div>

      {/* Bible Verse */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center max-w-3xl mx-auto py-8"
      >
        <p className="font-serif text-2xl md:text-3xl text-gold-light italic leading-relaxed mb-6 px-4">
          "By wisdom a house is built, and through understanding it is established; through knowledge its rooms are filled with rare and beautiful treasures."
        </p>
        <p className="text-gray-400 font-light tracking-widest uppercase text-sm">
          — Proverbs 24:3-4
        </p>
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

        <div className="flex flex-col items-center gap-6">
          <div className="text-center max-w-lg">
            <p className="text-sm text-gold-light uppercase tracking-widest font-light mb-2">Venue</p>
            <p className="text-lg text-gray-300">Koikkara House, near Little Flower L.P School, Olanad, Varapuzha <br/>Ernakulam, Kerala</p>
            
            <div className="mt-4 flex flex-col items-center gap-2 text-gray-400 font-light text-sm">
              <p className="flex items-center gap-2">
                <Car size={16} className="text-gold" /> 
                Ample parking available near the school ground.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <a 
              href="https://maps.app.goo.gl/ZtBTpfrNJHyzQKDj8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-6 py-4 bg-gold text-navy font-medium rounded-full overflow-hidden transition-transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out" />
              <MapPin size={20} />
              <span>Google Maps</span>
            </a>

            <a 
              href="https://wa.me/917777071232?text=Hi!%20We%20would%20love%20to%20join%20the%20housewarming%20ceremony." 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-6 py-4 bg-navy text-gold border border-gold font-medium rounded-full overflow-hidden transition-all hover:bg-gold/10"
            >
              <MessageCircle size={20} />
              <span>RSVP via WhatsApp</span>
            </a>

            <a 
              href="tel:+918684951717" 
              className="group relative inline-flex items-center gap-3 px-6 py-4 bg-navy text-gray-300 border border-white/20 font-medium rounded-full overflow-hidden transition-all hover:bg-white/5"
            >
              <Phone size={20} />
              <span>Call for Directions</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
