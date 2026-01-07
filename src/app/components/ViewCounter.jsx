"use client";

import { useEffect, useState } from "react";

export default function ViewCounter({ slug }) {
  const [views, setViews] = useState(null);

  useEffect(() => {
    if (!slug) return;

    // 1️⃣ Increment view
    fetch("/api/news/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });

    // 2️⃣ Fetch updated views
    fetch(`/api/news/${slug}/views`)
      .then(res => res.json())
      .then(data => setViews(data.views));
  }, [slug]);

  if (views === null) return null;

  return (
    <p className="mt-3 text-sm text-gray-500">
      👁 {views} views
    </p>
  );
}
