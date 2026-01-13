"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Bell,
  LogOut,
  BookOpen,
  FlaskConical,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/app/components/firebase";
import { useState } from "react";

const menu = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/admin/dashboard/users", icon: Users },
  { name: "Academic Files", href: "/admin/dashboard/academic", icon: BookOpen },

  // ✅ Research Section
  {
    name: "Research",
    icon: FlaskConical,
    submenu: [
      {
        name: "Research Areas",
        href: "/admin/dashboard/research/areas",
      },
      {
        name: "Publications",
        href: "/admin/dashboard/research/publications",
      },
      {
        name: "Projects",
        href: "/admin/dashboard/research/projects",
      },
    ],
  },

  { name: "Notices", href: "/admin/dashboard/notice", icon: Bell },
  { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white flex flex-col shadow-2xl">
      <div className="p-6 border-b border-blue-700">
        <h1 className="text-2xl font-bold mb-1">Admin Panel</h1>
        <p className="text-xs text-blue-200">Management Dashboard</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;

          // 🔹 Normal menu
          if (!item.submenu) {
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${
                    active
                      ? "bg-white text-blue-900 shadow-lg"
                      : "hover:bg-blue-700 hover:translate-x-1"
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          }

          // 🔹 Research menu with submenu
          const isOpen = openMenu === item.name;

          return (
            <div key={item.name}>
              <button
                onClick={() =>
                  setOpenMenu(isOpen ? null : item.name)
                }
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-700 transition-all"
              >
                <Icon size={20} />
                <span className="font-medium flex-1 text-left">
                  {item.name}
                </span>
              </button>

              {isOpen && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.submenu.map((sub) => {
                    const active = pathname === sub.href;

                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={`block px-3 py-2 rounded-md text-sm transition
                          ${
                            active
                              ? "bg-blue-600 text-white"
                              : "text-blue-200 hover:bg-blue-700"
                          }
                        `}
                      >
                        {sub.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-blue-700">
        <button
          onClick={() => signOut(auth)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition font-medium shadow-lg"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
