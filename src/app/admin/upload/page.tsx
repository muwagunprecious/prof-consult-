"use client";

import React, { useState, useRef } from "react";
import { 
  Upload, MapPin, CheckCircle2, AlertCircle, Loader2, Image as ImageIcon, X
} from "lucide-react";
import { cn } from "@/lib/utils";

const AdminUploadPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // File upload states (multiple files support)
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [firstPayment, setFirstPayment] = useState("");
  const [subsequentPayment, setSubsequentPayment] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Studio");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  // Handle multi-file selections
  const handleFilesSelection = (files: FileList) => {
    const validFiles = Array.from(files).filter(f => f.type.startsWith("image/"));
    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles]);
      const newUrls = validFiles.map(f => URL.createObjectURL(f));
      setPreviewUrls(prev => [...prev, ...newUrls]);
      setErrorMessage("");
    } else if (files.length > 0) {
      setErrorMessage("Please select valid image files (JPEG, PNG, WEBP).");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFilesSelection(e.target.files);
    }
  };

  // Drag and drop event handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      handleFilesSelection(e.dataTransfer.files);
    }
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const clearAllFiles = () => {
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setSelectedFiles([]);
    setPreviewUrls([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !firstPayment || !subsequentPayment || !location) return;

    setIsSubmitting(true);
    setErrorMessage("");
    setIsPublished(false);

    try {
      let finalImageUrls: string[] = [];

      // 1. Upload all files concurrently
      if (selectedFiles.length > 0) {
        finalImageUrls = await Promise.all(
          selectedFiles.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file);

            const uploadRes = await fetch("/api/upload", {
              method: "POST",
              body: formData,
            });

            if (!uploadRes.ok) {
              throw new Error(`Failed to upload file: ${file.name}`);
            }

            const uploadData = await uploadRes.json();
            return uploadData.url;
          })
        );
      } else {
        // Default fallback if no files chosen
        finalImageUrls = ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800"];
      }

      // 2. Submit listing details with images array, custom description, and pricing tiers
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          location,
          firstPayment,
          subsequentPayment,
          type,
          images: finalImageUrls,
          description: description || `Experience premium student living in this beautifully designed ${type} located in ${location}.`,
          amenities: selectedAmenities.length > 0 ? selectedAmenities : ["WiFi", "Security"],
        }),
      });

      if (!res.ok) throw new Error("Failed to save the property listing to the database.");

      setIsPublished(true);
      
      // Reset form
      setTitle("");
      setFirstPayment("");
      setSubsequentPayment("");
      setLocation("");
      setDescription("");
      setType("Studio");
      setSelectedAmenities([]);
      clearAllFiles();
      
      setTimeout(() => setIsPublished(false), 3000);
    } catch (e: any) {
      setErrorMessage(e.message || "An error occurred while publishing the listing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 md:p-12 lg:p-16 pt-32">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-brand-charcoal mb-4">
            Add <span className="text-brand-orange">New Property</span>
          </h1>
          <p className="text-gray-500 text-lg">Enter details and payment tiers to store this residency in PostgreSQL.</p>
        </header>

        {errorMessage && (
          <div className="mb-8 p-6 bg-red-50 text-red-600 rounded-[20px] flex items-center gap-3 font-semibold border border-red-100">
            <AlertCircle size={20} />
            <p>{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handlePublish} className="space-y-10">
          {/* Basic Info */}
          <div className="bg-white p-10 rounded-[40px] shadow-premium border border-gray-100 space-y-8">
            <h3 className="text-xl font-bold text-brand-charcoal border-b border-gray-50 pb-4">Basic Information</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-charcoal uppercase tracking-wider">Property Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Modern Suite in Ikeja GRA"
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-brand-charcoal focus:ring-2 focus:ring-brand-orange/10 outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-charcoal uppercase tracking-wider">First Year Payment (₦)</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 font-bold">₦</span>
                  <input 
                    type="number" 
                    value={firstPayment}
                    onChange={(e) => setFirstPayment(e.target.value)}
                    placeholder="1800000"
                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-brand-charcoal focus:ring-2 focus:ring-brand-orange/10 outline-none"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-charcoal uppercase tracking-wider">Subsequent Year Payment (₦)</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 font-bold">₦</span>
                  <input 
                    type="number" 
                    value={subsequentPayment}
                    onChange={(e) => setSubsequentPayment(e.target.value)}
                    placeholder="1200000"
                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-brand-charcoal focus:ring-2 focus:ring-brand-orange/10 outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-charcoal uppercase tracking-wider">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Ikeja, Lagos"
                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-brand-charcoal focus:ring-2 focus:ring-brand-orange/10 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-brand-charcoal uppercase tracking-wider">Property Type</label>
                <select 
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-brand-charcoal focus:ring-2 focus:ring-brand-orange/10 outline-none cursor-pointer"
                >
                  <option value="Studio">Studio</option>
                  <option value="En-suite">En-suite</option>
                  <option value="1 Bedroom">1 Bedroom</option>
                  <option value="Shared Flat">Shared Flat</option>
                  <option value="Hotel Rooms">Hotel Rooms</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-charcoal uppercase tracking-wider">Description</label>
              <textarea 
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter custom descriptions of the property luxury features..."
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-brand-charcoal focus:ring-2 focus:ring-brand-orange/10 outline-none resize-none"
              />
            </div>
          </div>

          {/* Multiple Image Uploads */}
          <div className="bg-white p-10 rounded-[40px] shadow-premium border border-gray-100 space-y-8">
            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
              <h3 className="text-xl font-bold text-brand-charcoal">Gallery Images</h3>
              {previewUrls.length > 0 && (
                <button
                  type="button"
                  onClick={clearAllFiles}
                  className="text-xs font-bold text-red-500 hover:underline cursor-pointer outline-none"
                >
                  Clear All ({previewUrls.length})
                </button>
              )}
            </div>
            
            {previewUrls.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex items-center justify-center bg-gray-50 group">
                    <img 
                      src={url} 
                      alt={`Preview ${index + 1}`} 
                      className="w-full h-full object-cover" 
                    />
                    <button
                      type="button"
                      onClick={() => removeSelectedFile(index)}
                      className="absolute top-2 right-2 p-1.5 bg-brand-charcoal text-white hover:bg-brand-orange rounded-full shadow-md transition-colors cursor-pointer outline-none"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                
                {/* Micro Add Button */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 hover:border-brand-orange hover:bg-brand-orange/5 transition-all flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:text-brand-orange"
                >
                  <Upload size={20} className="mb-2" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Add More</span>
                </div>
              </div>
            )}

            {previewUrls.length === 0 && (
              <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "border-4 border-dashed rounded-[32px] p-16 flex flex-col items-center justify-center transition-all cursor-pointer",
                  dragActive ? "border-brand-orange bg-brand-orange/5" : "border-gray-50 bg-gray-50 hover:bg-gray-100/50"
                )}
              >
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-brand-orange shadow-sm mb-6">
                  <Upload size={32} />
                </div>
                <h4 className="text-xl font-bold text-brand-charcoal mb-2">Drag and drop your images</h4>
                <p className="text-gray-400 mb-8">Select multiple JPG, PNG, WEBP files</p>
                <button 
                  type="button" 
                  className="btn-outline font-bold outline-none cursor-pointer"
                >
                  Browse Files
                </button>
              </div>
            )}
            
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleInputChange}
              accept="image/*"
              multiple
              className="hidden" 
            />
          </div>

          {/* Amenities Section */}
          <div className="bg-white p-10 rounded-[40px] shadow-premium border border-gray-100 space-y-8">
             <h3 className="text-xl font-bold text-brand-charcoal border-b border-gray-50 pb-4">Amenities</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {["WiFi Included", "24/7 Security", "Solar Power", "Shared Kitchen", "Gym Access", "Laundry Room", "Parking Space", "Bills Included"].map(item => (
                  <label key={item} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-brand-orange/5 transition-colors group">
                    <input 
                      type="checkbox" 
                      checked={selectedAmenities.includes(item)}
                      onChange={() => handleAmenityChange(item)}
                      className="w-5 h-5 rounded border-gray-300 text-brand-orange focus:ring-brand-orange cursor-pointer" 
                    />
                    <span className="text-xs font-bold text-gray-500 group-hover:text-brand-charcoal transition-colors">{item}</span>
                  </label>
                ))}
             </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between pt-8">
            <div className="flex items-center gap-3 text-gray-400">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">Saves multiple photos inside PostgreSQL database</p>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-orange px-16 py-4 text-xl font-extrabold shadow-xl shadow-brand-orange/20 flex items-center gap-3 cursor-pointer outline-none disabled:bg-gray-300 disabled:shadow-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Uploading...
                </>
              ) : isPublished ? (
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
