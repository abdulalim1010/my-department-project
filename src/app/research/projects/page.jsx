"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FlaskConical, CheckCircle, Clock, Loader2, Sparkles } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/research/projects", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mb-6">
            <FlaskConical className="text-white" size={40} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Research Projects
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover ongoing and completed research initiatives by our faculty
          </p>
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-purple-600" size={48} />
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FlaskConical className="text-gray-400 mx-auto mb-4" size={64} />
            <p className="text-xl text-gray-600">No projects available</p>
            <p className="text-gray-500 mt-2">Projects will appear here when added</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((p) => {
              const isCompleted = p.status === "Completed";
              return (
                <motion.div
                  key={p._id}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 relative overflow-hidden"
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        isCompleted
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle size={14} />
                      ) : (
                        <Clock size={14} />
                      )}
                      {p.status}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${
                    isCompleted
                      ? "bg-gradient-to-br from-green-500 to-emerald-500"
                      : "bg-gradient-to-br from-yellow-500 to-orange-500"
                  }`}>
                    <FlaskConical className="text-white" size={32} />
                  </div>

                  {/* Content */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 pr-16">
                    {p.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                    {p.description || "No description provided."}
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
