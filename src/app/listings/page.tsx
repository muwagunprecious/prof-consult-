"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { listings } from "@/data/listings";
import { Filter, Search, MapPin, Star, Heart, SlidersHorizontal, ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ListingsPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [priceRange, setPriceRange] = useState(500);

  const filterOptions = ["All", "Studio", "En-suite", "1 Bedroom", "Shared House"];

  const filteredListings = listings.filter(item => 
    (activeFilter === "All" || item.type === activeFilter) && item.price <= priceRange
  );

  return (
    <div className="min-h-screen bg-brand-beige pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-80 space-y-8 sticky top-32 h-fit">
          <div className="bg-white p-8 rounded-[32px] shadow-premium border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-brand-charcoal flex items-center gap-2">
                <Filter size={20} className="text-brand-orange" />
                Filters
              </h3>
              <button 
                onClick={() => {setActiveFilter("All"); setPriceRange(500);}}
                className="text-sm text-gray-400 hover:text-brand-orange transition-colors"
              >
                Reset
              </button>
            </div>

            {/* Location Search */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-brand-charcoal mb-3 uppercase tracking-wider">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input 
                  type="text" 
                  placeholder="Where to?"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-brand-charcoal focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Price Slider */}
            <div className="mb-8">
              <div className="flex justify-between mb-3 text-sm font-bold text-brand-charcoal uppercase tracking-wider">
                <label>Price Range</label>
                <span className="text-brand-orange">£{priceRange} pw</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="1000" 
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-orange"
              />
            </div>

            {/* Property Type */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-brand-charcoal mb-3 uppercase tracking-wider">Property Type</label>
              <div className="space-y-2">
                {filterOptions.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveFilter(type)}
                    className={cn(
                      "w-full text-left px-4 py-2.5 rounded-xl transition-all font-medium",
                      activeFilter === type 
                        ? "bg-brand-orange/10 text-brand-orange shadow-sm" 
                        : "text-gray-500 hover:bg-gray-50"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-bold text-brand-charcoal mb-3 uppercase tracking-wider">Amenities</label>
              <div className="space-y-2">
                {["WiFi Included", "24/7 Security", "Gym Access", "Laundry"].map((amenity) => (
                  <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-brand-orange focus:ring-brand-orange" />
                    <span className="text-gray-500 group-hover:text-brand-charcoal transition-colors">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Banner */}
          <div className="bg-brand-charcoal p-8 rounded-[32px] text-white relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-xl font-bold mb-2">Need advice?</h4>
              <p className="text-gray-400 text-sm mb-6">Talk to our experts for the best recommendations.</p>
              <button className="w-full py-3 bg-white text-brand-charcoal rounded-xl font-bold hover:bg-brand-orange hover:text-white transition-all">
                Book a Call
              </button>
            </div>
            <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-brand-orange/20 rounded-full blur-2xl" />
          </div>
        </aside>

        {/* Listings Grid */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-brand-charcoal">
              {filteredListings.length} Properties <span className="text-gray-400 font-normal">Found</span>
            </h2>
            <button className="flex items-center gap-2 text-brand-charcoal font-semibold bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
              Sort by: Recommended
              <ChevronDown size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredListings.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="card-premium group h-fit"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-full text-brand-orange font-bold text-sm shadow-sm">
                      £{item.price}{item.period}
                    </div>
                    <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white hover:text-brand-orange transition-colors">
                      <Heart size={18} />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange bg-brand-orange/5 px-2 py-0.5 rounded">
                        {item.type}
                      </span>
                      <div className="flex items-center gap-1 text-yellow-500 ml-auto">
                        <Star size={12} fill="currentColor" />
                        <span className="text-xs font-bold text-brand-charcoal">{item.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-brand-charcoal mb-1 group-hover:text-brand-orange transition-colors leading-tight">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center gap-1 text-gray-400 mb-6">
                      <MapPin size={14} />
                      <span className="text-xs">{item.location}</span>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                      <div className="flex gap-3">
                        {["WiFi", "Security", "Laundry"].slice(0, 2).map(amenity => (
                          <span key={amenity} className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      <Link href={`/listings/${item.id}`} className="text-brand-orange font-bold text-sm hover:underline">
                        Details →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredListings.length === 0 && (
            <div className="py-20 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <Search size={32} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-brand-charcoal">No results found</h3>
              <p className="text-gray-500">Try adjusting your filters or search area.</p>
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default ListingsPage;
