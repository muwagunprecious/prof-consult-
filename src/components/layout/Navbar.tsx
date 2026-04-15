"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, Home, Search, MessageSquare, User } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Listings", href: "/listings" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled
          ? "glass-nav py-3"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center text-white font-bold text-xl transition-transform group-hover:scale-110">
            P
          </div>
          <span className={cn(
            "text-2xl font-bold tracking-tight transition-colors",
            isScrolled ? "text-brand-charcoal" : "text-brand-charcoal"
          )}>
            Prof <span className="text-brand-orange">Consult</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-brand-charcoal hover:text-brand-orange font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link href="/listings" className="btn-orange">
            Find a Home
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-brand-charcoal"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl animate-fade-in flex flex-col p-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-brand-charcoal"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/listings"
            className="btn-orange text-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Find a Home
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
