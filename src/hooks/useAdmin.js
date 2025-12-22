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
        router.push("/login");
        return;
      }

      const res = await fetch(
        `/api/admin/check?email=${user.email}`
      );
      const data = await res.json();

      if (!data.admin) {
        router.push("/unauthorized");
      } else {
        setIsAdmin(true);
      }

      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  return { isAdmin, loading };
}
