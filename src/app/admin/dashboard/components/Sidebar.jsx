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
  BookOpen
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/app/components/firebase";

const menu = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/admin/dashboard/users", icon: Users },
  { name: "Academic Files", href: "/admin/dashboard/academic", icon: BookOpen },
  { name: "Notices", href: "/admin/dashboard/notice", icon: Bell },
  { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white flex flex-col shadow-2xl">
      <div className="p-6 border-b border-blue-700">
        <h1 className="text-2xl font-bold mb-1">Admin Panel</h1>
        <p className="text-xs text-blue-200">Management Dashboard</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${
                  active
                    ? "bg-white text-blue-900 shadow-lg"
                    : "hover:bg-blue-700 hover:translate-x-1"
                }
              `}
            >
              <Icon size={20} className={active ? "text-blue-600" : ""} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-blue-700">
        <button
          onClick={() => signOut(auth)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
