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
  isPastEvent?: boolean;
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
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-500 px-4 py-10 dark:bg-gray-900">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-wide mb-6 text-center drop-shadow-lg">
        Live Events
      </h1>

      <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-2xl w-full transition-all duration-700 ease-in-out">
        <h2 className="text-3xl font-extrabold mb-3 text-center text-gray-800 dark:text-white">
          {event["Event Name"]}
        </h2>
        <p className="text-blue-600 dark:text-blue-300 text-center text-lg font-medium mb-2">
          {event["Event Type"]} &bull; {event.Location}
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-center mb-1">
          {event["Event Date"]} at {event["Event Time"]}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-2">
          Organizer: {event["Organizer Name"]}
        </p>
        <p className="text-gray-500 dark:text-gray-300 text-center">{event.Address}</p>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {events.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === current
                ? "bg-white border border-blue-500"
                : "bg-gray-300 dark:bg-gray-600"
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
    return <p className="text-center text-gray-500 dark:text-gray-400">No events found.</p>;
  }

  const upcomingEvents = events.filter(event => !event.isPastEvent);
  const pastEvents = events.filter(event => event.isPastEvent);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900" id="event">
      {/* Upcoming Events Section */}
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Upcoming Tech Events
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {upcomingEvents.map((event, index) => (
          <div
            key={`upcoming-${index}`}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-900">
                  {event["Event Type"]}
                </span>
                <span className="bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900 px-3 py-1 rounded-full text-sm font-medium">
                  {event.Location}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{event["Event Name"]}</h2>
              <div className="text-gray-700 dark:text-gray-300 mb-1">
                <strong>Organizer:</strong> {event["Organizer Name"]}
              </div>
              <div className="text-gray-600 dark:text-gray-400 mb-1">
                {event["Event Date"]} at {event["Event Time"]}
              </div>
              <div className="text-gray-500 dark:text-gray-400">{event.Address}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Past Events Section */}
      {pastEvents.length > 0 && (
        <>
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
            Past Events
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <div
                key={`past-${index}`}
                className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden opacity-75"
              >
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-700 dark:bg-gray-300 dark:text-gray-900">
                      {event["Event Type"]}
                    </span>
                    <span className="bg-gray-200 text-gray-700 dark:bg-gray-300 dark:text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                      {event.Location}
                    </span>
                    <span className="bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900 px-3 py-1 rounded-full text-sm font-medium">
                      Past Event
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 text-gray-700 dark:text-white">
                    {event["Event Name"]}
                  </h2>
                  <div className="text-gray-600 dark:text-gray-300 mb-1">
                    <strong>Organizer:</strong> {event["Organizer Name"]}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 mb-1">
                    {event["Event Date"]} at {event["Event Time"]}
                  </div>
                  <div className="text-gray-400 dark:text-gray-500">{event.Address}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export { Carousel };
export default EventGrid;
