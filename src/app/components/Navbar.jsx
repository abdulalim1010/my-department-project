"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap, Home, BookOpen, Users, FlaskConical, Phone } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", icon: <Home size={18} />, href: "/" },
    { name: "About", icon: <Users size={18} />, href: "/about" },
    { name: "Faculty", icon: <GraduationCap size={18} />, href: "/faculty" },
    { name: "Courses", icon: <BookOpen size={18} />, href: "/courses" },
    { name: "Research", icon: <FlaskConical size={18} />, href: "/research" },
    { name: "Contact", icon: <Phone size={18} />, href: "/contact" },
  ];

  return (
    <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="fixed top-0 left-0 w-full bg-blue-700 shadow-xl z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <GraduationCap size={30} className="text-blue-600" />
          <h1 className="text-xl font-bold text-white tracking-wide">
            My Department
          </h1>
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-white">
          {navLinks.map((link) => (
            <motion.li
              whileHover={{ scale: 1.1 }}
              key={link.name}
            >
              <a
                href={link.href}
                className="flex items-center gap-1 hover:text-blue-600 transition"
              >
                {link.icon}
                {link.name}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4 text-gray-800"
          >
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="flex items-center gap-2 py-2 text-lg hover:text-blue-600 transition"
                  onClick={() => setOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
