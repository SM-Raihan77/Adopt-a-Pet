"use client"; // If using Next.js App Router

import React, { useEffect } from 'react';
import { FaHeart, FaHome, FaUsers, FaAward } from 'react-icons/fa';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

// Component for Animated Number Counter
interface AnimatedNumberProps {
  value: number;
  suffix?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, suffix = "" }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayValue = useTransform(rounded, (latest) => latest.toLocaleString('en-US') + suffix);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 }); // Starts when 50% visible

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 2, ease: "easeOut" }); // Duration of the animation
    }
  }, [count, value, isInView]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

interface StatItem {
  id: number;
  label: string;
  numericValue: number; // Raw number for animation
  suffix?: string;       // e.g., '+'
  icon: React.ReactNode;
  iconBg: string;
}

const StatsSection: React.FC = () => {
  const stats: StatItem[] = [
    {
      id: 1,
      label: "Successful Adoptions",
      numericValue: 1200,
      suffix: "+",
      icon: <FaHeart className="text-xl text-rose-500" />,
      iconBg: "bg-rose-50 dark:bg-rose-950/20"
    },
    {
      id: 2,
      label: "Shelter Partners",
      numericValue: 45,
      suffix: "+",
      icon: <FaHome className="text-xl text-[#00A896]" />,
      iconBg: "bg-teal-50 dark:bg-teal-950/20"
    },
    {
      id: 3,
      label: "Active Volunteers",
      numericValue: 350,
      suffix: "+",
      icon: <FaUsers className="text-xl text-blue-500" />,
      iconBg: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      id: 4,
      label: "Years of Experience",
      numericValue: 5,
      suffix: "+",
      icon: <FaAward className="text-xl text-amber-500" />,
      iconBg: "bg-amber-50 dark:bg-amber-950/20"
    }
  ];

  // Animation Variants for Container (Header & Grid)
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.15 // Time between each child animating in
      }
    }
  };

  // Animation Variants for Individual Cards
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Container using InView */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Trigger animation once when 20% visible
          variants={containerVariants}
        >
          {/* Section Header with Animation */}
          <motion.div className="text-center max-w-3xl mx-auto mb-16" variants={itemVariants}>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Our Small Efforts, Big Milestones
            </h2>
            <p className="mt-4 text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Every adoption saves a life and changes a story. We believe every pet deserves a safe, loving, and comfortable home.
            </p>
          </motion.div>

          {/* Stats Grid with Animated Cards */}
          <motion.div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                variants={itemVariants} // Each card uses the same fade-in variants
                className="relative overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-8 shadow-sm transition-shadow duration-300 hover:shadow-md flex flex-col items-center text-center group"
                whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeInOut" }}} // Modern hover motion
              >
                {/* Icon Container with subtle animation on hover */}
                <div className={`p-4 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${stat.iconBg}`}>
                  {stat.icon}
                </div>
                
                {/* Large Bold Numbers with Count-up Animation */}
                <h4 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  <AnimatedNumber value={stat.numericValue} suffix={stat.suffix} />
                </h4>
                
                {/* Text Label */}
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-2 whitespace-nowrap">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default StatsSection;