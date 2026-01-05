"use client";

import { useEffect, useState } from "react";

export default function ViewCounter({ slug }) {
  const [views, setViews] = useState(0);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/news/view?slug=${slug}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setViews(data.views))
      .catch(() => {});
  }, [slug]);

  return (
    <div className="mt-2 text-sm text-gray-500">
      👁 {views} views
    </div>
  );
}
