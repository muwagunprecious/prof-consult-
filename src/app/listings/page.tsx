"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, SlidersHorizontal, Map, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Categories from "@/components/sections/Categories";

interface Listing {
  id: number;
  title: string;
  location: string;
  price: string;
  period: string;
  images: string[];
  amenities: string[];
  rating: number;
  type: string;
}

const ListingsPage = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState(500000);
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("/api/listings");
        if (res.ok) {
          const data = await res.json();
          setListings(data);
        }
      } catch (error) {
        console.error("Failed to load listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  const toggleWishlist = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Filter listings based on active category and price
  const filteredListings = listings.filter(item => {
    const matchesCategory = activeCategory === "All" || item.type === activeCategory;
    const numericPrice = parseInt(item.price.replace(/,/g, ""), 10);
    return matchesCategory && numericPrice <= priceRange;
  });

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Sticky Categories Selector Pill Bar */}
      <div className="pt-24">
        <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        
        {/* Toolbar: Results Count and Filters Toggle */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-4">
          <h2 className="text-sm font-bold text-brand-charcoal uppercase tracking-wider">
            {isLoading ? "Searching spaces..." : `${filteredListings.length} Spaces found in Lagos`}
          </h2>
          <button 
            onClick={() => setShowFiltersModal(true)}
            className="flex items-center gap-2 text-xs font-extrabold text-brand-charcoal border border-gray-200 px-4 py-2.5 rounded-xl hover:bg-gray-50 hover:shadow-sm transition-all cursor-pointer outline-none"
          >
            <SlidersHorizontal size={14} className="text-brand-orange" />
            Filters
          </button>
        </div>

        {/* Listings Grid / Loader */}
        <main>
          {isLoading ? (
            <div className="py-20 flex flex-col items-center justify-center text-gray-400">
              <Loader2 className="animate-spin text-brand-orange mb-4" size={40} />
              <p className="font-bold text-sm">Loading spaces from PostgreSQL...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              <AnimatePresence mode="popLayout">
                {filteredListings.map((item) => {
                  const isWishlisted = wishlist.includes(item.id);
                  const primaryImage = item.images && item.images.length > 0 
                    ? item.images[0] 
                    : "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800";

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="group cursor-pointer flex flex-col h-full bg-white"
                    >
                      {/* Image Container with Wishlist Overlay */}
                      <Link href={`/listings/${item.id}`} className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-3 bg-gray-100 block">
                        <img 
                          src={primaryImage} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                        <button 
                          onClick={(e) => toggleWishlist(item.id, e)}
                          className="absolute top-3 right-3 p-2 bg-transparent hover:scale-110 transition-transform outline-none cursor-pointer"
                        >
                          <Heart 
                            size={22} 
                            className={cn(
                              "transition-colors",
                              isWishlisted 
                                ? "fill-brand-orange text-brand-orange" 
                                : "text-white fill-black/25 stroke-[2]"
                            )} 
                          />
                        </button>
                      </Link>

                      {/* Listing Metadata */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-bold text-sm text-brand-charcoal truncate flex-1 group-hover:text-brand-orange transition-colors">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-1 shrink-0 text-xs font-semibold text-brand-charcoal">
                            <Star size={14} className="text-brand-orange fill-brand-orange" />
                            <span>{item.rating}</span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-400 font-medium mb-0.5">{item.location}</p>
                        <p className="text-xs text-gray-400 font-medium mb-2">Individual student unit</p>
                        
                        <div className="mt-auto flex items-center justify-between pt-1">
                          <p className="text-sm text-brand-charcoal font-semibold">
                            ₦{parseInt(item.price.replace(/,/g, "")).toLocaleString()} <span className="font-medium text-gray-400">/ month</span>
                          </p>
                          <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange bg-brand-orange/5 px-2 py-0.5 rounded">
                            {item.type}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}

          {!isLoading && filteredListings.length === 0 && (
            <div className="py-20 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-4">
                <SlidersHorizontal size={32} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-brand-charcoal mb-1">No spaces found</h3>
              <p className="text-gray-500 text-sm">Try increasing your budget range or switching categories.</p>
            </div>
          )}
        </main>
      </div>

      {/* Floating Map Toggle */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <button className="bg-brand-charcoal text-white hover:scale-105 active:scale-95 px-6 py-3.5 rounded-full font-bold text-xs flex items-center gap-2 shadow-lg shadow-black/25 transition-all outline-none cursor-pointer">
          Show map
          <Map size={16} />
        </button>
      </div>

      {/* Airbnb Filter Modal Backdrop & Container */}
      <AnimatePresence>
        {showFiltersModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFiltersModal(false)}
              className="absolute inset-0 bg-brand-charcoal/45 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl p-10 border border-gray-100 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-4">
                <h3 className="text-xl font-black text-brand-charcoal">Filters</h3>
                <button 
                  onClick={() => setShowFiltersModal(false)}
                  className="p-2 rounded-xl text-gray-400 hover:text-brand-orange hover:bg-brand-orange/5 transition-all cursor-pointer outline-none"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Price slider */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-bold text-brand-charcoal uppercase tracking-wider">Maximum Price</label>
                    <span className="text-brand-orange font-extrabold">₦{priceRange.toLocaleString()} / mo</span>
                  </div>
                  <input 
                    type="range" 
                    min="40000" 
                    max="500000" 
                    step="5000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-orange outline-none"
                  />
                  <div className="flex justify-between text-xs text-gray-400 font-bold mt-2">
                    <span>₦40,000 / mo</span>
                    <span>₦500,000 / mo</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50">
                  <label className="block text-sm font-bold text-brand-charcoal mb-4 uppercase tracking-wider">Amenities Selection</label>
                  <div className="grid grid-cols-2 gap-4">
                    {["WiFi Included", "24/7 Security", "Solar Power", "Shared Kitchen"].map((amenity) => (
                      <label key={amenity} className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-brand-orange/5 rounded-2xl cursor-pointer transition-colors group">
                        <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-brand-orange focus:ring-brand-orange cursor-pointer" />
                        <span className="text-xs font-bold text-gray-500 group-hover:text-brand-charcoal transition-colors">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setShowFiltersModal(false)}
                  className="w-full py-4 mt-8 bg-brand-orange text-white rounded-2xl font-black shadow-xl shadow-brand-orange/20 hover:bg-brand-orange-light active:scale-95 transition-all text-sm cursor-pointer outline-none"
                >
                  Show {filteredListings.length} spaces
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ListingsPage;
