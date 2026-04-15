"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, PlusCircle, List, Settings, 
  Users, Home, MessageSquare, LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const sidebarLinks = [
    { name: "Dashboard", icon: <BarChart3 size={20} />, href: "/admin" },
    { name: "Add Property", icon: <PlusCircle size={20} />, href: "/admin/upload" },
    { name: "My Listings", icon: <List size={20} />, href: "/admin/listings" },
    { name: "Viewers", icon: <Users size={20} />, href: "/admin/viewers" },
    { name: "Settings", icon: <Settings size={20} />, href: "/admin/settings" },
  ];

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
           <div className="bg-brand-orange/5 p-6 rounded-[32px] border border-brand-orange/10">
              <p className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-2">Pro Support</p>
              <p className="text-sm text-brand-charcoal font-medium mb-4">Dedicated admin support available 24/7.</p>
              <button className="w-full py-2 bg-brand-orange text-white rounded-xl text-xs font-bold">
                Contact Support
              </button>
           </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
