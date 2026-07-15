"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, Share2, Globe, MessageCircle, Users } from "lucide-react";

const Footer = () => {
  const pathname = usePathname();

  // Hide the footer on all admin-related routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-brand-beige pt-20 pb-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="text-xl font-bold text-brand-charcoal">
                Prof <span className="text-brand-orange">Consult</span>
              </span>
            </Link>
            <p className="text-gray-500 leading-relaxed">
              Your premium partner in student housing. We provide verified listings and expert advisory services to ensure you find the perfect home.
            </p>
            <div className="flex gap-4">
              {[Share2, Globe, MessageCircle, Users].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-brand-orange hover:shadow-md transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-brand-charcoal mb-6 uppercase text-sm tracking-widest">Navigation</h4>
            <ul className="space-y-4">
              {["Home", "Listings", "How It Works", "Testimonials", "Contact"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-500 hover:text-brand-orange transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-brand-charcoal mb-6 uppercase text-sm tracking-widest">Resources</h4>
            <ul className="space-y-4">
              {["Student Guide", "Verified Listings", "Booking Process", "Safety First", "FAQs"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-500 hover:text-brand-orange transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-brand-charcoal mb-6 uppercase text-sm tracking-widest">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-500">
                <MapPin className="text-brand-orange shrink-0" size={18} />
                <span>daleko ibogun</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <Phone className="text-brand-orange shrink-0" size={18} />
                <span>+234 706 048 0048</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <Mail className="text-brand-orange shrink-0" size={18} />
                <span>hello@profconsult.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2024 Prof Consult. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-brand-orange">Privacy Policy</Link>
            <Link href="#" className="hover:text-brand-orange">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
