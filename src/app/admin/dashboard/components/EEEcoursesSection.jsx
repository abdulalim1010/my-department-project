"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const courses = [
  {
    title: "Electrical Circuits & Machines",
    image: "/electric.avif",
    short:
      "Fundamental and advanced concepts of electrical circuits and machines.",
    details: [
      "DC & AC Circuit Analysis",
      "Transformers",
      "Electrical Machines",
      "Power System Fundamentals",
      "Lab & Practical Work",
    ],
  },
  {
    title: "Machine Learning & Control Systems",
    image: "/machine.jpg",
    short:
      "Modern control theory and intelligent systems using machine learning.",
    details: [
      "Feedback Control System",
      "PID & State Space",
      "Neural Networks",
      "Machine Learning Algorithms",
      "Industrial Automation",
    ],
  },
  {
    title: "Networking, Quantum & Programming",
    image: "/network.jfif",
    short:
      "Networking, quantum mechanics and programming for engineers.",
    details: [
      "Computer Networking",
      "Quantum Mechanics Basics",
      "Embedded Systems",
      "C / Python Programming",
      "IoT Fundamentals",
    ],
  },
];

export default function EEEcoursesSection() {
  const [activeCourse, setActiveCourse] = useState(null);

  return (
    <section className="w-full bg-white py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* UNIVERSITY HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-700 tracking-wide">
            Begum Rokeya University, Rangpur
          </h1>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
            Department of Electrical & Electronic Engineering
          </h2>

          <p className="mt-6 text-gray-600 leading-8 text-[17px]">
            The department offers a balanced curriculum combining electrical
            engineering fundamentals, modern technologies and research-oriented
            learning.
          </p>
        </motion.div>

        {/* COURSES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {courses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="border border-gray-200 bg-white"
            >
              {/* IMAGE */}
              <div className="h-[230px] overflow-hidden rounded-t-md">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className="p-7">
                <h3 className="text-xl font-semibold text-gray-800">
                  {course.title}
                </h3>

                <p className="mt-4 text-gray-600 text-[15px] leading-7">
                  {course.short}
                </p>

                <button
                  onClick={() => setActiveCourse(course)}
                  className="mt-6 inline-block text-blue-700 font-semibold tracking-wide hover:underline"
                >
                  READ MORE →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85 }}
              transition={{ duration: 0.4 }}
              className="bg-white max-w-xl w-full p-10 relative"
            >
              <button
                onClick={() => setActiveCourse(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
              >
                ✕
              </button>

              <h3 className="text-2xl font-bold text-blue-900">
                {activeCourse.title}
              </h3>

              <ul className="mt-6 list-disc ml-6 space-y-3 text-gray-700 text-[16px] leading-7">
                {activeCourse.details.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
