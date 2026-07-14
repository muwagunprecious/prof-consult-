"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, DollarSign, Home as HomeIcon } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative bg-white pt-24 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">
        {/* Subtle Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 bg-brand-orange/5 px-4 py-1.5 rounded-full text-brand-orange text-xs font-bold uppercase tracking-widest border border-brand-orange/10"
        >
          <span>Verified Student Housing Platform</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-brand-charcoal leading-tight mb-6 max-w-4xl tracking-tight"
        >
          Find your next premium home <br />
          <span className="text-brand-orange font-black italic">anywhere near campus.</span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-500 mb-10 max-w-2xl"
        >
          Browse verified listings, connect with certified housing advisors, and lock in your booking stress-free.
        </motion.p>

        {/* Main Flexible Airbnb Search Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-white p-3 rounded-[32px] shadow-2xl flex flex-col lg:flex-row items-center gap-2 w-full max-w-5xl border border-gray-100 mb-12 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-300"
        >
          {/* Destination */}
          <div className="flex-1 flex items-center px-6 gap-4 w-full border-b lg:border-b-0 lg:border-r border-gray-100 py-3 lg:py-1 text-left cursor-pointer hover:bg-gray-50/50 rounded-2xl transition-colors">
            <MapPin className="text-brand-orange shrink-0" size={22} />
            <div className="flex-1">
              <span className="block text-[10px] font-extrabold uppercase tracking-widest text-brand-charcoal">Where</span>
              <input
                type="text"
                placeholder="Search neighborhoods or campus..."
                className="bg-transparent border-none focus:ring-0 w-full text-brand-charcoal text-sm outline-none placeholder:text-gray-400 font-semibold p-0 mt-0.5"
              />
            </div>
          </div>

          {/* Budget */}
          <div className="flex-1 flex items-center px-6 gap-4 w-full border-b lg:border-b-0 lg:border-r border-gray-100 py-3 lg:py-1 text-left cursor-pointer hover:bg-gray-50/50 rounded-2xl transition-colors">
            <span className="text-brand-orange font-bold text-2xl shrink-0 leading-none">₦</span>
            <div className="flex-1">
              <span className="block text-[10px] font-extrabold uppercase tracking-widest text-brand-charcoal">Budget</span>
              <select className="bg-transparent border-none focus:ring-0 w-full text-brand-charcoal text-sm outline-none appearance-none font-semibold p-0 mt-0.5 cursor-pointer">
                <option value="">Choose budget range</option>
                <option value="50k-100k">₦50k - ₦100k / mo</option>
                <option value="100k-200k">₦100k - ₦200k / mo</option>
                <option value="200k+">₦200k+ / mo</option>
              </select>
            </div>
          </div>

          {/* Room Type */}
          <div className="flex-1 flex items-center px-6 gap-4 w-full py-3 lg:py-1 text-left cursor-pointer hover:bg-gray-50/50 rounded-2xl transition-colors">
            <HomeIcon className="text-brand-orange shrink-0" size={22} />
            <div className="flex-1">
              <span className="block text-[10px] font-extrabold uppercase tracking-widest text-brand-charcoal">Room Type</span>
              <select className="bg-transparent border-none focus:ring-0 w-full text-brand-charcoal text-sm outline-none appearance-none font-semibold p-0 mt-0.5 cursor-pointer">
                <option value="">Select space type</option>
                <option value="studio">Studio</option>
                <option value="ensuite">En-suite</option>
                <option value="shared">Shared Room</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <Link href="/listings" className="w-full lg:w-auto shrink-0">
            <button className="bg-brand-orange hover:bg-brand-orange-light text-white w-full lg:w-auto px-10 py-4.5 rounded-[24px] font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/20 transition-all cursor-pointer">
              <Search size={18} strokeWidth={2.5} />
              <span>Search</span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
