"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import bannerImage from "../../assets/hero.jpg";

export default function Banner() {
  return (
    <section className="relative w-full py-28 overflow-hidden">
      {/* ===== GIANT GOLDEN EEE TEXT ===== */}
      <motion.div
        initial={{ x: -300, y: -200, opacity: 0 }}
        animate={{ x: 200, y: 100, opacity: 0.08 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute top-0 left-0 pointer-events-none select-none"
      >
        <h1
          className="text-[140px] md:text-[220px] lg:text-[300px]
                     font-extrabold tracking-widest
                     text-transparent bg-clip-text
                     bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600
                     rotate-[-12deg]"
        >
          EEE
        </h1>
      </motion.div>

     {/* ===== ANIMATED VOLTAGE WAVE LINE ===== */}
<motion.svg
  suppressHydrationWarning
  viewBox="0 0 1200 200"
  className="absolute top-32 left-0 w-full h-40"
  fill="none"
>
  <motion.path
    d="M0 100 
       Q 100 20 200 100 
       T 400 100 
       T 600 100 
       T 800 100 
       T 1000 100 
       T 1200 100"
    stroke="#2563eb"
    strokeWidth="3"
    strokeLinecap="round"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 0.6 }}
    transition={{ duration: 2.5, ease: "easeInOut" }}
  />

  {/* Moving voltage dot */}
  <motion.circle
    r="6"
    fill="#facc15"
    initial={{ cx: 0, cy: 100 }}
    animate={{ cx: [0, 1200] }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "linear",
    }}
  />
</motion.svg>


      {/* ===== MAIN CONTENT ===== */}
      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 gap-12">
        {/* ===== LEFT TEXT ===== */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="flex-1 space-y-6"
        >
          {/* Welcome */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-sm md:text-base font-semibold tracking-widest uppercase text-yellow-600"
          >
            ✦ Welcome to EEE ✦
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold leading-tight text-gray-900"
          >
            Department of{" "}
            <span className="text-blue-700">
              Electrical & Electronic
            </span>
            <br />
            Engineering
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-gray-600 text-lg md:w-3/4"
          >
            Shaping future engineers through excellence in electrical systems,
            electronics, power engineering, communication technology, and
            research-driven education.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex gap-4"
          >
            <button className="px-7 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-lg font-semibold transition-all shadow-md">
              Explore Academic
            </button>

            <button className="px-7 py-3 border border-blue-700 text-blue-700
                               hover:bg-blue-700 hover:text-white rounded-xl
                               text-lg font-semibold transition-all">
              View Notice
            </button>
          </motion.div>
        </motion.div>

        {/* ===== RIGHT IMAGE ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
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
