"use client";
import React from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Home as HomeIcon, Star } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative bg-[#F6F6F3] p-4 sm:p-6 md:p-8 overflow-hidden min-h-[92vh] flex items-center justify-center">
      {/* Outermost white container border to mimic Lume AI style */}
      <div className="absolute inset-4 sm:inset-6 md:inset-8 bg-[#F6F6F3] rounded-[36px] sm:rounded-[48px] border-[12px] sm:border-[20px] border-white shadow-sm overflow-hidden flex flex-col justify-between py-16 px-6 sm:px-12">
        
        {/* Soft elegant blur background shapes */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#EBE7DF]/30 rounded-full blur-3xl pointer-events-none" />

        {/* Central Typographic Section */}
        <div className="relative w-full text-center z-10 mt-6 sm:mt-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[10vw] sm:text-[6vw] font-light tracking-tight text-brand-charcoal leading-none mb-1 sm:mb-2 select-none"
          >
            Find your next
          </motion.h1>
          
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-[12vw] sm:text-[7vw] font-editorial italic tracking-tight text-[#FF6B00] leading-none mb-1 sm:mb-2 sm:pl-[24%] select-none"
          >
            premium home
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[10vw] sm:text-[5.5vw] font-black tracking-tight text-brand-charcoal leading-none select-none"
          >
            anywhere near campus.
          </motion.h1>
        </div>

        {/* Floating Structural Integrity Card (Right) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden lg:flex absolute right-16 top-[40%] bg-white/70 backdrop-blur-md px-6 py-5 rounded-[24px] shadow-xl border border-white/40 z-30 flex-col gap-1 w-64 text-left"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Advisor Match</span>
            <div className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse" />
          </div>
          <span className="text-[11px] font-semibold text-gray-500">Match score</span>
          <span className="text-2xl font-black text-brand-charcoal">98.4% <span className="text-xs text-green-500 font-bold ml-1">+0.2%</span></span>
          <span className="text-[11px] font-semibold text-gray-500 mt-2">Verified safety</span>
          <span className="text-xs font-extrabold text-brand-orange uppercase tracking-wider">100% Certified Safe</span>
        </motion.div>

        {/* Floating Trust Card (Left) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden lg:flex absolute left-16 bottom-[30%] bg-white/70 backdrop-blur-md px-5 py-5 rounded-[24px] shadow-xl border border-white/40 z-30 flex-col gap-2 w-56 text-left"
        >
          <span className="text-3xl font-black text-brand-charcoal">+1,200</span>
          <span className="text-xs text-gray-500 font-medium leading-relaxed">
            students trust our verified housing advisory daily
          </span>
          <div className="flex -space-x-2 mt-1">
            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="" />
            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="" />
            <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="" />
          </div>
        </motion.div>

        {/* Minimalist Subtext and Link Block (Left Side) */}
        <div className="relative lg:absolute lg:left-16 lg:bottom-16 max-w-[300px] text-left z-30 mt-6 lg:mt-0 px-4 lg:px-0">
          <p className="text-sm text-gray-500 font-medium leading-relaxed mb-4">
            Browse verified listings, connect with certified housing advisors, and lock in your booking stress-free.
          </p>
          <Link href="/listings" className="inline-flex items-center gap-1.5 text-brand-charcoal font-extrabold text-sm border-b-2 border-brand-charcoal pb-0.5 hover:text-brand-orange hover:border-brand-orange transition-colors">
            <span>Explore Listings</span>
            <span className="text-xs">↗</span>
          </Link>
        </div>

        {/* Center Modern Villa Overlay */}
        <div className="relative w-full max-w-[620px] mx-auto aspect-[16/10] sm:aspect-[16/9] z-20 mt-6 sm:mt-10 rounded-[32px] overflow-hidden shadow-2xl border-4 border-white">
          <img
            src="/modern_villa.png"
            alt="Minimalist Modern Student Home"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Floating Search Pill at the very bottom center */}
        <div className="relative lg:absolute lg:left-1/2 lg:bottom-12 lg:-translate-x-1/2 w-full max-w-3xl z-40 bg-white/90 backdrop-blur-md p-2 rounded-[28px] shadow-2xl border border-white/30 mt-10 lg:mt-0 hover:shadow-[0_20px_50px_rgba(255,107,0,0.15)] transition-all duration-500">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            {/* Where */}
            <div className="flex-1 flex items-center px-4 gap-3 w-full border-b sm:border-b-0 sm:border-r border-gray-100 py-2 sm:py-1.5 text-left cursor-pointer hover:bg-gray-50/50 rounded-xl transition-colors">
              <MapPin className="text-[#FF6B00] shrink-0" size={18} />
              <div className="flex-1">
                <span className="block text-[8px] font-extrabold uppercase tracking-widest text-brand-charcoal">Where</span>
                <input
                  type="text"
                  placeholder="Search neighborhoods..."
                  className="bg-transparent border-none focus:ring-0 w-full text-brand-charcoal text-xs outline-none placeholder:text-gray-400 font-semibold p-0 mt-0.5"
                />
              </div>
            </div>

            {/* Budget */}
            <div className="flex-1 flex items-center px-4 gap-3 w-full border-b sm:border-b-0 sm:border-r border-gray-100 py-2 sm:py-1.5 text-left cursor-pointer hover:bg-gray-50/50 rounded-xl transition-colors">
              <span className="text-[#FF6B00] font-bold text-base shrink-0 leading-none">₦</span>
              <div className="flex-1">
                <span className="block text-[8px] font-extrabold uppercase tracking-widest text-[#1A1A1A]">Budget</span>
                <select className="bg-transparent border-none focus:ring-0 w-full text-brand-charcoal text-xs outline-none appearance-none font-semibold p-0 mt-0.5 cursor-pointer">
                  <option value="">Choose range</option>
                  <option value="50k-100k">₦50k - ₦100k / mo</option>
                  <option value="100k-200k">₦100k - ₦200k / mo</option>
                  <option value="200k+">₦200k+ / mo</option>
                </select>
              </div>
            </div>

            {/* Room Type */}
            <div className="flex-1 flex items-center px-4 gap-3 w-full py-2 sm:py-1.5 text-left cursor-pointer hover:bg-gray-50/50 rounded-xl transition-colors">
              <HomeIcon className="text-[#FF6B00] shrink-0" size={18} />
              <div className="flex-1">
                <span className="block text-[8px] font-extrabold uppercase tracking-widest text-brand-charcoal">Room Type</span>
                <select className="bg-transparent border-none focus:ring-0 w-full text-[#1A1A1A] text-xs outline-none appearance-none font-semibold p-0 mt-0.5 cursor-pointer">
                  <option value="">Select type</option>
                  <option value="studio">Studio</option>
                  <option value="ensuite">En-suite</option>
                  <option value="shared">Shared Room</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <Link href="/listings" className="w-full sm:w-auto shrink-0">
              <button className="bg-brand-orange hover:bg-brand-orange-light text-white w-full sm:w-auto px-6 py-3 rounded-[20px] font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-brand-orange/20 transition-all cursor-pointer">
                <Search size={14} strokeWidth={2.5} />
                <span>Search</span>
              </button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
