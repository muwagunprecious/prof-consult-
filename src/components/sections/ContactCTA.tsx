"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const ContactCTA = () => {
  return (
    <section id="contact" className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-brand-charcoal rounded-[48px] p-8 md:p-16 relative overflow-hidden flex flex-col items-center text-center">
          {/* Decorative background elements */}
          <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-brand-orange/20 rounded-full blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] bg-brand-orange/10 rounded-full blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 max-w-3xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let Prof Consult Help You Find the <span className="text-brand-orange">Perfect Space</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              Don't navigate the housing market alone. Our advisors are ready to help you find, verify, and secure your next home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/listings" className="btn-orange flex items-center justify-center gap-2">
                Browse Listings
                <ArrowRight size={20} />
              </Link>
              <button className="bg-white/10 backdrop-blur-md text-white px-10 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition-all active:scale-95">
                <MessageCircle size={20} />
                Contact Advisor
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
