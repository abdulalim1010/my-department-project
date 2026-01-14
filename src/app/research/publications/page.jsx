"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Users, FileText, Loader2 } from "lucide-react";

export default function PublicationsPage() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const res = await fetch("/api/research/publications", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch publications");
        const data = await res.json();
        setPublications(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch publications:", err);
        setPublications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPublications();
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full mb-6">
            <BookOpen className="text-white" size={40} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Research Publications
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our faculty's research contributions and academic publications
          </p>
        </motion.div>

        {/* Publications List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={48} />
          </div>
        ) : publications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <BookOpen className="text-gray-400 mx-auto mb-4" size={64} />
            <p className="text-xl text-gray-600">No publications available</p>
            <p className="text-gray-500 mt-2">Publications will appear here when added</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-6"
          >
            {publications.map((p) => (
              <motion.div
                key={p._id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <FileText className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {p.title}
                    </h2>
                    <div className="space-y-2">
                      {p.authors && (
                        <div className="flex items-start gap-2 text-sm text-gray-700">
                          <Users size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="font-medium">{p.authors}</span>
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        {p.journal && (
                          <div className="flex items-center gap-2">
                            <BookOpen size={16} className="text-indigo-600" />
                            <span className="italic">{p.journal}</span>
                          </div>
                        )}
                        {p.year && (
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-blue-600" />
                            <span>{p.year}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
