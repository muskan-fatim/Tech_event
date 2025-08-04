'use client'
import { useEffect, useState } from "react";

// Mock Components - Replace with your actual components
const Navbar = () => (
    <nav className="p-4 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Eventify</h1>
    </nav>
);
const Hero = ({ searchQuery, setSearchQuery }) => (
    <div className="p-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Find Your Next Event</h2>
        <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for events..."
            className="w-full max-w-md p-2 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
    </div>
);
const Carousel = () => (
    <div className="p-8 bg-gray-100 dark:bg-gray-700 m-4 rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Featured Events</h3>
        <p>This is a placeholder for your Carousel component.</p>
    </div>
);
const EventGrid = ({ events }) => (
    <div className="p-8">
        <h3 className="text-2xl font-semibold mb-4">Upcoming Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.length > 0 ? (
                events.map((event, index) => (
                    <div key={index} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <h4 className="text-lg font-bold">{event["Event Name"]}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{event.Location}</p>
                    </div>
                ))
            ) : (
                <p>No events found.</p>
            )}
        </div>
    </div>
);
const EventForm = ({ onSave }) => (
    <div className="p-8 bg-gray-100 dark:bg-gray-700 m-4 rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">Add a New Event</h3>
        <button
            onClick={() => onSave({ "Event Name": "New Test Event", Location: "Test Location" })}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
            Save Event
        </button>
    </div>
);
const Footer = () => (
    <footer className="p-4 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; 2025 Eventify. All rights reserved.</p>
    </footer>
);
const Loader = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
    </div>
);

export default function Home() {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Simulating API call
        setTimeout(() => {
            setEvents([
                { "Event Name": "Music Festival", "Location": "Central Park" },
                { "Event Name": "Tech Conference", "Location": "Convention Center" },
            ]);
            setLoading(false);
        }, 1500);
    }, []);

    const handleSaveEvent = (newEvent) => {
        setEvents([...events, newEvent]);
    };

    const filteredEvents = events.filter((event) =>
        event["Event Name"]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.Location?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <Loader />;

    return (
        <div className={`${darkMode ? 'dark' : ''}`}>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white transition-all duration-500">
                <Navbar />
                <div className="flex justify-end px-6 pt-4">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-md shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                        Toggle {darkMode ? "Light" : "Dark"} Mode
                    </button>
                </div>
                <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <Carousel />
                <EventGrid events={filteredEvents || []} />
                <EventForm onSave={handleSaveEvent} />
                <Footer />
            </div>
        </div>
    );
}
