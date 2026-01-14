"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Target, Loader2, Sparkles } from "lucide-react";

export default function ResearchAreasPage() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const res = await fetch("/api/research/areas", { cache: "no-store" });
        const data = await res.json();
        setAreas(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch areas:", err);
        setAreas([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAreas();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const colors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-blue-500",
    "from-teal-500 to-cyan-500",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full mb-6">
            <Target className="text-white" size={40} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Research Areas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our diverse research domains and cutting-edge investigations
          </p>
        </motion.div>

        {/* Areas Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-indigo-600" size={48} />
          </div>
        ) : areas.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Target className="text-gray-400 mx-auto mb-4" size={64} />
            <p className="text-xl text-gray-600">No research areas available</p>
            <p className="text-gray-500 mt-2">Research areas will appear here when added</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {areas.map((a, index) => {
              const colorClass = colors[index % colors.length];
              return (
                <motion.div
                  key={a._id}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 relative overflow-hidden group"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center mb-4`}>
                    <Target className="text-white" size={32} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {a.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
