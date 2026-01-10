"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/app/components/firebase";

export default function useAdmin() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/auth");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/admin/check?email=${user.email}`);
        const text = await res.text();
        let userData;

        try {
          userData = JSON.parse(text);
        } catch {
          console.error("Invalid JSON:", text);
          router.push("/unauthorized");
          setLoading(false);
          return;
        }

        if (userData.role !== "admin") {
          router.push("/unauthorized");
        } else {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        router.push("/unauthorized");
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, [router]);

  return { isAdmin, loading };
}
