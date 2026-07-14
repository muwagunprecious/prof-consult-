"use client";
import React from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Home as HomeIcon } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/hero_banner.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark gradient overlay so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Content sits on top of the background */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 w-full flex flex-col items-center text-center pt-24 pb-16">

        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full text-white/90 text-xs font-bold uppercase tracking-widest border border-white/20"
        >
          ✦ Verified Student Housing Platform
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-extrabold leading-tight mb-5 max-w-3xl"
          style={{
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            fontFamily: "'Georgia', 'Playfair Display', serif",
            color: "#FFFFFF",
            textShadow: "0 2px 20px rgba(0,0,0,0.4)",
            letterSpacing: "-0.01em",
          }}
        >
          Find your next premium home{" "}
          <span
            style={{
              color: "#FF6B35",
              fontStyle: "italic",
            }}
          >
            anywhere near campus.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            color: "rgba(255,255,255,0.80)",
            fontSize: "1.1rem",
            fontFamily: "'Inter', sans-serif",
            maxWidth: "560px",
            marginBottom: "2.5rem",
            lineHeight: 1.65,
          }}
        >
          Browse verified listings, connect with certified housing advisors, and
          lock in your booking stress-free.
        </motion.p>

        {/* Search Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-white/95 backdrop-blur-md p-3 rounded-[32px] shadow-2xl flex flex-col lg:flex-row items-center gap-2 w-full max-w-4xl border border-white/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition-all duration-300"
        >
          {/* Where */}
          <div className="flex-1 flex items-center px-5 gap-3 w-full border-b lg:border-b-0 lg:border-r border-gray-200 py-3 lg:py-1 text-left cursor-pointer hover:bg-gray-50/60 rounded-2xl transition-colors">
            <MapPin className="text-orange-500 shrink-0" size={20} />
            <div className="flex-1">
              <span className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-700">
                Where
              </span>
              <input
                type="text"
                placeholder="Search neighborhoods or campus..."
                className="bg-transparent border-none focus:ring-0 w-full text-gray-800 text-sm outline-none placeholder:text-gray-400 font-medium p-0 mt-0.5"
              />
            </div>
          </div>

          {/* Budget */}
          <div className="flex-1 flex items-center px-5 gap-3 w-full border-b lg:border-b-0 lg:border-r border-gray-200 py-3 lg:py-1 text-left cursor-pointer hover:bg-gray-50/60 rounded-2xl transition-colors">
            <span className="text-orange-500 font-bold text-xl shrink-0 leading-none">
              ₦
            </span>
            <div className="flex-1">
              <span className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-700">
                Budget
              </span>
              <select className="bg-transparent border-none focus:ring-0 w-full text-gray-800 text-sm outline-none appearance-none font-medium p-0 mt-0.5 cursor-pointer">
                <option value="">Choose budget range</option>
                <option value="50k-100k">₦50k – ₦100k / mo</option>
                <option value="100k-200k">₦100k – ₦200k / mo</option>
                <option value="200k+">₦200k+ / mo</option>
              </select>
            </div>
          </div>

          {/* Room Type */}
          <div className="flex-1 flex items-center px-5 gap-3 w-full py-3 lg:py-1 text-left cursor-pointer hover:bg-gray-50/60 rounded-2xl transition-colors">
            <HomeIcon className="text-orange-500 shrink-0" size={20} />
            <div className="flex-1">
              <span className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-700">
                Room Type
              </span>
              <select className="bg-transparent border-none focus:ring-0 w-full text-gray-800 text-sm outline-none appearance-none font-medium p-0 mt-0.5 cursor-pointer">
                <option value="">Select space type</option>
                <option value="studio">Studio</option>
                <option value="ensuite">En-suite</option>
                <option value="shared">Shared Room</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <Link href="/listings" className="w-full lg:w-auto shrink-0">
            <button className="bg-orange-500 hover:bg-orange-600 text-white w-full lg:w-auto px-8 py-4 rounded-[24px] font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 transition-all cursor-pointer">
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
