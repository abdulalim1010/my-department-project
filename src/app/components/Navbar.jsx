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
  Mail,
} from "lucide-react";

import logoimage from "../../../src/assets/logoo.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [hoverMenu, setHoverMenu] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  /* ================= AUTH ================= */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const res = await fetch("/api/users/me", {
            headers: { email: currentUser.email },
          });
          const data = await res.json();
          setRole(data.role || "user");
        } catch {
          setRole("user");
        }
      } else {
        setUser(null);
        setRole(null);
      }
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
  };

  /* ================= HIDE ON SCROLL ================= */
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScroll && current > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScroll(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  /* ================= NAV LINKS ================= */
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
      submenu: [{ label: "Faculty Members", href: "/teachers" }],
    },
    {
      name: "Notice",
      icon: BookOpen,
      submenu: [{ label: "Notices", href: "/notice" }],
    },
  ];

  return (
    <>
      {/* ================= TOP BAR ================= */}
      <motion.div
        animate={{ y: showHeader ? 0 : -60 }}
        className="fixed top-0 left-0 w-full bg-slate-900 text-white z-50"
      >
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row gap-2 sm:justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Mail size={14} /> brureee@department.edu
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {role === "admin" && (
              <Link
                href="/admin/dashboard"
                className="px-2 py-1 bg-yellow-400 text-black rounded"
              >
                Admin
              </Link>
            )}

            {user ? (
              <>
                <span className="hidden sm:block">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-2 py-1 bg-red-600 rounded"
                >
                  <LogOut size={12} /> Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="px-2 py-1 bg-green-600 rounded"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </motion.div>

      {/* ================= MAIN NAV ================= */}
      <motion.header
        animate={{ y: showHeader ? 0 : -80 }}
        className="fixed top-[48px] left-0 w-full bg-blue-700 z-40"
      >
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src={logoimage} alt="Logo" width={36} height={36} />
            <span className="text-lg font-bold text-white">
              My Department
            </span>
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <ul className="hidden md:flex gap-8 text-white relative">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;

              return (
                <li
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setHoverMenu(link.name)}
                  onMouseLeave={() => setHoverMenu(null)}
                >
                  {!link.submenu ? (
                    <Link href={link.href} className="flex gap-2 items-center">
                      <Icon size={18} />
                      {link.name}
                      {active && (
                        <motion.span
                          layoutId="underline"
                          className="absolute -bottom-2 left-0 h-[2px] w-full bg-yellow-300"
                        />
                      )}
                    </Link>
                  ) : (
                    <span className="flex gap-2 items-center cursor-pointer">
                      <Icon size={18} />
                      {link.name}
                    </span>
                  )}

                  {link.submenu && hoverMenu === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 mt-4 w-60 bg-white rounded shadow p-3"
                    >
                      {link.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-3 py-2 hover:bg-blue-100 rounded"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </li>
              );
            })}

            <Link href="/contact" className="flex gap-2 items-center">
              <Phone size={18} /> Contact
            </Link>
          </ul>

          {/* ================= MOBILE BUTTON ================= */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* ================= MOBILE MENU ================= */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "calc(100vh - 120px)" }}
              exit={{ height: 0 }}
              className="md:hidden bg-white overflow-y-auto"
            >
              <ul className="px-6 py-4 space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    {!link.submenu ? (
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block ${
                          pathname === link.href
                            ? "text-blue-600 font-semibold"
                            : ""
                        }`}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <>
                        <div
                          className="flex justify-between cursor-pointer"
                          onClick={() =>
                            setExpandedMenu(
                              expandedMenu === link.name ? null : link.name
                            )
                          }
                        >
                          {link.name}
                          <span>{expandedMenu === link.name ? "−" : "+"}</span>
                        </div>

                        {expandedMenu === link.name && (
                          <div className="pl-4 mt-2 space-y-2">
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
                          </div>
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* SPACER */}
      <div className="h-[140px]" />
    </>
  );
}
