"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const reviews = [
    {
      name: "Alex Thompson",
      university: "UCL Student",
      text: "Prof Consult made finding a studio in London actually enjoyable. My advisor was available 24/7 and really understood my budget.",
      image: "https://i.pravatar.cc/150?u=alex",
    },
    {
      name: "Sarah Chen",
      university: "Imperial College",
      text: "I was worried about booking from abroad, but the verified listings and detailed videos gave me total peace of mind.",
      image: "https://i.pravatar.cc/150?u=sarah",
    },
    {
      name: "James Wilson",
      university: "Kings College",
      text: "The advisory service is what sets them apart. They didn't just show me rooms; they helped me choose the right area for my commute.",
      image: "https://i.pravatar.cc/150?u=james",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <Quote size={400} className="absolute -top-20 -left-20 text-brand-orange rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-charcoal mb-4">
            Trusted by <span className="text-brand-orange">Students</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Join thousands of students who found their perfect home through our advisory-first approach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-brand-beige p-8 rounded-[32px] border border-gray-100 relative"
            >
              <div className="flex gap-1 text-yellow-500 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-brand-charcoal text-lg italic mb-8 leading-relaxed">
                "{review.text}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-brand-charcoal">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.university}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
