"use client";

import React from "react";
import { useParams } from "next/navigation";
import { listings } from "@/data/listings";
import { 
  MapPin, Star, Wifi, Shield, Zap, Coffee, 
  ChevronLeft, Share2, Heart, MessageSquare, Phone
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const PropertyDetails = () => {
  const { id } = useParams();
  const property = listings.find(item => item.id === Number(id)) || listings[0];

  const amenities = [
    { name: "Superfast WiFi", icon: <Wifi size={24} /> },
    { name: "24/7 Security", icon: <Shield size={24} /> },
    { name: "Smart Meter", icon: <Zap size={24} /> },
    { name: "Coffee Machine", icon: <Coffee size={24} /> },
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/listings" className="flex items-center gap-2 text-gray-500 hover:text-brand-orange transition-colors font-medium">
            <ChevronLeft size={20} />
            Back to listings
          </Link>
          <div className="flex gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
              <Share2 size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
              <Heart size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[500px]">
              <div className="h-full rounded-[32px] overflow-hidden">
                <img src={property.image} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" alt="Main" />
              </div>
              <div className="grid grid-rows-2 gap-4 h-full">
                <div className="rounded-[32px] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Interior 1" />
                </div>
                <div className="rounded-[32px] overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Interior 2" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button className="bg-white text-brand-charcoal px-6 py-2 rounded-full font-bold shadow-lg">
                      See all 12 photos
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Title & Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-brand-orange/10 text-brand-orange px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                  Verified Property
                </span>
                <div className="flex items-center gap-1 text-yellow-500 ml-4 font-bold">
                  <Star size={18} fill="currentColor" />
                  {property.rating} (48 reviews)
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-brand-charcoal mb-4 leading-tight">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-gray-500 text-lg">
                <MapPin size={20} className="text-brand-orange" />
                {property.location}
                <span className="mx-2">•</span>
                <span className="text-brand-orange font-bold">Next to Campuses</span>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none text-gray-600">
              <h3 className="text-2xl font-bold text-brand-charcoal mb-4">About this space</h3>
              <p>
                Experience premium student living in this beautifully designed {property.type}. Located just minutes away from the main campus, this property offers the perfect blend of academic accessibility and urban convenience.
              </p>
              <p>
                Fully furnished with high-end designer pieces, the space features a dedicated study zone, a luxurious en-suite bathroom, and access to world-class communal facilities including a 24/7 gym and social lounge.
              </p>
            </div>

            {/* Amenities Grid */}
            <div>
              <h3 className="text-2xl font-bold text-brand-charcoal mb-6">World-class amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {amenities.map((item, index) => (
                  <div key={index} className="flex flex-col items-center justify-center p-6 bg-brand-beige rounded-[32px] border border-gray-100 transition-all hover:shadow-premium group">
                    <div className="text-brand-orange mb-3 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-sm font-bold text-brand-charcoal">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Contact Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-50 overflow-hidden">
              <div className="bg-brand-charcoal p-8 text-white relative">
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h4 className="text-3xl font-bold mb-1">£{property.price}</h4>
                    <p className="text-gray-400">per week (pw)</p>
                  </div>
                  <div className="w-16 h-16 bg-brand-orange rounded-2xl flex items-center justify-center">
                    <PoundSterling size={32} />
                  </div>
                </div>
                <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-brand-orange/20 rounded-full blur-2xl" />
              </div>

              <div className="p-8 space-y-6">
                <div className="flex items-center gap-4 py-4 border-b border-gray-50">
                  <div className="relative">
                    <img src="https://i.pravatar.cc/150?u=advis" className="w-14 h-14 rounded-2xl object-cover" alt="Advisor" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                  </div>
                  <div>
                    <p className="text-xs text-brand-orange font-bold uppercase tracking-wider">Housing Advisor</p>
                    <h5 className="font-bold text-brand-charcoal">Sarah Jenkins</h5>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link href="/messages" className="block w-full py-4 bg-brand-orange text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-brand-orange/20 transition-all hover:bg-brand-orange-light active:scale-95">
                    <MessageSquare size={22} />
                    Message Admin
                  </Link>
                  <button className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-opacity hover:opacity-90 active:scale-95">
                    <Phone size={22} />
                    Chat on WhatsApp
                  </button>
                </div>

                <div className="pt-4 text-center">
                  <p className="text-sm text-gray-500">Typical response time: <span className="text-brand-charcoal font-bold">Under 30 mins</span></p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const PoundSterling = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 7c0-5.333-8-5.333-8 0"/><path d="M10 7v14"/><path d="M6 21h12"/><path d="M6 13h10"/></svg>
);

export default PropertyDetails;
