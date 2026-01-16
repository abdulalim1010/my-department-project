"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDE_DURATION = 8000;

const slides = [
  {
    image: "/banner/banner1.jpg",
    subtitle: "Department of Electrical & Electronic Engineering",
    title: "BEGUM ROKEYA UNIVERSITY, RANGPUR",
    description:
      "Empowering future engineers with strong foundations in electrical systems, electronics, and innovation.",
  },
  {
    image: "/banner/banner2.jpg",
    subtitle: "Modern Laboratories & Facilities",
    title: "Practical & Industry Focused Learning",
    description:
      "Advanced labs, real-world experiments, and hands-on engineering education.",
  },
  {
    image: "/banner/banner3.jpg",
    subtitle: "Research & Innovation",
    title: "Research Driven Excellence",
    description:
      "Encouraging innovation, publications, and cutting-edge research culture.",
  },
  {
    image: "/banner/banner4.jpg",
    subtitle: "Career & Leadership",
    title: "Shaping Professional Engineers",
    description:
      "Developing leadership, technical expertise, and global career opportunities.",
  },
  {
    image: "/banner/banner5.jpg",
    subtitle: "Students • Faculty • Alumni",
    title: "A Strong Academic Community",
    description:
      "A collaborative environment fostering growth, ethics, and excellence.",
  },
];

export default function Banner() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (paused) return;

    timerRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearTimeout(timerRef.current);
  }, [index, paused]);

  return (
    <section
      className="relative h-[100vh] w-full overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ===== PROGRESS BAR ===== */}
      <motion.div
        key={index}
        initial={{ width: "0%" }}
        animate={{ width: paused ? "100%" : "100%" }}
        transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
        className="absolute top-0 left-0 h-[3px] bg-yellow-400 z-30"
      />

      {/* ===== BACKGROUND SLIDER ===== */}
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.12 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          style={{
            backgroundImage: `url(${slides[index].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </motion.div>
      </AnimatePresence>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${index}`}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center max-w-5xl text-white space-y-6"
          >
            <p className="uppercase tracking-[0.3em] text-yellow-400 font-semibold text-sm md:text-base">
              {slides[index].subtitle}
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              {slides[index].title}
            </h1>

            <p className="text-gray-200 text-base md:text-lg max-w-3xl mx-auto">
              {slides[index].description}
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-8">
              <a
                href="/academic"
                className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold shadow-xl"
              >
                Explore Academic
              </a>
              <a
                href="/notice"
                className="px-8 py-3 rounded-xl border border-white hover:bg-white hover:text-black transition font-semibold"
              >
                View Notices
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ===== SCROLL DOWN INDICATOR ===== */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm tracking-widest opacity-80"
      >
        SCROLL ↓
      </motion.div>

      {/* ===== DOTS ===== */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              i === index
                ? "bg-yellow-400 scale-125"
                : "bg-white/40 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
