"use client";

import React, { useState, useEffect } from "react";
// Removed static import; data will be fetched from API
import { 
  Search, MapPin, 
  Trash2, Archive, CheckCircle2, AlertCircle, Eye,
  Pencil
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const ListingsManagement = () => {
  const [items, setItems] = useState([] as any[]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [listRes, leadRes] = await Promise.all([
          fetch('/api/listings'),
          fetch('/api/leads'),
        ]);
        const listings = await listRes.json();
        const leadData = await leadRes.json();
        const listingsWithLeads = listings.map((l: any) => ({
          ...l,
          status: l.status || "Active",
          leads: leadData.filter((lead: any) => lead.listingId === l.id),
        }));
        setItems(listingsWithLeads);
      } catch (err) {
        console.error('Error fetching data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }


  const updateStatus = (id: number, status: "Active" | "Sold" | "Out of Stock" | "Archived") => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  // Delete listing via API
  const deleteItem = async (id: number) => {
    try {
      const res = await fetch(`/api/listings/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Simple edit: prompt for new title and send PUT request
  const editItem = async (item: any) => {
    const newTitle = window.prompt('Enter new title', item.title);
    if (!newTitle) return;
    try {
      const res = await fetch(`/api/listings/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, title: newTitle }),
      });
      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
      setItems(prev => prev.map(i => i.id === item.id ? updated : i));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 md:p-12 lg:p-16 pt-32">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-brand-charcoal mb-4">
              My <span className="text-brand-orange">Listings</span>
            </h1>
            <p className="text-gray-500 text-lg">Manage your property levels, status, and availability seamlessly.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input 
              type="text" 
              placeholder="Filter by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm outline-none text-brand-charcoal focus:ring-2 focus:ring-brand-orange/10"
            />
          </div>
        </header>

        <div className="bg-white rounded-[40px] shadow-premium border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50 uppercase text-[10px] font-bold text-gray-400 tracking-widest bg-gray-50/50">
                  <th className="px-8 py-6">Property</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6">Price</th>
                  <th className="px-8 py-6 text-center">Leads</th>
                  <th className="px-8 py-6 text-center">Phones</th>
                  <th className="px-8 py-6 text-center">Engagement</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {items.filter((item) => {
                  const term = searchTerm.toLowerCase();
                  return (
                    item.title.toLowerCase().includes(term) ||
                    item.location.toLowerCase().includes(term)
                  );
                }).map((item) => (
                    <motion.tr 
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="border-b border-gray-50 group hover:bg-gray-50/50 transition-all duration-300"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <img src={item.images?.[0] || ''} className="w-16 h-16 rounded-2xl object-cover" alt={item.title} />
                          <div>
                            <p className="font-bold text-brand-charcoal mb-1">{item.title}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <MapPin size={12} />
                              {item.location}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          item.status === "Active" ? "bg-green-100 text-green-600" :
                          item.status === "Sold" ? "bg-brand-orange text-white" :
                          item.status === "Out of Stock" ? "bg-gray-100 text-gray-500" :
                          "bg-red-100 text-red-600"
                        )}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <p className="font-bold text-brand-charcoal">₦{item.price}<span className="text-[10px] text-gray-400">/mo</span></p>
                      </td>
                      <td className="px-8 py-6 text-center font-bold text-brand-charcoal">
                        {item.leads?.length || 0}
                      </td>
                      <td className="px-8 py-6 text-center">
                        {item.leads?.map((lead: any) => lead.whatsapp).join(', ') || '-'}
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-1 text-xs font-bold text-brand-charcoal">
                            <Eye size={14} className="text-gray-300" />
                            1.2k
                          </div>
                          <div className="text-[10px] text-gray-400">Views this month</div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => editItem(item)}
                            className="p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                            title="Edit Listing"
                          >
                            <Pencil size={18} />
                          </button>
                          <button 
                            onClick={() => updateStatus(item.id, item.status === "Sold" ? "Active" : "Sold")}
                            className="p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:bg-brand-orange hover:text-white transition-all shadow-sm group/btn tooltip-trigger relative"
                            title="Mark as Sold"
                          >
                            <CheckCircle2 size={18} />
                          </button>
                          <button 
                            onClick={() => updateStatus(item.id, item.status === "Out of Stock" ? "Active" : "Out of Stock")}
                            className="p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:bg-brand-charcoal hover:text-white transition-all shadow-sm"
                            title="Mark Out of Stock"
                          >
                            <AlertCircle size={18} />
                          </button>
                          <button 
                            onClick={() => deleteItem(item.id)}
                            className="p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                            title="Delete Listing"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingsManagement;
