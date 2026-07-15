"use client";

import React, { useState } from "react";
import { 
  Search, MoreVertical, Send, Paperclip, 
  Smile, Phone, Video, CheckCheck, MapPin, 
  ChevronLeft 
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MessagingPage = () => {
  const [activeChat, setActiveChat] = useState(1);

  const chats = [
    {
      id: 1,
      name: "Prof Consult",
      role: "Housing Advisor",
      lastMessage: "The Marble Arch studio is still available for October. Would you like to...",
      time: "10:42 AM",
      unread: 2,
      online: true,
      image: "https://i.pravatar.cc/150?u=advis",
    },
    {
      id: 2,
      name: "John Miller",
      role: "Property Manager",
      lastMessage: "I've sent the contract over to your email. Please let me know if...",
      time: "Yesterday",
      unread: 0,
      online: false,
      image: "https://i.pravatar.cc/150?u=john",
    },
    {
      id: 3,
      name: "Bethany Rose",
      role: "Housing Expert",
      lastMessage: "Great choice! Bloomsbury is a fantastic area for Imperial students.",
      time: "Mon",
      unread: 0,
      online: true,
      image: "https://i.pravatar.cc/150?u=bethany",
    },
  ];

  const messages = [
    { sender: "Prof Consult", text: "Hello! Thank you for inquiring about the Luxury Studio at Marble Arch.", time: "10:30 AM", type: "received" },
    { sender: "Me", text: "Hi Prof! Is it still available for a move-in date in October?", time: "10:35 AM", type: "sent" },
    { sender: "Prof Consult", text: "Yes, it is still available for October. We just verified the latest amenities list.", time: "10:40 AM", type: "received" },
    { sender: "Prof Consult", text: "The Marble Arch studio is still available for October. Would you like to schedule a virtual tour this afternoon?", time: "10:42 AM", type: "received" },
  ];

  return (
    <div className="h-screen bg-brand-beige pt-20 flex">
      <div className="max-w-7xl mx-auto w-full flex bg-white rounded-t-[40px] overflow-hidden shadow-2xl border-t border-x border-gray-100">
        
        {/* Left: Sidebar (Conversations) */}
        <aside className="w-full md:w-96 border-r border-gray-50 flex flex-col">
          <div className="p-8">
            <h1 className="text-3xl font-extrabold text-brand-charcoal mb-6">Messages</h1>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="text" 
                placeholder="Search conversations..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border-none outline-none text-brand-charcoal focus:ring-2 focus:ring-brand-orange/10"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 space-y-2">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-[24px] transition-all",
                  activeChat === chat.id ? "bg-brand-orange/5" : "hover:bg-gray-50"
                )}
              >
                <div className="relative">
                  <img src={chat.image} className="w-14 h-14 rounded-2xl object-cover" alt={chat.name} />
                  {chat.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 text-left overflow-hidden">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-brand-charcoal truncate">{chat.name}</h4>
                    <span className="text-[10px] text-gray-400 font-medium uppercase">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate leading-tight">
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 bg-brand-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {chat.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Right: Active Chat */}
        <main className="hidden md:flex flex-1 flex-col bg-white">
          {/* Chat Header */}
          <header className="p-6 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img src={chats[0].image} className="w-12 h-12 rounded-2xl object-cover" alt="Prof Consult" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h3 className="font-extrabold text-brand-charcoal">{chats[0].name}</h3>
                <p className="text-xs text-brand-orange font-bold uppercase tracking-wider">{chats[0].role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-3 text-gray-400 hover:text-brand-orange transition-colors">
                <Phone size={20} />
              </button>
              <button className="p-3 text-gray-400 hover:text-brand-orange transition-colors">
                <Video size={20} />
              </button>
              <button className="p-3 text-gray-400 hover:text-brand-orange transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>
          </header>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            <div className="flex justify-center">
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">
                 Today, Oct 15
               </span>
            </div>
            {messages.map((msg, idx) => (
              <div key={idx} className={cn(
                "flex flex-col max-w-[70%]",
                msg.type === "sent" ? "ml-auto items-end" : "items-start"
              )}>
                <div className={cn(
                  "p-5 rounded-[28px] text-sm leading-relaxed",
                  msg.type === "sent" 
                    ? "bg-brand-charcoal text-white rounded-tr-none" 
                    : "bg-brand-beige text-brand-charcoal rounded-tl-none border border-gray-100"
                )}>
                  {msg.text}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-[10px] text-gray-400 font-medium uppercase">{msg.time}</span>
                  {msg.type === "sent" && <CheckCheck size={12} className="text-brand-orange" />}
                </div>
              </div>
            ))}
            {/* Fake typing indicator */}
            <div className="flex items-start gap-2">
              <img src={chats[0].image} className="w-8 h-8 rounded-lg object-cover" alt="Prof Consult mini" />
              <div className="bg-brand-beige px-4 py-3 rounded-[20px] rounded-tl-none flex gap-1">
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>

          {/* Input Box */}
          <footer className="p-8 border-t border-gray-50 bg-white">
            <div className="bg-gray-50 rounded-[28px] p-2 flex items-center gap-2 border border-gray-100 focus-within:ring-2 focus-within:ring-brand-orange/10 transition-all">
              <button className="p-3 text-gray-400 hover:text-brand-orange transition-colors">
                <Paperclip size={20} />
              </button>
              <input 
                type="text" 
                placeholder="Type your message here..."
                className="flex-1 bg-transparent border-none outline-none text-brand-charcoal py-3 px-2 placeholder:text-gray-400"
              />
              <button className="p-3 text-gray-400 hover:text-brand-orange transition-colors">
                <Smile size={20} />
              </button>
              <button className="w-12 h-12 bg-brand-orange text-white rounded-2xl flex items-center justify-center shadow-lg shadow-brand-orange/20 hover:bg-brand-orange-light transition-all active:scale-95">
                <Send size={20} />
              </button>
            </div>
          </footer>
        </main>

      </div>
    </div>
  );
};

export default MessagingPage;
