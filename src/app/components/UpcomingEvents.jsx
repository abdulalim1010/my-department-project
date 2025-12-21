"use client";

import { useEffect, useState } from "react";
import { Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-center mb-14">
        Upcoming Events
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {events.map((event) => (
          <motion.div
            key={event._id}
            whileHover={{ y: -6 }}
            className="flex gap-6"
          >
            {/* Date */}
            <div className="w-28 h-28 border-2 rounded-xl flex flex-col items-center justify-center text-blue-700">
              <span className="text-3xl font-bold">
                {new Date(event.date).getDate()}
              </span>
              <span className="text-sm font-semibold">
                {new Date(event.date).toLocaleString("en-US", {
                  month: "long",
                })}
              </span>
            </div>

            {/* Info */}
            <div>
              <div className="flex gap-6 text-sm text-gray-500 mb-2">
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {event.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {event.location}
                </span>
              </div>

              <h3 className="font-bold text-lg mb-2">
                {event.title}
              </h3>

              <p className="text-gray-600 text-sm">
                {event.description}
              </p>

              <button className="mt-3 text-blue-700 font-semibold">
                View Details →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
