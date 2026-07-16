"use client";

import React from 'react';
import { FaHeart, FaAppleAlt, FaStethoscope, FaShower } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface CareTip {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
}

const PetCareSection: React.FC = () => {
  const careTips: CareTip[] = [
    {
      id: 1,
      title: "Healthy Nutrition",
      description: "Provide high-quality, balanced food suitable for your pet's age and breed.",
      icon: <FaAppleAlt className="w-5 h-5 text-[#00A896]" />,
      iconBg: "bg-teal-50 dark:bg-teal-950/30"
    },
    {
      id: 2,
      title: "Regular Vet Checkups",
      description: "Schedule routine vaccinations and annual checkups with a professional vet.",
      icon: <FaStethoscope className="w-5 h-5 text-blue-500" />,
      iconBg: "bg-blue-50 dark:bg-blue-950/30"
    },
    {
      id: 3,
      title: "Grooming & Hygiene",
      description: "Brush their fur regularly to reduce shedding and keep them clean with pet-safe baths.",
      icon: <FaShower className="w-5 h-5 text-purple-500" />,
      iconBg: "bg-purple-50 dark:bg-purple-950/30"
    },
    {
      id: 4,
      title: "Love & Attention",
      description: "Spend quality time playing. Daily exercise is essential for their emotional well-being.",
      icon: <FaHeart className="w-5 h-5 text-rose-500" />,
      iconBg: "bg-rose-50 dark:bg-rose-950/30"
    }
  ];

  // Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          
          {/* Left Side: Cat Image (Fixed to match your rounded theme) */}
          <motion.div className="relative group px-4 lg:px-0" variants={imageVariants}>
            {/* Smooth theme gradient shape */}
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-100 to-rose-100 dark:from-teal-950/20 dark:to-rose-950/20 rounded-3xl transform -rotate-3 scale-102 transition-transform duration-500 group-hover:rotate-0"></div>
            
            <div className="relative overflow-hidden rounded-3xl shadow-md aspect-[4/4] sm:aspect-[4/3] lg:aspect-[4/4] max-w-md mx-auto lg:max-w-none">
              <img
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop"
                alt="Cute cat representing pet care"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            {/* Floating Badge matching theme */}
            <div className="absolute -bottom-4 -right-2 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-md border border-slate-150 dark:border-slate-800 flex items-center space-x-3 hidden sm:flex">
              <div className="p-2.5 bg-[#00A896] rounded-xl text-white">
                <FaHeart className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Daily Rule</p>
                <p className="text-xs font-extrabold text-slate-800 dark:text-white">Handle with Love</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Clean Content & Tips */}
          <motion.div className="space-y-8 text-left" variants={textVariants}>
            <div>
              <span className="text-xs font-bold tracking-widest text-[#00A896] uppercase">
                Pet Care Guide
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl mt-2">
                How to Care for Your New Best Friend
              </h2>
              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                Adopting a pet brings immense joy, but it also comes with a lifelong commitment. Follow these simple guidelines to make their transition smooth.
              </p>
            </div>

            {/* Clean & Balanced Tips List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {careTips.map((tip) => (
                <motion.div 
                  key={tip.id} 
                  variants={itemVariants}
                  className="flex flex-col items-start p-5 rounded-2xl border border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/30 transition-colors duration-200 hover:bg-white dark:hover:bg-slate-900 hover:shadow-sm"
                >
                  <div className={`p-3 rounded-xl mb-3 flex-shrink-0 ${tip.iconBg}`}>
                    {tip.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {tip.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default PetCareSection;