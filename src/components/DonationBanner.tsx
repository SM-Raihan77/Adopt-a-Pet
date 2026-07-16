"use client";

import Image from "next/image";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function DonationBanner() {
  const router = useRouter();

  return (
    <section className="bg-gradient-to-br from-slate-50 via-purple-50 to-cyan-50 py-12 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-xl">

          {/* Background Decorations */}
          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-cyan-200/30 blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-purple-200/30 blur-3xl"></div>

          <div className="relative flex flex-col items-center justify-between gap-8 p-8 md:flex-row md:p-10">

            {/* Left Side */}
            <div className="flex items-center gap-6">

              {/* Dog Image */}
              <div className="relative hidden h-44 w-44 overflow-hidden rounded-full border-8 border-white shadow-2xl md:block">
                <Image
                  src="/assets/Banner.jpg"
                  alt="Happy Dog"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Text */}
              <div>
                <span className="inline-block rounded-full bg-purple-100 px-4 py-1 text-sm font-semibold text-purple-700">
                  ❤️ Save a Life
                </span>

                <h2 className="mt-4 text-3xl font-extrabold text-purple-700 md:text-5xl">
                  Shelters are full!
                </h2>

                <p className="mt-2 text-xl font-bold text-slate-800">
                  Help pets get out.
                </p>

                <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600 md:text-base">
                  Every donation helps provide rescued pets with food,
                  shelter, medical treatment, and a loving chance to
                  find their forever home.
                </p>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col items-center gap-4">

              <Button
                size="lg"
                onClick={() => router.push("/support")}
                className="rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 px-10 py-7 text-lg font-bold uppercase tracking-wider text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-cyan-600 hover:to-sky-600"
              >
                Donate Now
              </Button>

              <p className="text-center text-sm text-slate-500">
                Every contribution makes a difference 🐾
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}