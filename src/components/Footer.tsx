"use client";

import Link from "next/link";
import React from "react";
import { FaPaw, FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { HiHeart } from "react-icons/hi";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8 px-4 md:px-6 lg:px-8 mt-20">
      
      {/* Top Section: Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-slate-800 pb-12">
        
        {/* Column 1: About / Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#00A896]/20 rounded-xl text-[#00A896]">
              <FaPaw className="text-2xl" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">
              Paws<span className="text-[#00A896]">-Adopt</span>
            </span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Find your perfect furry companion today. Skip the breeders, adopt a pet in need, and give them the loving home they truly deserve.
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            <a href="#" aria-label="Facebook" className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-[#00A896] text-slate-400 hover:text-white transition-all duration-300">
              <FaFacebookF className="text-sm" />
            </a>
            <a href="#" aria-label="LinkedIn" className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-[#028090] text-slate-400 hover:text-white transition-all duration-300">
              <FaLinkedinIn className="text-sm" />
            </a>
            <a href="#" aria-label="Twitter" className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-[#00A896] text-slate-400 hover:text-white transition-all duration-300">
              <FaTwitter className="text-sm" />
            </a>
            <a href="#" aria-label="Instagram" className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-[#028090] text-slate-400 hover:text-white transition-all duration-300">
              <FaInstagram className="text-sm" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white uppercase tracking-wider">
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-sm font-medium">
            <li>
              <Link href="/" className="hover:text-[#00A896] transition-colors duration-200">Home</Link>
            </li>
            <li>
              <Link href="/all-pets" className="hover:text-[#00A896] transition-colors duration-200">Find a Pet</Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-[#00A896] transition-colors duration-200">Dashboard</Link>
            </li>
            <li>
              <a href="#" className="hover:text-[#00A896] transition-colors duration-200">Adoption Process</a>
            </li>
          </ul>
        </div>

        {/* Column 3: Pet Categories */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white uppercase tracking-wider">
            Adopt a Friend
          </h3>
          <ul className="space-y-2.5 text-sm font-medium">
            <li>
              <a href="#" className="hover:text-[#028090] transition-colors duration-200">Dogs & Puppies</a>
            </li>
            <li>
              <a href="#" className="hover:text-[#028090] transition-colors duration-200">Cats & Kittens</a>
            </li>
            <li>
              <a href="#" className="hover:text-[#028090] transition-colors duration-200">Rabbits & Small Pets</a>
            </li>
            <li>
              <a href="#" className="hover:text-[#028090] transition-colors duration-200">Breed Guide</a>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Support */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white uppercase tracking-wider">
            Shelter Support
          </h3>
          <ul className="space-y-3 text-sm font-medium">
            <li className="flex items-center gap-3 text-slate-400">
              <FiPhone className="text-[#00A896] text-base flex-shrink-0" />
              <span>+880 1234-567890</span>
            </li>
            <li className="flex items-center gap-3 text-slate-400">
              <FiMail className="text-[#028090] text-base flex-shrink-0" />
              <span className="break-all">hello@pawsadopt.com</span>
            </li>
            <li className="flex items-start gap-3 text-slate-400">
              <FiMapPin className="text-[#00A896] text-lg flex-shrink-0 mt-0.5" />
              <span>Kandirpar, Comilla Sadar, Comilla, Bangladesh</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Section: Copyright */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
        <p className="flex items-center gap-1">
          © {new Date().getFullYear()} Paws-Adopt. Made with 
          <HiHeart className="text-red-500 inline text-sm animate-pulse" /> 
          for Animals.
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;