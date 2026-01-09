"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Bell,
  LogOut
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/app/components/firebase";


const menu = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/admin/dashboard/users", icon: Users },
  { name: "Articles", href: "/admin/dashboard/articles", icon: FileText },
  { name: "Notice", href: "/admin/dashboard/notice", icon: Bell },
  { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },
  { name: "Academic Files", href: "/admin/dashboard/academic", icon: FileText }

];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-blue-800 text-white flex flex-col">
      <div className="p-6 text-xl font-bold border-b border-blue-700">
        Admin Panel
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
                ${active ? "bg-blue-600" : "hover:bg-blue-700"}
              `}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => signOut(auth)}
        className="m-4 flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
