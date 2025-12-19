"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  BookOpen,
  Users,
  FlaskConical,
  Phone,
  Library,
  GraduationCap,
  LogOut,
} from "lucide-react";

import logoimage from "../../../src/assets/logoo.png";


import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoverMenu, setHoverMenu] = useState(null);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  /* ===== Sticky scroll effect ===== */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ===== Firebase Auth Listener ===== */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || currentUser.email,
          photo: currentUser.photoURL,
          email: currentUser.email,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    alert("Logged out successfully");
  };

  const navLinks = [
    { name: "Home", icon: Home, href: "/" },
    {
      name: "Academic",
      icon: Library,
      submenu: [
        { label: "Class Notes", href: "/academic/class-notes" },
        { label: "Books", href: "/academic/books" },
        { label: "Exam Routine", href: "/academic/exam-routine" },
      ],
    },
    {
      name: "Research",
      icon: FlaskConical,
      submenu: [
        { label: "Research Areas", href: "/research/areas" },
        { label: "Publications", href: "/research/publications" },
        { label: "Projects", href: "/research/projects" },
      ],
    },
    {
      name: "Students",
      icon: Users,
      submenu: [
        { label: "Student List", href: "/students" },
        { label: "Results", href: "/students/results" },
      ],
    },
    {
      name: "Teachers",
      icon: GraduationCap,
      submenu: [
        { label: "Faculty Members", href: "/teachers" },
      ],
    },
    {
      name: "Notice",
      icon: BookOpen,
      submenu: [
        { label: "General Notices", href: "/notice" },
        { label: "Exam Notices", href: "/notice/exam" },
      ],
    },
    { name: "Contact", icon: Phone, href: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled ? "bg-blue-800 shadow-2xl py-2" : "bg-blue-700 py-4"}`}
    >
      <nav className="max-w-7xl mx-auto px-2 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image src={logoimage} alt="Logo" width={40} height={40} />
          <span className="text-xl font-bold text-white">My Department</span>
        </Link>

        {/* ===== DESKTOP MENU ===== */}
        <ul className="hidden md:flex items-center gap-8 text-white font-medium">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.href && pathname === link.href;

            return (
              <li
                key={link.name}
                className="relative"
                onMouseEnter={() => setHoverMenu(link.name)}
                onMouseLeave={() => setHoverMenu(null)}
              >
                {!link.submenu ? (
                  <Link
                    href={link.href}
                    className={`flex items-center gap-2 transition
                      ${isActive ? "text-yellow-300" : "hover:text-blue-300"}`}
                  >
                    <Icon size={18} />
                    {link.name}
                  </Link>
                ) : (
                  <button
                    className="flex items-center gap-2 hover:text-blue-300 focus:outline-none"
                    aria-haspopup="true"
                  >
                    <Icon size={18} />
                    {link.name}
                  </button>
                )}

                {/* Submenu */}
                <AnimatePresence>
                  {link.submenu && hoverMenu === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25 }}
                      className="absolute left-0 mt-4 w-64 bg-white rounded-xl shadow-xl p-4 grid gap-2"
                    >
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="px-4 py-2 rounded-lg hover:bg-blue-100 text-gray-700 transition"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}

          {/* ===== USER INFO ===== */}
          {user ? (
            <li className="flex items-center gap-3">
              {user.photo && (
                <Image
                  src={user.photo}
                  alt={user.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span>{user.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                <LogOut size={16} /> Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                href="/auth"
                className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Sign In
              </Link>
            </li>
          )}
        </ul>

        {/* ===== MOBILE BUTTON ===== */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* ===== MOBILE MENU ===== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden bg-white overflow-hidden"
          >
            <ul className="px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {!link.submenu ? (
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block font-medium"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <>
                      <div
                        className="flex justify-between items-center cursor-pointer font-medium"
                        onClick={() =>
                          setExpandedMenu(
                            expandedMenu === link.name ? null : link.name
                          )
                        }
                      >
                        {link.name}
                        <span>{expandedMenu === link.name ? "−" : "+"}</span>
                      </div>

                      <AnimatePresence>
                        {expandedMenu === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 mt-2 space-y-2"
                          >
                            {link.submenu.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setMobileOpen(false)}
                                className="block text-gray-600"
                              >
                                • {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </li>
              ))}

              {/* Mobile Auth */}
              <li>
                {user ? (
                  <div className="flex items-center gap-2">
                    {user.photo && (
                      <Image
                        src={user.photo}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    )}
                    <span>{user.name}</span>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/auth"
                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Sign In
                  </Link>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
