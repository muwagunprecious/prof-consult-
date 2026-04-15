"use client";

import React, { useState } from "react";
import { 
  Upload, Image as ImageIcon, MapPin, 
  PoundSterling, CheckCircle2, AlertCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";

const AdminUploadPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublished(true);
    setTimeout(() => setIsPublished(false), 3000);
  };

  return (
    <div className="p-8 md:p-12 lg:p-16 pt-32">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold text-brand-charcoal mb-4">Add <span className="text-brand-orange">New Property</span></h1>
            <p className="text-gray-500 text-lg">Enter the details of the premium residency below.</p>
          </div>
        </header>

        <form onSubmit={handlePublish} className="space-y-10">
          {/* Basic Info */}
          <div className="bg-white p-10 rounded-[40px] shadow-premium border border-gray-100 space-y-8">
            <h3 className="text-xl font-bold text-brand-charcoal border-b border-gray-50 pb-4">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-charcoal uppercase tracking-wider">Property Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Modern Suite in Kensington"
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-brand-charcoal focus:ring-2 focus:ring-brand-orange/10 outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-charcoal uppercase tracking-wider">Price (pw)</label>
                <div className="relative">
                  <PoundSterling className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                  <input 
                    type="number" 
                    placeholder="350"
                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-brand-charcoal focus:ring-2 focus:ring-brand-orange/10 outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-charcoal uppercase tracking-wider">Location</label>
              <div className="relative">
                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input 
                  type="text" 
                  placeholder="Search address or neighborhood..."
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-brand-charcoal focus:ring-2 focus:ring-brand-orange/10 outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-charcoal uppercase tracking-wider">Description</label>
              <textarea 
                rows={4}
                placeholder="Describe the luxury and features of the property..."
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-brand-charcoal focus:ring-2 focus:ring-brand-orange/10 outline-none resize-none"
                required
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="bg-white p-10 rounded-[40px] shadow-premium border border-gray-100 space-y-8">
            <h3 className="text-xl font-bold text-brand-charcoal border-b border-gray-50 pb-4">Gallery</h3>
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              className={cn(
                "border-4 border-dashed rounded-[32px] p-16 flex flex-col items-center justify-center transition-all",
                dragActive ? "border-brand-orange bg-brand-orange/5" : "border-gray-50 bg-gray-50"
              )}
            >
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-brand-orange shadow-sm mb-6">
                <Upload size={32} />
              </div>
              <h4 className="text-xl font-bold text-brand-charcoal mb-2">Drag and drop images</h4>
              <p className="text-gray-400 mb-8">Up to 10 high-resolution photos (JPEG, PNG)</p>
              <button type="button" className="btn-outline font-bold">
                Browse Files
              </button>
            </div>
          </div>

          {/* Amenities Section */}
          <div className="bg-white p-10 rounded-[40px] shadow-premium border border-gray-100 space-y-8">
             <h3 className="text-xl font-bold text-brand-charcoal border-b border-gray-50 pb-4">Amenities</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {["WiFi", "Security", "Gym", "Parking", "Kitchen", "Laundry", "Cleaning", "Bills Inc."].map(item => (
                  <label key={item} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-brand-orange/5 transition-colors group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-brand-orange focus:ring-brand-orange" />
                    <span className="text-sm font-bold text-gray-500 group-hover:text-brand-charcoal transition-colors">{item}</span>
                  </label>
                ))}
             </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between pt-8">
            <div className="flex items-center gap-3 text-gray-400">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">Draft saved at 12:45 PM</p>
            </div>
            <button 
              type="submit" 
              className="btn-orange px-16 py-4 text-xl font-extrabold shadow-xl shadow-brand-orange/20 flex items-center gap-3"
            >
              {isPublished ? (
                <>
                  <CheckCircle2 size={24} />
                  Published!
                </>
              ) : "Publish Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUploadPage;
