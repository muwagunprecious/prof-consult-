"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, Globe, Search, User, Home } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 border-b border-gray-100",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
          : "bg-white py-4"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link href="/" className="flex items-center space-x-2 group shrink-0">
          <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center text-white font-bold text-xl transition-transform group-hover:scale-110">
            P
          </div>
          <span className="text-xl font-black tracking-tight text-brand-orange hidden sm:inline-block">
            prof<span className="text-brand-charcoal font-semibold">consult</span>
          </span>
        </Link>

        {/* Center: Airbnb Style Search Pill */}
        <div className="hidden md:flex items-center justify-between bg-white border border-gray-200 rounded-full py-2 pl-6 pr-2 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer max-w-lg w-full mx-8">
          <span className="text-xs font-bold text-brand-charcoal">Anywhere</span>
          <span className="h-4 w-px bg-gray-200" />
          <span className="text-xs font-bold text-brand-charcoal">Any week</span>
          <span className="h-4 w-px bg-gray-200" />
          <span className="text-xs font-medium text-gray-500">Add guests</span>
          <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-white">
            <Search size={14} strokeWidth={3} />
          </div>
        </div>

        {/* Right: User Menu */}
        <div className="flex items-center gap-4 shrink-0">
          <Link 
            href="/admin" 
            className="hidden lg:inline-block text-xs font-bold text-brand-charcoal hover:bg-gray-50 px-4 py-2.5 rounded-full transition-colors"
          >
            Admin Panel
          </Link>
          
          <button className="hidden sm:flex items-center justify-center w-10 h-10 text-brand-charcoal hover:bg-gray-50 rounded-full transition-colors">
            <Globe size={18} />
          </button>

          {/* Profile Menu Dropdown Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center gap-3 border border-gray-200 hover:shadow-md bg-white px-3 py-2 rounded-full transition-all cursor-pointer"
          >
            <Menu size={16} className="text-brand-charcoal" />
            <div className="w-8 h-8 bg-brand-charcoal text-white rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile / Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[90%] right-6 bg-white shadow-2xl rounded-2xl border border-gray-100 py-3 w-60 flex flex-col z-50 animate-fade-in">
          <Link 
            href="/" 
            className="px-6 py-3 text-sm font-semibold text-brand-charcoal hover:bg-gray-50 text-left transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/listings" 
            className="px-6 py-3 text-sm font-semibold text-brand-charcoal hover:bg-gray-50 text-left transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Listings
          </Link>
          <Link 
            href="/admin" 
            className="px-6 py-3 text-sm font-semibold text-brand-charcoal hover:bg-gray-50 text-left transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Admin Dashboard
          </Link>
          <div className="h-px bg-gray-100 my-2" />
          <Link 
            href="/#how-it-works" 
            className="px-6 py-3 text-sm text-gray-500 hover:bg-gray-50 text-left transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            How It Works
          </Link>
          <Link 
            href="/#contact" 
            className="px-6 py-3 text-sm text-gray-500 hover:bg-gray-50 text-left transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
