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
          setListings(data.slice(0, 3)); // Display first 3 featured items
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
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-brand-charcoal tracking-tight">
              Featured listings in Lagos
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Top-rated spaces verified for premium student and young professional living.
            </p>
          </div>
          <Link
            href="/listings"
            className="text-brand-orange font-bold text-sm flex items-center gap-1 hover:underline group"
          >
            Explore all listings
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Listings Grid / Loader */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400">
            <Loader2 className="animate-spin text-brand-orange mb-4" size={40} />
            <p className="font-bold text-sm">Fetching featured spaces...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((item, index) => {
              const isWishlisted = wishlist.includes(item.id);
              // Use first image or fallback
              const primaryImage = item.images && item.images.length > 0
                ? item.images[0]
                : "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800";

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl overflow-hidden"
                >
                  {/* Image Container with Airbnb Style Floating Heart */}
                  <Link href={`/listings/${item.id}`} className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-3 bg-gray-100 block">
                    <img
                      src={primaryImage}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button 
                      onClick={(e) => toggleWishlist(item.id, e)}
                      className="absolute top-4 right-4 p-2 bg-transparent hover:scale-110 transition-transform outline-none cursor-pointer"
                    >
                      <Heart 
                        size={24} 
                        className={cn(
                          "transition-colors",
                          isWishlisted 
                            ? "fill-brand-orange text-brand-orange" 
                            : "text-white fill-black/25 stroke-[2]"
                        )} 
                      />
                    </button>
                  </Link>

                  {/* Listing Details */}
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
                    <p className="text-xs text-gray-400 font-medium mb-2">2 km from Unilag Campus</p>
                    
                    <div className="mt-auto flex items-center justify-between">
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
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedListings;
