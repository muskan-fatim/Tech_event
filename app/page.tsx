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
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        fetch("/api/get-event")
            .then(res => res.json())
            .then(data => {
                setEvents(data.events || []);
                setLoading(false);
        });
    }, []);

    // Function to handle saving a new event
    const handleSaveEvent = (newEvent: any) => {
        setEvents([...events, newEvent]); // Add new event to the list
    };

    const filteredEvents = events?.filter((event) => 
        event["Event Name"]?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        event.Location?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (loading) return <Loader />; // Show loader until everything is ready

    return (
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-purple-950 dark:to-gray-900 transition-colors duration-500 min-h-screen">
  <Navbar />
  <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
  <Carousel />
  <EventGrid events={filteredEvents || []} />
  <EventForm onSave={handleSaveEvent} />
  <Footer />
</div>

    );
}
