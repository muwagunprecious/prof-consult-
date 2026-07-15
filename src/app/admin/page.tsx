"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, Home, MessageSquare, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Eye, MousePointer2, Loader2, Phone
} from "lucide-react";
import { motion } from "framer-motion";

interface BookingLead {
  id: string;
  listingId: number;
  listingTitle: string;
  whatsapp: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const [leads, setLeads] = useState<BookingLead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("/api/leads");
        if (res.ok) {
          const data = await res.json();
          setLeads(data);
        }
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const stats = [
    { name: "Total Listings", value: "24", change: "+2", increase: true, icon: <Home size={24} /> },
    { name: "Live Viewers", value: "156", change: "+12%", increase: true, icon: <Eye size={24} /> },
    { name: "Total Queries", value: isLoading ? "..." : leads.length.toString(), change: leads.length > 0 ? `+${leads.length}` : "0", increase: leads.length > 0, icon: <MessageSquare size={24} /> },
    { name: "CTR", value: "4.2%", change: "+0.8%", increase: true, icon: <MousePointer2 size={24} /> },
  ];

  const getRelativeTime = (dateStr: string) => {
    try {
      const created = new Date(dateStr);
      const diffMs = Date.now() - created.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 1) return "just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      return created.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    } catch {
      return "some time ago";
    }
  };

  return (
    <div className="p-8 md:p-12 lg:p-16 pt-32">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-brand-charcoal mb-4">
            Dashboard <span className="text-brand-orange">Overview</span>
          </h1>
          <p className="text-gray-500 text-lg">Welcome back. Here's a premium summary of your platform's performance.</p>
        </header>



        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Chart Placeholder */}
          <div className="lg:col-span-2 bg-white p-10 rounded-[40px] shadow-premium border border-gray-100 h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-extrabold text-brand-charcoal">Viewer Engagement</h3>
              <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-gray-500 outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="flex-1 flex items-end gap-2 px-4">
              {[40, 70, 45, 90, 65, 80, 50].map((height, i) => (
                <div key={i} className="flex-1 bg-brand-orange/10 rounded-t-xl relative group">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                    className="absolute bottom-0 left-0 right-0 bg-brand-orange rounded-t-xl transition-all group-hover:bg-brand-orange-light"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          {/* Recent Inquiries List - Dynamic Leads */}
          <div className="bg-white p-10 rounded-[40px] shadow-premium border border-gray-100 flex flex-col">
             <h3 className="text-xl font-extrabold text-brand-charcoal mb-8">Recent Queries</h3>
             <div className="space-y-6 flex-1 overflow-y-auto max-h-[250px] pr-2">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center text-gray-400 py-8">
                    <Loader2 className="animate-spin text-brand-orange mr-2" size={18} />
                    <span className="text-xs font-semibold">Loading queries...</span>
                  </div>
                ) : leads.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-center py-8 text-gray-400">
                    <p className="text-xs font-bold">No WhatsApp reservations received yet.</p>
                  </div>
                ) : (
                  leads.slice(0, 4).map((lead, i) => {
                    const cleanPhone = lead.whatsapp.replace(/[^0-9]/g, "");
                    const whatsappLink = `https://wa.me/${cleanPhone}`;
                    
                    return (
                      <div key={lead.id} className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-brand-orange/5 text-brand-orange rounded-xl flex items-center justify-center font-black text-xs shrink-0">
                          Q
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="text-xs font-bold text-brand-charcoal truncate">
                            Inquiry on {lead.listingTitle}
                          </p>
                          <a 
                            href={whatsappLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-xs text-green-600 hover:text-green-500 font-black inline-flex items-center gap-1"
                          >
                            <Phone size={12} />
                            {lead.whatsapp}
                          </a>
                          <p className="text-[10px] text-gray-400 font-semibold">{getRelativeTime(lead.createdAt)}</p>
                        </div>
                      </div>
                    );
                  })
                )}
             </div>
             <Link href="/admin/viewers" className="w-full">
               <button className="w-full py-4 mt-8 bg-brand-beige text-brand-charcoal rounded-2xl font-bold hover:bg-brand-orange hover:text-white transition-all text-xs cursor-pointer outline-none">
                  View All Queries
               </button>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(" ");

export default AdminDashboard;
