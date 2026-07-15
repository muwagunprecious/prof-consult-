"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, PlusCircle, List, Settings, 
  Users, Home, Building, Lock, ArrowRight, ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const isAuth = sessionStorage.getItem("admin_auth") === "true";
    if (isAuth) {
      setIsAuthenticated(true);
    }
    setCheckingAuth(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "prof2026") {
      sessionStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect master password");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    setPassword("");
  };

  const sidebarLinks = [
    { name: "Dashboard", icon: <BarChart3 size={20} />, href: "/admin" },
    { name: "Add Property", icon: <PlusCircle size={20} />, href: "/admin/upload" },
    { name: "My Listings", icon: <List size={20} />, href: "/admin/listings" },
    { name: "Properties", icon: <Building size={20} />, href: "/admin/properties" },
    { name: "Viewers", icon: <Users size={20} />, href: "/admin/viewers" },
    { name: "Settings", icon: <Settings size={20} />, href: "/admin/settings" },
  ];

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#F6F6F3] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-3">
          <Lock className="text-brand-orange animate-bounce" size={24} />
          <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">Checking Authorization...</span>
        </div>
      </div>
    );
  }

  // Beautiful Lock Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F6F6F3] p-4 flex items-center justify-center relative overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-1/4 left-1/4 w-[250px] h-[250px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#EBE7DF]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-[32px] shadow-2xl border border-white/50 relative z-10 flex flex-col items-center text-center">
          
          {/* Logo / Header */}
          <div className="w-12 h-12 bg-brand-orange/5 text-brand-orange rounded-2xl flex items-center justify-center mb-6">
            <Lock size={22} />
          </div>
          
          <h2 className="text-2xl font-black text-brand-charcoal mb-2 font-stylish-sans">
            Admin Access Required
          </h2>
          <p className="text-xs font-medium text-gray-400 mb-8 leading-relaxed max-w-[280px]">
            Please enter the platform's master password to access the administrator panel.
          </p>

          {/* Form */}
          <form onSubmit={handleLogin} className="w-full space-y-4">
            <div className="relative">
              <input
                type="password"
                placeholder="Enter master password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F6F6F3] border border-gray-100 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange rounded-2xl py-3 px-5 text-sm font-semibold outline-none text-brand-charcoal placeholder:text-gray-400/80 transition-all"
                autoFocus
              />
            </div>

            {error && (
              <div className="flex items-center gap-1.5 justify-center text-red-500 text-xs font-bold bg-red-50 py-2 px-4 rounded-xl">
                <ShieldAlert size={14} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-brand-orange hover:bg-brand-orange-light active:scale-98 text-white py-3.5 rounded-2xl font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/20 transition-all cursor-pointer"
            >
              <span>Unlock Admin Panel</span>
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Back button */}
          <Link href="/" className="mt-8 text-xs font-bold text-gray-400 hover:text-brand-charcoal transition-colors">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // Sidebar Layout for authenticated users
  return (
    <div className="min-h-screen bg-brand-beige flex">
      {/* Admin Sidebar */}
      <aside className="hidden lg:flex w-72 bg-white flex-col border-r border-gray-100 p-8 pt-28 sticky top-0 h-screen">
        <div className="space-y-4 flex-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all",
                  isActive 
                    ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/20" 
                    : "text-gray-400 hover:text-brand-orange hover:bg-brand-orange/5"
                )}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </div>
        
        <div className="pt-8 space-y-4">
           <Link href="/" className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-gray-400 hover:text-brand-charcoal transition-all">
             <Home size={20} />
             Back to Site
           </Link>
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all text-left cursor-pointer outline-none"
           >
             <Lock size={20} />
             Lock Panel
           </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
