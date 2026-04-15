"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, UserCheck, Key } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="text-brand-orange" size={32} />,
      title: "Search Properties",
      description: "Browse our curated collection of verified, premium student housing near your university.",
    },
    {
      icon: <UserCheck className="text-brand-orange" size={32} />,
      title: "Connect with Advisor",
      description: "Chat with a dedicated expert who will guide you through the selection and advisory process.",
    },
    {
      icon: <Key className="text-brand-orange" size={32} />,
      title: "Secure Your Space",
      description: "Finalize your booking with ease and prepare for a seamless move-in experience.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-brand-beige overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-charcoal mb-4">
            How It <span className="text-brand-orange">Works</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Our 3-step advisory process ensures you find the perfect home without the usual stress of student house hunting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting lines for desktop */}
          <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-0.5 bg-brand-orange/10 -translate-y-1/2 -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="flex flex-col items-center text-center bg-white p-10 rounded-[32px] shadow-premium hover:shadow-premium-hover transition-all duration-300"
            >
              <div className="w-20 h-20 bg-brand-orange/5 rounded-2xl flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-brand-charcoal mb-4">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
