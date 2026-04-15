"use client";

import React from "react";
import { 
  Users, Home, MessageSquare, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Eye, MousePointer2 
} from "lucide-react";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const stats = [
    { name: "Total Listings", value: "24", change: "+2", increase: true, icon: <Home size={24} /> },
    { name: "Live Viewers", value: "156", change: "+12%", increase: true, icon: <Eye size={24} /> },
    { name: "Total Queries", value: "89", change: "-3", increase: false, icon: <MessageSquare size={24} /> },
    { name: "CTR", value: "4.2%", change: "+0.8%", increase: true, icon: <MousePointer2 size={24} /> },
  ];

  return (
    <div className="p-8 md:p-12 lg:p-16 pt-32">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-brand-charcoal mb-4">
            Dashboard <span className="text-brand-orange">Overview</span>
          </h1>
          <p className="text-gray-500 text-lg">Welcome back. Here's a premium summary of your platform's performance.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[32px] shadow-premium border border-gray-100 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-brand-orange/5 text-brand-orange rounded-2xl flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-sm font-bold px-3 py-1 rounded-full",
                  stat.increase ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
                )}>
                  {stat.change}
                  {stat.increase ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                </div>
              </div>
              <div>
                <p className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-1">{stat.name}</p>
                <h3 className="text-3xl font-extrabold text-brand-charcoal">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

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

          {/* Recent Inquiries List */}
          <div className="bg-white p-10 rounded-[40px] shadow-premium border border-gray-100 flex flex-col">
             <h3 className="text-xl font-extrabold text-brand-charcoal mb-8">Recent Queries</h3>
             <div className="space-y-6 flex-1">
                {[
                  { name: "Alex T.", target: "Marble Arch", time: "2m ago" },
                  { name: "Sarah C.", target: "Bloomsbury", time: "15m ago" },
                  { name: "James W.", target: "Kensington", time: "1h ago" },
                  { name: "Elena R.", target: "Marylebone", time: "3h ago" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-brand-charcoal text-xs">
                      {item.name[0]}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-bold text-brand-charcoal truncate">{item.name} inquired about {item.target}</p>
                      <p className="text-xs text-brand-orange font-medium">{item.time}</p>
                    </div>
                  </div>
                ))}
             </div>
             <button className="w-full py-4 mt-8 bg-brand-beige text-brand-charcoal rounded-2xl font-bold hover:bg-brand-orange hover:text-white transition-all">
                View All Messages
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(" ");

export default AdminDashboard;
