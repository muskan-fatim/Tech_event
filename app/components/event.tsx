"use client";
import React, { useEffect, useState } from "react";

interface Event {
  "Event Name": string;
  Location: string;
  Address: string;
  "Organizer Name": string;
  "Event Date": string;
  "Event Time": string;
  "Event Type": string;
}

// Carousel component for live events
const Carousel: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("/api/get-event?live=true")
      .then((res) => res.json())
      .then((data) => setEvents(data.events || []));
  }, []);

  useEffect(() => {
    if (events.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % events.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [events]);

  if (events.length === 0)
    return (
      <div className="text-center h-96 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-2xl shadow-md">
        Loading live events...
      </div>
    );

  const event = events[current];

  return (
    
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 px-4 py-10">
  <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-wide mb-6 text-center drop-shadow-lg">
    Live Events
  </h1>

  <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-2xl w-full border border-purple-500/30 transition-all duration-700 ease-in-out">
    <h2 className="text-3xl font-extrabold mb-3 text-center text-white">
      {event["Event Name"]}
    </h2>
    <p className="text-purple-200 text-center text-lg font-medium mb-2">
      {event["Event Type"]} &bull; {event.Location}
    </p>
    <p className="text-gray-200 text-center mb-1">
      {event["Event Date"]} at {event["Event Time"]}
    </p>
    <p className="text-indigo-200 text-center mb-2">
      Organizer: {event["Organizer Name"]}
    </p>
    <p className="text-gray-300 text-center">{event.Address}</p>
  </div>

  <div className="flex justify-center mt-6 space-x-2">
    {events.map((_, idx) => (
      <button
        key={idx}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          idx === current
            ? "bg-purple-400 border border-white shadow"
            : "bg-gray-500 hover:bg-purple-600"
        }`}
        onClick={() => setCurrent(idx)}
        aria-label={`Go to event ${idx + 1}`}
      />
    ))}
  </div>
</div>

  );
};

// EventGrid for regular events
interface EventGridProps {
  events: Event[];
}

const EventGrid: React.FC<EventGridProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return <p className="text-center text-gray-500">No events found.</p>;
  }
  return (
    <div className="p-6 bg-gray-50 dark:bg-gradient-to-br dark:from-indigo-950 dark:via-purple-950 dark:to-indigo-900" id="event">
  <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white dark:drop-shadow-md">
    Upcoming Tech Events
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {events.map((event, index) => (
      <div
        key={index}
        className="bg-white dark:bg-white/10 dark:backdrop-blur-xl 
                   rounded-2xl shadow-md dark:shadow-xl 
                   hover:shadow-xl transition-shadow duration-300 
                   overflow-hidden border border-transparent 
                   dark:border-purple-500/20"
      >
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-sm font-medium 
                             bg-blue-100 text-blue-800 
                             dark:bg-purple-200/20 dark:text-purple-100 dark:border dark:border-purple-400/30">
              {event["Event Type"]}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium 
                             bg-green-100 text-green-800 
                             dark:bg-blue-200/20 dark:text-blue-100 dark:border dark:border-blue-400/30">
              {event.Location}
            </span>
          </div>
          <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
            {event["Event Name"]}
          </h2>
          <div className="text-gray-700 dark:text-purple-200 mb-1">
            <strong>Organizer:</strong> {event["Organizer Name"]}
          </div>
          <div className="text-gray-600 dark:text-indigo-300 mb-1">
            {event["Event Date"]} at {event["Event Time"]}
          </div>
          <div className="text-gray-500 dark:text-gray-300">
            {event.Address}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export { Carousel };
export default EventGrid;
