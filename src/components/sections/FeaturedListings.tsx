"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Star, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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

const FeaturedListings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("/api/listings");
        if (res.ok) {
          const data = await res.json();
          // Slice up to 6 featured listings just like the screenshot strip
          setListings(data.slice(0, 6)); 
        }
      } catch (error) {
        console.error("Failed to load featured listings:", error);
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

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-charcoal tracking-tight font-stylish-sans">
              Featured listings in Lagos
            </h2>
            <p className="text-gray-400 text-sm mt-1 font-medium">
              Top-rated spaces verified for premium student and young professional living.
            </p>
          </div>
          <Link
            href="/listings"
            className="text-brand-orange font-bold text-sm flex items-center gap-1 hover:underline group shrink-0"
          >
            <span>Explore all listings</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Listings Horizontal Scroll / Loader */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400">
            <Loader2 className="animate-spin text-brand-orange mb-4" size={40} />
            <p className="font-bold text-sm">Fetching featured spaces...</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="py-16 text-center text-gray-400 border border-dashed border-gray-200 rounded-[24px]">
            <p className="font-bold text-sm">No featured listings found.</p>
          </div>
        ) : (
          /* Horizontal Scroll View container to mimic the Airbnb strip layout exactly */
          <div className="relative">
            <div 
              className="flex gap-5 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory px-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {listings.map((item, index) => {
                const isWishlisted = wishlist.includes(item.id);
                // Use first image or fallback
                const primaryImage = item.images && item.images.length > 0
                  ? item.images[0]
                  : "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800";

                // Format the title e.g. "Studio in Yaba"
                const displayTitle = `${item.type.charAt(0).toUpperCase() + item.type.slice(1)} in ${item.location.split(",")[0]}`;
                const formattedPrice = parseInt(item.price.replace(/,/g, "")).toLocaleString();

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    className="shrink-0 w-[240px] sm:w-[280px] snap-start group cursor-pointer flex flex-col"
                  >
                    {/* Image Container with Airbnb Style Floating Heart & Badge */}
                    <Link href={`/listings/${item.id}`} className="relative aspect-square w-full rounded-[22px] overflow-hidden mb-3 bg-gray-50 block shadow-sm border border-gray-100/50">
                      <img
                        src={primaryImage}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      />
                      
                      {/* Floating 'Guest favorite' Badge */}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-brand-charcoal text-[9px] sm:text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm select-none border border-black/5">
                        Guest favorite
                      </div>

                      {/* Floating Wishlist Heart */}
                      <button 
                        onClick={(e) => toggleWishlist(item.id, e)}
                        className="absolute top-3 right-3 p-1.5 bg-transparent hover:scale-110 active:scale-95 transition-transform outline-none cursor-pointer z-10"
                      >
                        <Heart 
                          size={20} 
                          className={cn(
                            "transition-all duration-300",
                            isWishlisted 
                              ? "fill-[#FF6B00] text-[#FF6B00] filter drop-shadow-md" 
                              : "text-white fill-black/20 stroke-white stroke-[2.5]"
                          )} 
                        />
                      </button>
                    </Link>

                    {/* Listing Details */}
                    <div className="flex flex-col text-left px-1">
                      {/* First line: Listing Type & Neighborhood */}
                      <h3 className="font-extrabold text-sm sm:text-base text-brand-charcoal truncate leading-tight group-hover:text-brand-orange transition-colors">
                        {displayTitle}
                      </h3>
                      
                      {/* Second line: Price & Rating */}
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 font-medium mt-1">
                        <span>₦{formattedPrice} / mo</span>
                        <span className="text-gray-300 select-none">•</span>
                        <div className="flex items-center gap-0.5 font-bold text-brand-charcoal">
                          <Star size={13} className="text-brand-orange fill-brand-orange shrink-0" />
                          <span>{item.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedListings;
