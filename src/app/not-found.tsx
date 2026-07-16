'use client';

import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { FaPaw } from 'react-icons/fa';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-3xl p-8 md:p-12 shadow-sm flex flex-col items-center"
      >
        {/* Animated Icon Container */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-teal-50 dark:bg-teal-950/40 rounded-full blur-xl opacity-70 animate-pulse"></div>
          <div className="relative p-5 bg-teal-50 dark:bg-teal-950/40 text-[#00A896] rounded-full">
            <FaPaw className="w-12 h-12 animate-bounce" />
          </div>
        </div>

        {/* 404 Error Code */}
        <h1 className="text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
          404
        </h1>

        {/* Not Found Message */}
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">
          Lost Your Way?
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
          Oops! It seems this page has wandered off, just like a playful puppy chasing a butterfly. Let's get you back on track!
        </p>

        {/* Back to Home Button */}
        <Link href="/" className="w-full">
          <button className="w-full py-3 text-sm font-bold tracking-wide text-white bg-[#00A896] hover:bg-[#009282] rounded-xl shadow-sm transition-all flex items-center justify-center cursor-pointer">
            Back to Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;