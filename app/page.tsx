'use client'
import { useEffect, useState } from "react";
import EventGrid, { Carousel } from "./components/event";
import EventForm from "./components/eventform";
import Navbar from "./components/navbar";
import Hero from "./components/Hero";
import Footer from "./components/footer";
import Loader from "../app/loader";

export default function Home() {
    const [events, setEvents] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        fetch("/api/get-event?past=true")
            .then(res => res.json())
            .then(data => {
                setEvents(data.events || []);
                setLoading(false);
        });
    }, []);

    const handleSaveEvent = (newEvent: any) => {
        setEvents([...events, newEvent]);
    };

    const filteredEvents = events?.filter((event) => 
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
