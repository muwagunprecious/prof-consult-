"use client";

import React, { useState, useEffect } from "react";
import { 
  Building, User, Calendar, Plus, Search, 
  Trash2, Edit, CheckCircle, AlertTriangle, X, TrendingUp, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PropertyRecord {
  id: string;
  tenantName: string;
  propertyName: string;
  amountPaid: number;
  amountBalanced: number;
  dueDate: string;
  datePaid: string;
}

export default function PropertyManagementPage() {
  const [records, setRecords] = useState<PropertyRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Paid" | "Partial" | "Overdue">("All");
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Modal / Form state
  const [isOpen, setIsOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PropertyRecord | null>(null);
  
  // Form fields
  const [tenantName, setTenantName] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [amountBalanced, setAmountBalanced] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [datePaid, setDatePaid] = useState("");

  // Fetch from DB
  const fetchRecords = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await fetch("/api/properties");
      if (!res.ok) throw new Error("Failed to load records from database.");
      const data = await res.json();
      setRecords(data);
    } catch (e: any) {
      setErrorMessage(e.message || "An error occurred while loading database records.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Open modal for adding
  const handleOpenAdd = () => {
    setEditingRecord(null);
    setTenantName("");
    setPropertyName("");
    setAmountPaid("");
    setAmountBalanced("");
    setDueDate("");
    setDatePaid("");
    setIsOpen(true);
  };

  // Open modal for editing
  const handleOpenEdit = (record: PropertyRecord) => {
    setEditingRecord(record);
    setTenantName(record.tenantName);
    setPropertyName(record.propertyName);
    setAmountPaid(record.amountPaid.toString());
    setAmountBalanced(record.amountBalanced.toString());
    setDueDate(record.dueDate);
    setDatePaid(record.datePaid || "");
    setIsOpen(true);
  };

  // Delete record
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this property record?")) {
      try {
        const res = await fetch(`/api/properties/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Could not delete record from database.");
        
        // Optimistic UI update
        setRecords(prev => prev.filter(r => r.id !== id));
      } catch (e: any) {
        alert(e.message || "Failed to delete record.");
      }
    }
  };

  // Submit add/edit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenantName || !propertyName || !dueDate) return;

    setIsSubmitting(true);
    try {
      const parsedPaid = parseFloat(amountPaid) || 0;
      const parsedBalanced = parseFloat(amountBalanced) || 0;

      if (editingRecord) {
        // Edit existing in DB
        const res = await fetch(`/api/properties/${editingRecord.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tenantName,
            propertyName,
            amountPaid: parsedPaid,
            amountBalanced: parsedBalanced,
            dueDate,
            datePaid
          }),
        });
        if (!res.ok) throw new Error("Failed to save changes to database.");
        const updatedRecord = await res.json();
        
        setRecords(prev => prev.map(r => r.id === editingRecord.id ? updatedRecord : r));
      } else {
        // Add new to DB
        const res = await fetch("/api/properties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tenantName,
            propertyName,
            amountPaid: parsedPaid,
            amountBalanced: parsedBalanced,
            dueDate,
            datePaid
          }),
        });
        if (!res.ok) throw new Error("Failed to upload new record to database.");
        const newRecord = await res.json();
        
        setRecords(prev => [newRecord, ...prev]);
      }
      setIsOpen(false);
    } catch (e: any) {
      alert(e.message || "Failed to submit property record.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mark balance as paid instantly
  const handleMarkAsPaid = async (id: string) => {
    const record = records.find(r => r.id === id);
    if (!record) return;

    const todayStr = new Date().toISOString().split("T")[0];

    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountPaid: record.amountPaid + record.amountBalanced,
          amountBalanced: 0,
          datePaid: todayStr
        }),
      });
      if (!res.ok) throw new Error("Failed to update database.");
      const updated = await res.json();
      
      setRecords(prev => prev.map(r => r.id === id ? updated : r));
    } catch (e: any) {
      alert(e.message || "Failed to mark record as paid.");
    }
  };

  // Developer Seed Helper (adds mockup rows to PostgreSQL if empty)
  const handleSeedMockData = async () => {
    const mockInitialData = [
      { tenantName: "Emeka Obi", propertyName: "Luxury Studio at Ikeja GRA", amountPaid: 150000, amountBalanced: 0, dueDate: "2026-08-15", datePaid: "2025-08-15" },
      { tenantName: "Chioma Adeleke", propertyName: "Modern En-suite by Unilag", amountPaid: 60000, amountBalanced: 25000, dueDate: "2026-07-20", datePaid: "2025-07-20" },
      { tenantName: "Tunde Bakare", propertyName: "Premium 1-Bed in Maitama", amountPaid: 200000, amountBalanced: 50000, dueDate: "2026-05-10", datePaid: "2025-05-10" },
      { tenantName: "Fatima Yusuf", propertyName: "Safe Shared Flat near UI", amountPaid: 45000, amountBalanced: 0, dueDate: "2026-09-01", datePaid: "2025-09-01" }
    ];

    try {
      setIsLoading(true);
      for (const item of mockInitialData) {
        await fetch("/api/properties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
      }
      await fetchRecords();
    } catch (e: any) {
      alert("Failed to seed database.");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate stats
  const totalRecords = records.length;
  const totalPaid = records.reduce((sum, r) => sum + r.amountPaid, 0);
  const totalBalanced = records.reduce((sum, r) => sum + r.amountBalanced, 0);
  
  // Calculate statuses
  const getStatus = (record: PropertyRecord) => {
    const todayStr = new Date().toISOString().split("T")[0];
    if (record.amountBalanced === 0) {
      return "Paid";
    }
    if (record.dueDate < todayStr) {
      return "Overdue";
    }
    return "Partial";
  };

  const overdueCount = records.filter(r => getStatus(r) === "Overdue").length;
  const overdueRecords = records.filter(r => getStatus(r) === "Overdue");

  // Filter records
  const filteredRecords = records.filter(r => {
    const matchesSearch = 
      r.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.propertyName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterStatus === "All") return matchesSearch;
    return matchesSearch && getStatus(r) === filterStatus;
  });

  return (
    <div className="p-8 md:p-12 lg:p-16 pt-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-brand-charcoal mb-4">
              Property & <span className="text-brand-orange">Rentals</span>
            </h1>
            <p className="text-gray-500 text-lg">Manage tenants, track rent collections, balances, and deadlines in PostgreSQL.</p>
          </div>
          <div className="flex gap-4">
            {records.length === 0 && !isLoading && (
              <button 
                onClick={handleSeedMockData}
                className="btn-outline flex items-center gap-2 outline-none cursor-pointer"
              >
                Seed Mock Data
              </button>
            )}
            <button 
              onClick={handleOpenAdd}
              className="btn-orange flex items-center gap-2 shadow-xl shadow-brand-orange/20 cursor-pointer outline-none"
            >
              <Plus size={20} />
              Upload Tenant Status
            </button>
          </div>
        </header>

        {errorMessage && (
          <div className="mb-8 p-6 bg-red-50 text-red-600 rounded-[20px] flex items-center gap-3 font-semibold border border-red-100">
            <AlertTriangle size={20} />
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="bg-white p-8 rounded-[32px] shadow-premium border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-brand-orange/5 text-brand-orange rounded-2xl flex items-center justify-center">
                <User size={24} />
              </div>
            </div>
            <div>
              <p className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-1">Active Tenants</p>
              <h3 className="text-3xl font-extrabold text-brand-charcoal">
                {isLoading ? <Loader2 className="animate-spin text-gray-300" size={24} /> : totalRecords}
              </h3>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] shadow-premium border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                <CheckCircle size={24} />
              </div>
            </div>
            <div>
              <p className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-1">Total Collected</p>
              <h3 className="text-3xl font-extrabold text-brand-charcoal">
                {isLoading ? <Loader2 className="animate-spin text-gray-300" size={24} /> : `₦${totalPaid.toLocaleString()}`}
              </h3>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] shadow-premium border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center">
                <TrendingUp size={24} />
              </div>
            </div>
            <div>
              <p className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-1">Outstanding Balance</p>
              <h3 className="text-3xl font-extrabold text-brand-charcoal">
                {isLoading ? <Loader2 className="animate-spin text-gray-300" size={24} /> : `₦${totalBalanced.toLocaleString()}`}
              </h3>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[32px] shadow-premium border border-gray-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center">
                <AlertTriangle size={24} />
              </div>
            </div>
            <div>
              <p className="text-gray-400 font-bold uppercase tracking-wider text-xs mb-1">Overdue Accounts</p>
              <h3 className="text-3xl font-extrabold text-brand-charcoal text-red-600">
                {isLoading ? <Loader2 className="animate-spin text-gray-300" size={24} /> : overdueCount}
              </h3>
            </div>
          </div>
        </div>

        {/* Rent Due Messages for the Admin */}
        {overdueRecords.length > 0 && (
          <div className="mb-12 p-6 bg-red-50 border border-red-100 rounded-[28px]">
            <div className="flex items-center gap-2 text-red-600 font-black text-xs uppercase tracking-widest mb-4">
              <AlertTriangle size={18} />
              <span>Rent Due Warnings ({overdueRecords.length})</span>
            </div>
            <div className="space-y-3">
              {overdueRecords.map((r) => (
                <div 
                  key={r.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-red-200/50 shadow-sm"
                >
                  <div className="text-xs text-gray-600 font-semibold">
                    Rent is due for <span className="text-brand-charcoal font-bold">{r.tenantName}</span> ({r.propertyName}). 
                    Balance: <span className="text-red-600 font-bold">₦{r.amountBalanced.toLocaleString()}</span>. 
                    Due: <span className="text-red-500 font-bold">{new Date(r.dueDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                  </div>
                  <button 
                    onClick={() => handleMarkAsPaid(r.id)}
                    className="self-start sm:self-auto px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer transition-all outline-none"
                  >
                    Clear Balance
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Toolbar & Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input 
              type="text" 
              placeholder="Search tenant or property..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm outline-none text-brand-charcoal focus:ring-2 focus:ring-brand-orange/10 transition-all"
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {(["All", "Paid", "Partial", "Overdue"] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs font-bold transition-all border outline-none cursor-pointer whitespace-nowrap",
                  filterStatus === status 
                    ? "bg-brand-orange border-brand-orange text-white" 
                    : "bg-white border-gray-100 text-gray-400 hover:text-brand-orange hover:border-brand-orange/20"
                )}
              >
                {status} {status === "All" ? "" : `(${records.filter(r => status === "Paid" ? r.amountBalanced === 0 : status === "Overdue" ? getStatus(r) === "Overdue" : getStatus(r) === "Partial").length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-[40px] shadow-premium border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50 uppercase text-[10px] font-bold text-gray-400 tracking-widest bg-gray-50/50">
                  <th className="px-8 py-6">Tenant Name</th>
                  <th className="px-8 py-6">House / Hotel</th>
                  <th className="px-8 py-6">Amount Paid</th>
                  <th className="px-8 py-6">Date Paid</th>
                  <th className="px-8 py-6">Balance</th>
                  <th className="px-8 py-6">Rent Due Date</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="px-8 py-16 text-center text-gray-400">
                      <Loader2 className="animate-spin text-brand-orange mx-auto mb-4" size={40} />
                      <p className="font-bold text-lg">Connecting to PostgreSQL...</p>
                    </td>
                  </tr>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {filteredRecords.length > 0 ? (
                      filteredRecords.map((record) => {
                        const status = getStatus(record);
                        return (
                          <motion.tr 
                            key={record.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="border-b border-gray-50 group hover:bg-gray-50/50 transition-all duration-300"
                          >
                            <td className="px-8 py-6 font-bold text-brand-charcoal">
                              {record.tenantName}
                            </td>
                            <td className="px-8 py-6 text-gray-500 font-medium">
                              {record.propertyName}
                            </td>
                            <td className="px-8 py-6 font-semibold text-green-600">
                              ₦{record.amountPaid.toLocaleString()}
                            </td>
                            <td className="px-8 py-6 text-gray-500 font-medium">
                              {record.datePaid ? (
                                <span className="flex items-center gap-1.5">
                                  <Calendar size={14} className="text-gray-300" />
                                  {new Date(record.datePaid).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                              ) : (
                                <span className="text-gray-300 font-bold">—</span>
                              )}
                            </td>
                            <td className={cn(
                              "px-8 py-6 font-semibold",
                              record.amountBalanced > 0 ? "text-amber-600" : "text-gray-400"
                            )}>
                              ₦{record.amountBalanced.toLocaleString()}
                            </td>
                            <td className="px-8 py-6 text-gray-500 font-medium">
                              <span className="flex items-center gap-1.5">
                                <Calendar size={14} className="text-gray-300" />
                                {new Date(record.dueDate).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </td>
                            <td className="px-8 py-6">
                              <span className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                status === "Paid" ? "bg-green-100 text-green-600" :
                                status === "Partial" ? "bg-amber-100 text-amber-600" :
                                "bg-red-100 text-red-600"
                              )}>
                                {status}
                              </span>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {record.amountBalanced > 0 && (
                                  <button 
                                    onClick={() => handleMarkAsPaid(record.id)}
                                    className="p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:bg-green-500 hover:text-white transition-all shadow-sm cursor-pointer outline-none"
                                    title="Mark Balance as Paid"
                                  >
                                    <CheckCircle size={16} />
                                  </button>
                                )}
                                <button 
                                  onClick={() => handleOpenEdit(record)}
                                  className="p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:bg-brand-charcoal hover:text-white transition-all shadow-sm cursor-pointer outline-none"
                                  title="Edit Record"
                                >
                                  <Edit size={16} />
                                </button>
                                <button 
                                  onClick={() => handleDelete(record.id)}
                                  className="p-2.5 rounded-xl bg-gray-50 text-gray-400 hover:bg-red-500 hover:text-white transition-all shadow-sm cursor-pointer outline-none"
                                  title="Delete Record"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={8} className="px-8 py-16 text-center text-gray-400">
                          <Building size={48} className="mx-auto text-gray-200 mb-4" />
                          <p className="font-bold text-lg">No records found</p>
                          <p className="text-sm">Try tweaking your search filter or upload a tenant status above.</p>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal / Dialog Overlay */}
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-brand-charcoal/45 backdrop-blur-sm"
              />

              {/* Form Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-xl rounded-[32px] sm:rounded-[40px] shadow-2xl p-6 sm:p-10 border border-gray-100 max-h-[85vh] sm:max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-4">
                  <h3 className="text-2xl font-extrabold text-brand-charcoal">
                    {editingRecord ? "Edit Tenant Status" : "Upload Tenant Status"}
                  </h3>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl text-gray-400 hover:text-brand-orange hover:bg-brand-orange/5 transition-all cursor-pointer outline-none"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">Tenant Name</label>
                    <div className="relative">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                      <input 
                        type="text" 
                        required
                        value={tenantName}
                        onChange={(e) => setTenantName(e.target.value)}
                        placeholder="e.g. Emeka Obi"
                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-brand-charcoal outline-none focus:ring-2 focus:ring-brand-orange/10 font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">House / Hotel Name</label>
                    <div className="relative">
                      <Building className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                      <input 
                        type="text" 
                        required
                        value={propertyName}
                        onChange={(e) => setPropertyName(e.target.value)}
                        placeholder="e.g. Luxury Studio at Ikeja GRA"
                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-brand-charcoal outline-none focus:ring-2 focus:ring-brand-orange/10 font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">Amount Paid (₦)</label>
                      <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 font-bold">₦</span>
                        <input 
                          type="number" 
                          value={amountPaid}
                          onChange={(e) => setAmountPaid(e.target.value)}
                          placeholder="e.g. 150000"
                          className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-brand-charcoal outline-none focus:ring-2 focus:ring-brand-orange/10 font-sans"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">Amount to be Balanced (₦)</label>
                      <div className="relative">
                        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 font-bold">₦</span>
                        <input 
                          type="number" 
                          value={amountBalanced}
                          onChange={(e) => setAmountBalanced(e.target.value)}
                          placeholder="e.g. 50000"
                          className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-brand-charcoal outline-none focus:ring-2 focus:ring-brand-orange/10 font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">Date Paid</label>
                      <div className="relative">
                        <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input 
                          type="date" 
                          value={datePaid}
                          onChange={(e) => setDatePaid(e.target.value)}
                          className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-brand-charcoal outline-none focus:ring-2 focus:ring-brand-orange/10 font-sans"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brand-charcoal uppercase tracking-wider">Rent Due Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                        <input 
                          type="date" 
                          required
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                          className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-brand-charcoal outline-none focus:ring-2 focus:ring-brand-orange/10 font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 mt-4 bg-brand-orange text-white rounded-2xl font-extrabold shadow-xl shadow-brand-orange/20 hover:bg-brand-orange-light active:scale-95 disabled:bg-gray-300 disabled:shadow-none transition-all text-lg cursor-pointer outline-none flex items-center justify-center gap-2"
                  >
                    {isSubmitting && <Loader2 className="animate-spin" size={20} />}
                    {editingRecord ? "Save Changes" : "Submit Record"}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
