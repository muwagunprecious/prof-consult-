"use client";

import React from "react";
import { 
  Users, Eye, MousePointer2, Clock, 
  MapPin, Globe, Tablet, Monitor, Smartphone 
} from "lucide-react";
import { motion } from "framer-motion";

const ViewersPage = () => {
  const visitorStats = [
    { label: "New Viewers", value: "1,284", delta: "+15%", icon: <Users size={20} /> },
    { label: "Page Views", value: "8,432", delta: "+24%", icon: <Eye size={20} /> },
    { label: "Avg. Session", value: "4m 12s", delta: "+5s", icon: <Clock size={20} /> },
  ];

  return (
    <div className="p-8 md:p-12 lg:p-16 pt-32">
       <div className="max-w-7xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-extrabold text-brand-charcoal mb-4">
              Audience <span className="text-brand-orange">Analysis</span>
            </h1>
            <p className="text-gray-500 text-lg">Understand who is looking for their next premium home.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {visitorStats.map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] shadow-premium border border-gray-100">
                <div className="w-10 h-10 bg-brand-orange/5 text-brand-orange rounded-xl flex items-center justify-center mb-6">
                  {stat.icon}
                </div>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-extrabold text-brand-charcoal">{stat.value}</h3>
                  <span className="text-xs font-bold text-green-500 mb-1">{stat.delta}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Devices Chart */}
            <div className="bg-white p-10 rounded-[40px] shadow-premium border border-gray-100">
               <h3 className="text-xl font-extrabold text-brand-charcoal mb-8">Device Distribution</h3>
               <div className="space-y-8">
                  {[
                    { label: "Mobile", value: "65%", icon: <Smartphone size={18} />, color: "bg-brand-orange" },
                    { label: "Desktop", value: "28%", icon: <Monitor size={18} />, color: "bg-brand-charcoal" },
                    { label: "Tablet", value: "7%", icon: <Tablet size={18} />, color: "bg-gray-300" },
                  ].map(device => (
                    <div key={device.label} className="space-y-2">
                       <div className="flex justify-between items-center text-sm font-bold text-brand-charcoal">
                          <div className="flex items-center gap-2">
                            {device.icon}
                            {device.label}
                          </div>
                          <span>{device.value}</span>
                       </div>
                       <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: device.value }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={cn("h-full rounded-full", device.color)}
                          />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Top Countries */}
            <div className="bg-white p-10 rounded-[40px] shadow-premium border border-gray-100">
               <h3 className="text-xl font-extrabold text-brand-charcoal mb-8">Top Regions</h3>
               <div className="space-y-6">
                  {[
                    { country: "United Kingdom", visitors: "4,2k", growth: "+12%" },
                    { country: "United States", visitors: "1,1k", growth: "+4%" },
                    { country: "China", visitors: "892", growth: "+32%" },
                    { country: "India", visitors: "756", growth: "+18%" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                       <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                             {i + 1}
                          </div>
                          <span className="font-bold text-brand-charcoal">{item.country}</span>
                       </div>
                       <div className="text-right">
                          <p className="text-sm font-bold text-brand-charcoal">{item.visitors}</p>
                          <p className="text-[10px] text-green-500 font-bold uppercase">{item.growth}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
       </div>
    </div>
  );
};

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(" ");

export default ViewersPage;
