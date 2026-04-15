"use client";

import React from "react";
import { 
  User, Bell, Shield, Globe, 
  CreditCard, Smartphone, Mail, Lock
} from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="p-8 md:p-12 lg:p-16 pt-32">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-brand-charcoal mb-4">
            Platform <span className="text-brand-orange">Settings</span>
          </h1>
          <p className="text-gray-500 text-lg">Manage your account, security, and notification preferences.</p>
        </header>

        <div className="space-y-8">
          {/* Profile Section */}
          <div className="bg-white p-10 rounded-[40px] shadow-premium border border-gray-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-20 h-20 bg-brand-orange rounded-3xl overflow-hidden">
                 <img src="https://i.pravatar.cc/150?u=admin" className="w-full h-full object-cover" alt="Avatar" />
              </div>
              <div>
                 <h3 className="text-2xl font-bold text-brand-charcoal">Admin Account</h3>
                 <p className="text-gray-400">Manage your public profile and avatar.</p>
              </div>
              <button className="ml-auto btn-outline px-6 py-2">Change</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-brand-charcoal uppercase tracking-widest">Full Name</label>
                <input type="text" defaultValue="Prof Consult Admin" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-brand-charcoal focus:ring-2 focus:ring-brand-orange/10 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-brand-charcoal uppercase tracking-widest">Email Address</label>
                <input type="email" defaultValue="admin@profconsult.com" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-brand-charcoal focus:ring-2 focus:ring-brand-orange/10 outline-none" />
              </div>
            </div>
          </div>

          {/* Configuration List */}
          <div className="bg-white rounded-[40px] shadow-premium border border-gray-100 overflow-hidden">
             {[
               { name: "Notifications", desc: "Manage email and push alerts", icon: <Bell /> },
               { name: "Security", desc: "Password and 2FA configuration", icon: <Shield /> },
               { name: "Billing", desc: "Manage subscription and invoices", icon: <CreditCard /> },
               { name: "Platform Language", desc: "Configure default display language", icon: <Globe /> },
             ].map((item, i) => (
               <button key={i} className="w-full flex items-center justify-between p-8 hover:bg-gray-50 transition-all border-b border-gray-50 last:border-0 text-left">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-brand-orange/5 text-brand-orange rounded-2xl flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-charcoal">{item.name}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                  <div className="text-gray-300">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
               </button>
             ))}
          </div>

          <div className="flex justify-end gap-4">
             <button className="px-8 py-4 text-gray-400 font-bold hover:text-brand-charcoal transition-colors">Cancel</button>
             <button className="btn-orange px-12 py-4 shadow-xl shadow-brand-orange/20">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
