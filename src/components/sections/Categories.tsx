"use client";

import React from "react";
import { 
  Home, Bed, Users, Building, Hotel, Landmark, 
  Warehouse, Tent, Trees, Flame, Compass 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  name: string;
  icon: React.ReactNode;
}

interface CategoriesProps {
  activeCategory: string;
  setActiveCategory: (name: string) => void;
}

export const categories: Category[] = [
  { name: "All", icon: <Compass size={24} /> },
  { name: "Studio", icon: <Home size={24} /> },
  { name: "En-suite", icon: <Bed size={24} /> },
  { name: "1 Bedroom", icon: <Building size={24} /> },
  { name: "Shared Flat", icon: <Users size={24} /> },
  { name: "Hotel Rooms", icon: <Hotel size={24} /> },
  { name: "Mansions", icon: <Landmark size={24} /> },
  { name: "Lofts", icon: <Warehouse size={24} /> },
  { name: "Campgrounds", icon: <Tent size={24} /> },
  { name: "Cabins", icon: <Trees size={24} /> },
  { name: "Trending", icon: <Flame size={24} /> },
];

export default function Categories({ activeCategory, setActiveCategory }: CategoriesProps) {
  return (
    <div className="w-full bg-white border-b border-gray-100 py-4 sticky top-16 z-40 px-6">
      <div className="max-w-7xl mx-auto flex items-center gap-8 overflow-x-auto no-scrollbar pb-2">
        {categories.map((category) => {
          const isActive = activeCategory === category.name;
          return (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={cn(
                "flex flex-col items-center gap-2 border-b-2 pb-2 transition-all duration-200 cursor-pointer outline-none shrink-0 group",
                isActive 
                  ? "border-brand-orange text-brand-orange" 
                  : "border-transparent text-gray-400 hover:text-brand-charcoal hover:border-gray-200"
              )}
            >
              <div className={cn(
                "transition-transform duration-200 group-hover:scale-105",
                isActive ? "text-brand-orange" : "text-gray-400 group-hover:text-brand-charcoal"
              )}>
                {category.icon}
              </div>
              <span className="text-[11px] font-bold tracking-tight uppercase">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
