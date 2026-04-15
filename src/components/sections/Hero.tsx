"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, MapPin, PoundSterling, Home } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-beige">
      {/* Background Gradient Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold text-brand-charcoal leading-tight mb-6">
              Find <span className="text-brand-orange">Premium</span> Student Housing <br />
              <span className="italic font-light">Without Stress</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0">
              Verified listings. Trusted advisors. Seamless booking. Your perfect space is just a conversation away.
            </p>

            {/* Advanced Search Bar */}
            <div className="bg-white p-2 rounded-2xl shadow-premium flex flex-col md:flex-row items-center gap-2 max-w-4xl border border-gray-100">
              <div className="flex-1 flex items-center px-4 gap-3 w-full border-b md:border-b-0 md:border-r border-gray-100 py-3 md:py-0">
                <MapPin className="text-brand-orange shrink-0" size={20} />
                <input
                  type="text"
                  placeholder="Where do you want to live?"
                  className="bg-transparent border-none focus:ring-0 w-full text-brand-charcoal outline-none placeholder:text-gray-400"
                />
              </div>
              <div className="flex-1 flex items-center px-4 gap-3 w-full border-b md:border-b-0 md:border-r border-gray-100 py-3 md:py-0">
                <PoundSterling className="text-brand-orange shrink-0" size={20} />
                <select className="bg-transparent border-none focus:ring-0 w-full text-brand-charcoal outline-none appearance-none">
                  <option value="">Budget</option>
                  <option value="200-300">£200 - £300 pw</option>
                  <option value="300-400">£300 - £400 pw</option>
                  <option value="400+">£400+ pw</option>
                </select>
              </div>
              <div className="flex-1 flex items-center px-4 gap-3 w-full py-3 md:py-0">
                <Home className="text-brand-orange shrink-0" size={20} />
                <select className="bg-transparent border-none focus:ring-0 w-full text-brand-charcoal outline-none appearance-none">
                  <option value="">Property Type</option>
                  <option value="studio">Studio</option>
                  <option value="ensuite">En-suite</option>
                  <option value="shared">Shared Room</option>
                </select>
              </div>
              <button className="btn-orange w-full md:w-auto px-10 flex items-center justify-center gap-2">
                <Search size={20} />
                <span>Search</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Illustration/Image */}
        <div className="flex-1 relative hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=1000"
                alt="Modern Student Room"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Soft decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-orange rounded-full opacity-20 -z-10" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-brand-orange/10 rounded-full blur-xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
