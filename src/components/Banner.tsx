"use client";

import React from "react"; // React ইম্পোর্ট করা হলো টাইপ ব্যবহারের জন্য
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Button } from "@heroui/react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// ১. কম্পোনেন্টের টাইপ React.FC (Function Component) হিসেবে ডিফাইন করা হয়েছে
const Banner: React.FC = () => {
  // টাইপস্ক্রিপ্ট নিজে থেকেই ধরে নিয়েছে এটি একটি string[] (অ্যারে অফ স্ট্রিং)
  const bannerImages: string[] = [
    "/assets/Banner.png",
    "/assets/Banner-2.jpg",
    "/assets/Banner-3.jpg",
  ];

  return (
    <div className="max-w-7xl mx-auto w-full bg-slate-50/80 rounded-2xl shadow-md overflow-hidden mt-6 p-6 md:p-12 border border-slate-200/60">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Left Side: Text Content */}
        <div className="text-center md:text-left order-2 md:order-1">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-800 leading-tight"
          >
            Easy Healthcare Access At Your Fingertips
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl mb-8 text-gray-600 max-w-xl mx-auto md:mx-0"
          >
            Connect with thousands of certified specialists instantly. Schedule your visit, skip the waiting room, and live a healthier life.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
          >
            <Link href="/signup" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-[#026A6E] hover:bg-[#00bfa3] text-[#1E2939] font-bold px-8 py-6 rounded-xl shadow-lg shadow-cyan-500/10 transition-all duration-300 transform hover:-translate-y-0.5">
                Find a Doctor
              </Button>
            </Link>

            <Link href="/pricing" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-[#1E2939] hover:bg-[#2d3d54] text-white font-semibold px-8 py-6 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                View Services
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Swiper Slider */}
        <div className="w-full flex justify-center md:justify-end order-1 md:order-2">
          <div className="w-full max-w-[500px] h-[300px] md:h-[400px] overflow-hidden rounded-xl shadow-md">
            <Swiper
              modules={[Autoplay, Pagination, EffectFade]}
              effect={"fade"}
              loop={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              className="w-full h-full"
            >
              {/* ২. ম্যাপ ফাংশনের ভেতর src (string) এবং index (number) টাইপ নির্দিষ্ট করা হলো */}
              {bannerImages.map((src: string, index: number) => (
                <SwiperSlide key={index} className="relative w-full h-full">
                  <Image
                    src={src}
                    alt={`Banner Image ${index + 1}`}
                    fill
                    className="object-cover rounded-xl"
                    priority={index === 0}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Banner;