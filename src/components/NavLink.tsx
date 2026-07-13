"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// ১. প্রপসগুলোর জন্য টাইপ নির্ধারণ
interface NavLinkProps {
  href: string;
  className?: string; // ? দেওয়া হয়েছে কারণ এটি অপশনাল (default value আছে)
  children: React.ReactNode; // যেকোনো ভ্যালিড রিঅ্যাক্ট চাইল্ড এলিমেন্ট নেওয়ার জন্য
}

// ২. কম্পোনেন্টে টাইপ যোগ করা
const NavLink: React.FC<NavLinkProps> = ({ href, className = "", children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${className} ${
        isActive ? "border-b-2 border-red-500 text-red-500" : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;