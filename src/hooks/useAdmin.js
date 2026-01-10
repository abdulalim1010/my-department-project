"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/app/components/firebase";

export default function useAdmin() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // Only redirect if we're on an admin page
        if (pathname?.startsWith("/admin")) {
          router.push("/auth");
        }
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/admin/check?email=${user.email}`, {
          cache: "no-store",
        });
        
        if (!res.ok) {
          throw new Error("Failed to check admin status");
        }
        
        const userData = await res.json();

        if (userData.role !== "admin") {
          // Only redirect if we're on an admin page
          if (pathname?.startsWith("/admin")) {
            router.push("/unauthorized");
          }
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        // Only redirect if we're on an admin page
        if (pathname?.startsWith("/admin")) {
          router.push("/unauthorized");
        }
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, [router, pathname]);

  return { isAdmin, loading };
}
