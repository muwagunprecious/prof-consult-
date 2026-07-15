"use client";
import React from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Home as HomeIcon, Star } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-[#FDFBF7] to-[#F5F2EB] pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background blobs for a modern, premium feel */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none -mr-40 -mt-20" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#EBE7DF]/30 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text Content & Search Panel */}
          <div className="lg:col-span-7 text-left flex flex-col justify-center">
            {/* Subtle Friendly Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 bg-brand-orange/10 px-4 py-1.5 rounded-full text-brand-orange text-xs font-bold uppercase tracking-wider border border-brand-orange/15 w-fit"
            >
              <span>✦ Verified Student Housing Platform</span>
            </motion.div>

            {/* Hero Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-brand-charcoal leading-[1.15] mb-6 tracking-tight font-sans"
            >
              Find your next premium home <br />
              <span className="text-brand-orange italic font-bold">anywhere near campus.</span>
            </motion.h1>

            {/* Hero Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 mb-10 max-w-xl leading-relaxed"
            >
              Browse verified listings, connect with certified housing advisors, and lock in your booking stress-free.
            </motion.p>

            {/* Main Search Panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-white p-3 rounded-[32px] shadow-2xl flex flex-col sm:flex-row items-center gap-2 w-full max-w-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
              {/* Destination */}
              <div className="flex-1 flex items-center px-5 gap-3 w-full border-b sm:border-b-0 sm:border-r border-gray-100 py-3 sm:py-1 text-left cursor-pointer hover:bg-gray-50/50 rounded-2xl transition-colors">
                <MapPin className="text-brand-orange shrink-0" size={20} />
                <div className="flex-1">
                  <span className="block text-[10px] font-extrabold uppercase tracking-widest text-[#1A1A1A]">Where</span>
                  <input
                    type="text"
                    placeholder="Search neighborhoods or campus..."
                    className="bg-transparent border-none focus:ring-0 w-full text-brand-charcoal text-sm outline-none placeholder:text-gray-400 font-semibold p-0 mt-0.5"
                  />
                </div>
              </div>

              {/* Budget */}
              <div className="flex-1 flex items-center px-5 gap-3 w-full border-b sm:border-b-0 sm:border-r border-gray-100 py-3 sm:py-1 text-left cursor-pointer hover:bg-gray-50/50 rounded-2xl transition-colors">
                <span className="text-brand-orange font-bold text-lg shrink-0 leading-none">₦</span>
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
              <div className="flex-1 flex items-center px-5 gap-3 w-full py-3 sm:py-1 text-left cursor-pointer hover:bg-gray-50/50 rounded-2xl transition-colors">
                <HomeIcon className="text-brand-orange shrink-0" size={20} />
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
              <Link href="/listings" className="w-full sm:w-auto shrink-0">
                <button className="bg-brand-orange hover:bg-brand-orange-light text-white w-full sm:w-auto px-8 py-4 rounded-[24px] font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/20 transition-all cursor-pointer">
                  <Search size={16} strokeWidth={2.5} />
                  <span>Search</span>
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Premium House Image Showcase */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[420px] aspect-[4/5] rounded-[36px] overflow-hidden shadow-2xl border-4 border-white"
            >
              <img
                src="/hero_banner.png"
                alt="Premium Student Housing"
                className="w-full h-full object-cover"
              />
              
              {/* Bottom floating details badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center justify-between border border-white/20">
                <div>
                  <h4 className="font-extrabold text-sm text-[#1A1A1A]">Modern Studio Apartment</h4>
                  <p className="text-xs text-gray-500 font-medium">Lagos, Nigeria</p>
                </div>
                <div className="bg-[#FF6B00]/5 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Star size={14} className="fill-brand-orange text-brand-orange" />
                  <span className="text-xs font-bold text-brand-orange">4.9</span>
                </div>
              </div>

              {/* Top rating badge */}
              <div className="absolute top-6 left-6 bg-brand-orange text-white px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                ★ Best Match
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
