"use client";
import React from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Home as HomeIcon } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative bg-[#F6F6F3] p-3 sm:p-5 md:p-8 min-h-screen flex items-center justify-center">
      
      {/* Outer framed container with the house image as the background */}
      <div 
        className="relative w-full max-w-7xl bg-[#F6F6F3] rounded-[28px] sm:rounded-[40px] md:rounded-[48px] border-[6px] sm:border-[12px] md:border-[20px] border-white shadow-premium overflow-hidden px-4 sm:px-6 md:px-12 pt-16 pb-12 md:pb-16 flex flex-col items-center justify-between min-h-[80vh] sm:min-h-[85vh]"
        style={{
          backgroundImage: "url('/modern_villa.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Soft semi-transparent overlay to ensure all text and cards remain highly readable */}
        <div className="absolute inset-0 bg-[#F6F6F3]/85 sm:bg-[#F6F6F3]/80 z-0" />

        {/* 1. Top Badges & Tagline */}
        <div className="relative z-10 flex flex-col items-center mb-6">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#FF6B00] bg-[#FF6B00]/10 px-3.5 py-1.5 rounded-full border border-[#FF6B00]/15"
          >
            ✦ Verified Student Housing Platform
          </motion.span>
        </div>

        {/* 2. Central Title Typographic Layout (Space Grotesk & Cormorant Garamond) */}
        {/* Use clamped responsive font sizing to ensure beautiful scaling on mobile, tablet, and widescreen */}
        <div className="relative w-full text-center z-10 flex flex-col items-center mb-10 max-w-5xl px-2">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-stylish-sans font-light tracking-tight text-brand-charcoal leading-none mb-1 sm:mb-2 select-none"
          >
            Find your next
          </motion.h1>
          
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial italic tracking-tight text-[#FF6B00] leading-none mb-1 sm:mb-2 sm:pl-[20%] select-none"
          >
            premium home
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-stylish-sans font-bold tracking-tight text-brand-charcoal leading-none select-none"
          >
            anywhere near campus.
          </motion.h1>
        </div>

        {/* 3. Floating Stats Cards - Only visible on wide viewports (xl+) to prevent clashing/overlapping with title text */}
        <div className="absolute inset-0 pointer-events-none z-10 hidden xl:block">
          {/* Floating Card: Trust Stats (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute left-10 lg:left-16 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md px-5 py-4 rounded-[20px] shadow-xl border border-white/40 flex-col gap-1 w-52 text-left pointer-events-auto"
          >
            <span className="text-2xl font-black text-[#1A1A1A]">+1,200</span>
            <span className="text-[10px] text-gray-500 font-medium leading-relaxed">
              students trust our verified housing advisory daily
            </span>
            <div className="flex -space-x-1.5 mt-1">
              <img className="inline-block h-5.5 w-5.5 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="" />
              <img className="inline-block h-5.5 w-5.5 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="" />
              <img className="inline-block h-5.5 w-5.5 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="" />
            </div>
          </motion.div>

          {/* Floating Card: Match Score Integrity (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute right-10 lg:right-16 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md px-5 py-4 rounded-[20px] shadow-xl border border-white/40 flex-col gap-1 w-56 text-left pointer-events-auto"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Advisor Match</span>
              <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            </div>
            <span className="text-[10px] font-semibold text-gray-500">Match score</span>
            <span className="text-xl font-black text-brand-charcoal">98.4% <span className="text-xs text-green-500 font-bold ml-1">+0.2%</span></span>
            <span className="text-[10px] font-semibold text-gray-400 mt-1">Verified Safety</span>
            <span className="text-[10px] font-extrabold text-[#FF6B00] uppercase tracking-wider">100% Certified Safe</span>
          </motion.div>
        </div>

        {/* 4. Bottom Area: Subtext & Search Bar layout */}
        {/* Responsive grid that stacks neatly on mobile/tablet and renders as 12-cols on desktop */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center z-10 mt-8 sm:mt-12 px-1">
          
          {/* Subtext and link block (Left 4 cols) */}
          <div className="lg:col-span-4 text-left">
            <p className="text-xs sm:text-sm text-gray-500 font-semibold leading-relaxed mb-3">
              Browse verified listings, connect with certified housing advisors, and lock in your booking stress-free.
            </p>
            <Link href="/listings" className="inline-flex items-center gap-1 text-brand-charcoal font-black text-xs border-b-2 border-brand-charcoal pb-0.5 hover:text-brand-orange hover:border-brand-orange transition-colors">
              <span>Explore Listings</span>
              <span className="text-[10px]">↗</span>
            </Link>
          </div>

          {/* Search Pill (Right 8 cols) */}
          <div className="lg:col-span-8 bg-white/95 backdrop-blur-md p-2 rounded-[24px] shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-center gap-1.5">
              {/* Where */}
              <div className="flex-1 flex items-center px-4 gap-2.5 w-full border-b sm:border-b-0 sm:border-r border-gray-100 py-2 sm:py-1.5 text-left cursor-pointer hover:bg-gray-50/50 rounded-xl transition-colors">
                <MapPin className="text-[#FF6B00] shrink-0" size={16} />
                <div className="flex-1">
                  <span className="block text-[8px] font-black uppercase tracking-wider text-[#1A1A1A]">Where</span>
                  <input
                    type="text"
                    placeholder="Search neighborhoods..."
                    className="bg-transparent border-none focus:ring-0 w-full text-brand-charcoal text-xs outline-none placeholder:text-gray-400 font-semibold p-0 mt-0.5"
                  />
                </div>
              </div>

              {/* Budget */}
              <div className="flex-1 flex items-center px-4 gap-2.5 w-full border-b sm:border-b-0 sm:border-r border-gray-100 py-2 sm:py-1.5 text-left cursor-pointer hover:bg-gray-50/50 rounded-xl transition-colors">
                <span className="text-[#FF6B00] font-black text-sm shrink-0 leading-none">₦</span>
                <div className="flex-1">
                  <span className="block text-[8px] font-black uppercase tracking-wider text-brand-charcoal">Budget</span>
                  <select className="bg-transparent border-none focus:ring-0 w-full text-brand-charcoal text-xs outline-none appearance-none font-semibold p-0 mt-0.5 cursor-pointer font-sans">
                    <option value="">Choose range</option>
                    <option value="50k-100k">₦50k - ₦100k</option>
                    <option value="100k-200k">₦100k - ₦200k</option>
                    <option value="200k+">₦200k+</option>
                  </select>
                </div>
              </div>

              {/* Room Type */}
              <div className="flex-1 flex items-center px-4 gap-2.5 w-full py-2 sm:py-1.5 text-left cursor-pointer hover:bg-gray-50/50 rounded-xl transition-colors">
                <HomeIcon className="text-[#FF6B00] shrink-0" size={16} />
                <div className="flex-1">
                  <span className="block text-[8px] font-black uppercase tracking-wider text-brand-charcoal">Room Type</span>
                  <select className="bg-transparent border-none focus:ring-0 w-full text-[#1A1A1A] text-xs outline-none appearance-none font-semibold p-0 mt-0.5 cursor-pointer font-sans">
                    <option value="">Select type</option>
                    <option value="studio">Studio</option>
                    <option value="ensuite">En-suite</option>
                    <option value="shared">Shared Room</option>
                  </select>
                </div>
              </div>

              {/* Search button */}
              <Link href="/listings" className="w-full sm:w-auto shrink-0">
                <button className="bg-brand-orange hover:bg-brand-orange-light text-white w-full sm:w-auto px-5 py-3 rounded-[18px] font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-brand-orange/20 transition-all cursor-pointer">
                  <Search size={13} strokeWidth={2.5} />
                  <span>Search</span>
                </button>
              </Link>
            </div>
          </div>
          
        </div>

      </div>
    </section>
  );
};

export default Hero;
