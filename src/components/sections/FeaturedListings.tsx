"use client";

import React from "react";
import { motion } from "framer-motion";
import { listings } from "@/data/listings";
import { Heart, MapPin, Star, Wifi, Shield, Zap } from "lucide-react";
import Link from "next/link";

const FeaturedListings = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold text-brand-charcoal mb-4">
              Featured <span className="text-brand-orange">Spaces</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl">
              Handpicked properties that offer the perfect blend of luxury, comfort, and proximity to campus.
            </p>
          </div>
          <Link
            href="/listings"
            className="text-brand-orange font-semibold flex items-center gap-2 hover:underline"
          >
            View all listings
            <Zap size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.slice(0, 3).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="card-premium group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-brand-orange font-bold shadow-md">
                  £{item.price}{item.period}
                </div>
                <button className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white hover:text-brand-orange transition-colors">
                  <Heart size={20} />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded">
                    {item.type}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-500 ml-auto">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-bold text-brand-charcoal">{item.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-brand-charcoal mb-2 group-hover:text-brand-orange transition-colors">
                  {item.title}
                </h3>

                <div className="flex items-center gap-1 text-gray-500 mb-4">
                  <MapPin size={16} />
                  <span className="text-sm">{item.location}</span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Wifi size={16} />
                    <span className="text-xs">WiFi</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Shield size={16} />
                    <span className="text-xs">Security</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Zap size={16} />
                    <span className="text-xs">Power</span>
                  </div>
                </div>

                <Link href={`/listings/${item.id}`} className="block">
                  <button className="w-full py-3 border border-gray-100 rounded-xl font-semibold text-brand-charcoal group-hover:bg-brand-orange group-hover:text-white group-hover:border-brand-orange transition-all duration-300">
                    View Details
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
