"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import bannerImage from "../../assets/hero.jpg";

export default function Banner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <section className="relative w-full py-28 overflow-hidden">
      {/* ===== GIANT EEE TEXT ===== */}
      <motion.div
        initial={{ x: -300, y: -200, opacity: 0 }}
        animate={{ x: 200, y: 100, opacity: 0.08 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute top-0 left-0 pointer-events-none select-none"
      >
        <h1 className="text-[140px] md:text-[220px] lg:text-[300px] font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 rotate-[-12deg]">
          EEE
        </h1>
      </motion.div>

      {/* ===== VOLTAGE WAVE ===== */}
      <svg
        viewBox="0 0 1200 200"
        className="absolute top-32 left-0 w-full h-40"
        fill="none"
        suppressHydrationWarning
      >
        <motion.path
          d="M0 100 Q 100 20 200 100 T 400 100 T 600 100 T 800 100 T 1000 100 T 1200 100"
          stroke="#2563eb"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />

        <motion.circle
          cx="0"
          cy="100"
          r="6"
          fill="#facc15"
          animate={{ cx: [0, 1200] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* ===== CONTENT ===== */}
      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="flex-1 space-y-6"
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-yellow-600">
            ✦ Welcome to EEE ✦
          </p>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
            Department of{" "}
            <span className="text-blue-700">Electrical & Electronic</span>
            <br />
            Engineering
          </h2>

          <p className="text-gray-600 text-lg md:w-3/4">
            Shaping future engineers through excellence in electrical systems,
            electronics, power engineering, and research-driven education.
          </p>

          <div className="flex gap-4">
            <button className="px-7 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-semibold shadow-md">
              Explore Academic
            </button>
            <button className="px-7 py-3 border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white rounded-xl font-semibold">
              View Notice
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 flex justify-center"
        >
          <motion.div animate={{ y: [0, -14, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
            <Image
              src={bannerImage}
              alt="EEE Department"
              width={520}
              height={520}
              className="rounded-3xl shadow-xl"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
