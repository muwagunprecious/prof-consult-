"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { 
  MapPin, Star, Wifi, Shield, Zap, Coffee, 
  ChevronLeft, Share2, Heart, MessageSquare, Phone, Loader2, AlertTriangle, CheckCircle2
} from "lucide-react";
import Link from "next/link";

interface Listing {
  id: number;
  title: string;
  location: string;
  price: string;
  period: string;
  images: string[];
  description: string;
  firstPayment: string;
  subsequentPayment: string;
  amenities: string[];
  rating: number;
  type: string;
}

const PropertyDetails = () => {
  const { id } = useParams();
  
  const [property, setProperty] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // Lead reservation states
  const [whatsapp, setWhatsapp] = useState("");
  const [isReserving, setIsReserving] = useState(false);
  const [reserveSuccess, setReserveSuccess] = useState(false);

  // Mobile image carousel tracking
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const res = await fetch(`/api/listings/${id}`);
        if (!res.ok) {
          if (res.status === 404) throw new Error("This premium space could not be found.");
          throw new Error("Failed to load space details from PostgreSQL.");
        }
        const data = await res.json();
        setProperty(data);
      } catch (error: any) {
        setErrorMessage(error.message || "An error occurred while loading details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchPropertyDetails();
  }, [id]);

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsapp || !property) return;
    setIsReserving(true);
    setErrorMessage("");
    setReserveSuccess(false);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId: property.id, listingTitle: property.title, whatsapp }),
      });
      if (!res.ok) throw new Error("Failed to submit your reservation query.");
      setReserveSuccess(true);
      setWhatsapp("");
    } catch (err: any) {
      setErrorMessage(err.message || "Could not submit query.");
    } finally {
      setIsReserving(false);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.clientWidth;
    if (width > 0) setActiveImageIdx(Math.round(scrollLeft / width));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-400">
        <Loader2 className="animate-spin text-brand-orange mb-4" size={44} />
        <p className="font-bold">Fetching space details...</p>
      </div>
    );
  }

  if ((errorMessage && !property) || !property) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-400 p-6">
        <AlertTriangle className="text-red-500 mb-4" size={48} />
        <h3 className="text-xl font-bold text-brand-charcoal mb-2">Failed to Load Listing</h3>
        <p className="text-sm text-gray-500 mb-8 max-w-sm text-center">{errorMessage || "Listing not found."}</p>
        <Link href="/listings" className="btn-orange">Back to Listings</Link>
      </div>
    );
  }

  // Build image arrays
  const uploadedImages = property.images && property.images.length > 0 ? property.images : [];
  const fallbacks = [
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800",
  ];
  const mobileImages = uploadedImages.length > 0 ? uploadedImages : [fallbacks[0]];
  const desktopImages = [...uploadedImages];
  while (desktopImages.length < 5) desktopImages.push(fallbacks[desktopImages.length - 1] || fallbacks[0]);

  const amenitiesMap = [
    { name: "Superfast WiFi", icon: <Wifi size={20} /> },
    { name: "24/7 Security", icon: <Shield size={20} /> },
    { name: "Smart Metering", icon: <Zap size={20} /> },
    { name: "Coffee brewer", icon: <Coffee size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ===== MOBILE LAYOUT ===== */}
      <div className="block md:hidden relative bg-[#F6F6F3]">
        {/* Mobile full-bleed image scroll gallery */}
        <div className="relative w-full h-[55vh] overflow-hidden bg-gray-100">
          {/* Scrollable image strip — enables native smooth touch swipe with snap points */}
          <div
            onScroll={handleScroll}
            className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-none"
            style={{ 
              scrollbarWidth: "none", 
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {mobileImages.map((photoUrl, idx) => (
              <div
                key={idx}
                className="w-full h-full shrink-0 snap-start snap-always relative"
              >
                <img src={photoUrl} className="w-full h-full object-cover" alt={`Photo ${idx + 1}`} />
              </div>
            ))}
          </div>

          {/* Slide counter badge styled exactly like the screenshot */}
          <div className="absolute bottom-10 right-4 z-20 bg-black/60 text-white font-bold text-xs px-2.5 py-1.2 rounded-[6px] tracking-wider pointer-events-none select-none">
            {activeImageIdx + 1} / {mobileImages.length}
          </div>
        </div>

        {/* Floating action buttons overlaid on top of the image gallery */}
        <div className="absolute top-6 left-0 right-0 flex items-center justify-between px-4 z-30">
          <Link href="/listings">
            <div className="w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
              <ChevronLeft size={20} className="text-brand-charcoal" />
            </div>
          </Link>
          <div className="flex gap-2">
            <button className="w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md outline-none cursor-pointer">
              <Share2 size={16} className="text-brand-charcoal" />
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md outline-none cursor-pointer"
            >
              <Heart size={16} className={isSaved ? "fill-brand-orange text-brand-orange" : "text-brand-charcoal"} />
            </button>
          </div>
        </div>

        {/* Overlapping white card with round border at the top and centered text */}
        <div className="relative z-10 bg-white rounded-t-[32px] -mt-6 pt-8 px-6 pb-6 shadow-sm border-t border-gray-100/50 flex flex-col items-center text-center">
          {/* Centered Title */}
          <h1 className="text-xl sm:text-2xl font-black text-brand-charcoal leading-snug mb-3 max-w-sm">
            {property.title}
          </h1>

          {/* Centered Property type subtitle */}
          <p className="text-xs text-gray-500 font-bold mb-1">
            Entire {property.type} in {property.location}
          </p>

          {/* Centered Specs row */}
          <p className="text-xs text-gray-400 font-semibold mb-5">
            2 guests · 1 bedroom · 1 bed · 1 bath
          </p>

          {/* Centered Rating row */}
          <div className="flex items-center gap-1 text-xs font-black text-brand-charcoal mb-6 border-b border-gray-100 pb-6 w-full justify-center">
            <Star size={14} className="text-brand-orange fill-brand-orange shrink-0" />
            <span>{property.rating}</span>
            <span className="text-gray-400 font-bold ml-1">· 48 reviews</span>
          </div>



          {/* Description */}
          <div className="border-b border-gray-100 pb-6 mb-6">
            <h3 className="text-base font-extrabold text-brand-charcoal mb-3">About this space</h3>
            <p className="text-sm text-gray-500 font-medium leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="border-b border-gray-100 pb-6 mb-6">
              <h3 className="text-base font-extrabold text-brand-charcoal mb-4">What this place offers</h3>
              <div className="grid grid-cols-2 gap-3">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-500 font-semibold text-sm">
                    <div className="text-brand-orange shrink-0"><CheckCircle2 size={16} /></div>
                    <span className="text-xs">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing */}
          <div className="border-b border-gray-100 pb-6 mb-6 space-y-3">
            <h3 className="text-base font-extrabold text-brand-charcoal mb-4">Pricing</h3>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div>
                <p className="text-xs font-black text-brand-charcoal">First Year Payment</p>
                <p className="text-[10px] text-gray-400 font-medium">Due at contract signing</p>
              </div>
              <span className="font-black text-brand-charcoal">₦{property.firstPayment || property.price}</span>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div>
                <p className="text-xs font-black text-brand-charcoal">Subsequent Year Payment</p>
                <p className="text-[10px] text-gray-400 font-medium">Due after first year cycle</p>
              </div>
              <span className="font-black text-brand-charcoal">₦{property.subsequentPayment || "N/A"}</span>
            </div>
          </div>

          {/* Reservation Form */}
          <div className="mb-4">
            <h3 className="text-base font-extrabold text-brand-charcoal mb-4">Reserve a Seat</h3>
            {reserveSuccess ? (
              <div className="p-5 bg-green-50 border border-green-100 rounded-2xl flex flex-col items-center text-center space-y-2">
                <CheckCircle2 className="text-green-500" size={28} />
                <p className="font-extrabold text-brand-charcoal text-sm">Seat Reserved!</p>
                <p className="text-xs text-gray-500 font-medium">Sarah will contact you on WhatsApp shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleReserve} className="space-y-3">
                {errorMessage && (
                  <div className="p-3 bg-red-50 text-red-500 border border-red-100 text-xs font-semibold rounded-xl flex items-center gap-2">
                    <AlertTriangle size={14} /><span>{errorMessage}</span>
                  </div>
                )}
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="WhatsApp number e.g. +234 812 345 6789"
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-semibold text-brand-charcoal focus:ring-2 focus:ring-brand-orange/10 focus:border-brand-orange outline-none"
                />
                <button
                  type="submit"
                  disabled={isReserving}
                  className="w-full py-4 bg-brand-orange text-white rounded-2xl font-black text-sm shadow-lg shadow-brand-orange/20 disabled:bg-gray-200 outline-none cursor-pointer"
                >
                  {isReserving ? "Reserving..." : "Reserve Seat"}
                </button>
              </form>
            )}
          </div>

          {/* Contact channels */}
          <div className="space-y-3">
            <button className="w-full py-3.5 border border-gray-200 text-brand-charcoal rounded-2xl font-bold text-sm flex items-center justify-center gap-2 outline-none cursor-pointer hover:bg-gray-50">
              <MessageSquare size={16} className="text-brand-orange" />
              Chat with Housing Advisor
            </button>
            <a
              href={`https://wa.me/2348123456789?text=Hello,%20I'm%20interested%20in%20${encodeURIComponent(property.title)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-full py-3.5 bg-[#25D366] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 outline-none cursor-pointer">
                <Phone size={16} />
                Connect on WhatsApp
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="hidden md:block pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header Action Bar */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/listings" className="flex items-center gap-2 text-gray-500 hover:text-brand-orange transition-colors font-semibold text-sm outline-none">
              <ChevronLeft size={16} />
              Back to listings
            </Link>
            <div className="flex gap-4">
              <button className="flex items-center gap-1.5 p-2 px-3 text-xs font-bold text-brand-charcoal hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border border-gray-100 shadow-sm outline-none">
                <Share2 size={14} />Share
              </button>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="flex items-center gap-1.5 p-2 px-3 text-xs font-bold text-brand-charcoal hover:bg-gray-50 rounded-lg transition-colors cursor-pointer border border-gray-100 shadow-sm outline-none"
              >
                <Heart size={14} className={isSaved ? "fill-brand-orange text-brand-orange" : "text-brand-charcoal"} />
                {isSaved ? "Saved" : "Save"}
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-brand-charcoal mb-3 leading-tight tracking-tight">
              {property.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 font-semibold">
              <span className="flex items-center gap-1 text-brand-charcoal">
                <Star size={16} className="text-brand-orange fill-brand-orange" />
                {property.rating}
              </span>
              <span>•</span>
              <span className="underline cursor-pointer hover:text-brand-charcoal">48 reviews</span>
              <span>•</span>
              <span className="flex items-center gap-1 underline cursor-pointer hover:text-brand-charcoal">
                <MapPin size={16} />{property.location}
              </span>
            </div>
          </div>

          {/* Desktop 5-image grid */}
          <div className="grid grid-cols-4 gap-2 h-[450px] rounded-2xl overflow-hidden mb-12 border border-gray-100 shadow-sm">
            <div className="col-span-2 h-full overflow-hidden">
              <img src={desktopImages[0]} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" alt="Main photo" />
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-2 h-full">
              {desktopImages.slice(1, 5).map((photoUrl, idx) => (
                <div key={idx} className="h-full overflow-hidden">
                  <img src={photoUrl} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" alt={`Photo ${idx + 2}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-8">
              <div className="border-b border-gray-100 pb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-brand-charcoal">
                  Hosted by Prof Consult
                </h2>
              </div>

              <div className="prose prose-sm text-gray-500 font-medium leading-relaxed border-b border-gray-100 pb-8 space-y-4">
                <h3 className="text-lg font-bold text-brand-charcoal">About this space</h3>
                <p className="whitespace-pre-line">{property.description}</p>
              </div>

              {property.amenities && property.amenities.length > 0 && (
                <div className="border-b border-gray-100 pb-8">
                  <h3 className="text-lg font-bold text-brand-charcoal mb-6">What this place offers</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-4 text-gray-500 font-semibold text-sm">
                        <div className="text-brand-orange shrink-0"><CheckCircle2 size={18} /></div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right sticky card */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white rounded-2xl p-6 border border-gray-200 shadow-xl space-y-6">
                <div className="flex items-baseline justify-between border-b border-gray-50 pb-4">
                  <div>
                    <span className="text-2xl font-black text-brand-charcoal">₦{property.firstPayment || property.price}</span>
                    <span className="text-xs text-gray-400 font-semibold ml-1">initial fee</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-brand-charcoal">
                    <Star size={14} className="text-brand-orange fill-brand-orange" />
                    <span>{property.rating}</span>
                  </div>
                </div>

                {reserveSuccess ? (
                  <div className="p-6 bg-green-50 border border-green-100 rounded-2xl flex flex-col items-center text-center space-y-3">
                    <CheckCircle2 className="text-green-500" size={32} />
                    <h4 className="font-extrabold text-brand-charcoal text-sm">Seat Reserved!</h4>
                    <p className="text-xs text-gray-500 font-medium">Sarah will contact you on WhatsApp shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleReserve} className="space-y-4">
                    {errorMessage && (
                      <div className="p-3 bg-red-50 text-red-500 border border-red-100 text-xs font-semibold rounded-xl flex items-center gap-2">
                        <AlertTriangle size={14} /><span>{errorMessage}</span>
                      </div>
                    )}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-brand-charcoal uppercase tracking-wider">WhatsApp Number</label>
                      <input
                        type="tel"
                        required
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="e.g. +234 812 345 6789"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-brand-charcoal focus:ring-2 focus:ring-brand-orange/10 focus:border-brand-orange outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isReserving}
                      className="w-full py-4 bg-brand-orange hover:bg-brand-orange-light text-white rounded-xl font-black text-sm transition-all shadow-md shadow-brand-orange/15 cursor-pointer outline-none disabled:bg-gray-300"
                    >
                      {isReserving ? "Reserving..." : "Reserve Seat"}
                    </button>
                    <p className="text-center text-[10px] text-gray-400 font-semibold">An advisor will message you directly</p>
                  </form>
                )}

                <div className="space-y-4 border-t border-gray-100 pt-6">
                  <div className="flex justify-between items-center bg-gray-50/50 p-3.5 rounded-xl border border-gray-100/50">
                    <div>
                      <p className="text-brand-charcoal font-black text-xs">First Year Payment</p>
                      <p className="text-[10px] text-gray-400">Due at contract signing</p>
                    </div>
                    <span className="text-brand-charcoal font-black text-sm">₦{property.firstPayment || property.price}</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50/50 p-3.5 rounded-xl border border-gray-100/50">
                    <div>
                      <p className="text-brand-charcoal font-black text-xs">Subsequent Year Payment</p>
                      <p className="text-[10px] text-gray-400">Due after first year cycle</p>
                    </div>
                    <span className="text-brand-charcoal font-black text-sm">₦{property.subsequentPayment || "N/A"}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-3">
                  <button className="w-full py-3 border border-gray-200 hover:bg-gray-50 text-brand-charcoal rounded-xl font-bold text-xs flex items-center justify-center gap-2 outline-none cursor-pointer">
                    <MessageSquare size={14} className="text-brand-orange" />
                    Chat with Housing Advisor
                  </button>
                  <a
                    href={`https://wa.me/2348123456789?text=Hello,%20I'm%20interested%20in%20${encodeURIComponent(property.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <button className="w-full py-3 bg-[#25D366] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 outline-none cursor-pointer">
                      <Phone size={14} />
                      Connect on WhatsApp
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
