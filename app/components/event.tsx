'use client'
import React, { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, User, Star, ArrowRight, Sparkles, Play, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch?: () => void;
  onTagClick?: (tag: string) => void;
}

// Redesigned Search Bar Component with Red/Black Theme
const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, onSearch, onTagClick }) => {
  const [focusedInput, setFocusedInput] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSearch = () => {
    if (onSearch) {
      onSearch();
    }
  };

  const tags = ['Workshops', 'Tech Events', 'Music', 'Art & Culture', 'Sports', 'Networking'];

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto mb-8"
    >
      <motion.div 
        className="relative group"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Search Input Container */}
        <motion.div 
          className={`relative transform transition-all duration-300 ${focusedInput ? 'scale-105' : 'scale-100'}`}
          animate={{ boxShadow: focusedInput ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" : "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-red-700 to-slate-800 rounded-2xl blur-sm opacity-20 group-hover:opacity-30 transition-opacity duration-300"
            animate={{ scale: focusedInput ? 1.1 : 1 }}
          />
          <div className="relative bg-white rounded-2xl border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center px-4 py-3">
              <motion.div
                animate={{ rotate: focusedInput ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Search className={`w-5 h-5 transition-colors duration-300 mr-3 ${focusedInput ? 'text-red-700' : 'text-gray-400'}`} />
              </motion.div>
              <input
                type="text"
                placeholder="Search events by city, name, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setFocusedInput(true)}
                onBlur={() => setFocusedInput(false)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 text-base text-gray-800 placeholder-gray-500 bg-transparent focus:outline-none font-medium"
              />
              <motion.button
                onClick={handleSearch}
                className="ml-3 bg-gradient-to-r from-red-800 to-slate-900 text-white px-6 py-2 rounded-lg font-semibold hover:from-red-900 hover:to-slate-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Search
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Filter Tags */}
      <motion.div 
        className="flex flex-wrap justify-center gap-2 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {tags.map((tag, index) => (
          <motion.button
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (onTagClick) {
                onTagClick(tag.toLowerCase());
              }
            }}
            className={`px-4 py-1.5 rounded-full bg-white border-2 border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700 transition-all duration-200 text-xs font-medium shadow-sm hover:shadow-md`}
          >
            {tag}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

// Redesigned Carousel component with Red/Black Theme
const Carousel: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Sample data for demo
    const sampleEvents: Event[] = [
      {
        "Event Name": "Advanced React Workshop",
        Location: "Mumbai",
        Address: "Tech Hub, Bandra Kurla Complex",
        "Organizer Name": "React India",
        "Event Date": "2025-08-15",
        "Event Time": "10:00 AM",
        "Event Type": "Workshop"
      },
      {
        "Event Name": "AI/ML Conference 2025",
        Location: "Bangalore",
        Address: "Convention Center, Electronic City",
        "Organizer Name": "Tech Innovators",
        "Event Date": "2025-08-20",
        "Event Time": "09:00 AM",
        "Event Type": "Conference"
      },
      {
        "Event Name": "Startup Networking Meetup",
        Location: "Delhi",
        Address: "Innovation Hub, Connaught Place",
        "Organizer Name": "Startup Delhi",
        "Event Date": "2025-08-25",
        "Event Time": "06:00 PM",
        "Event Type": "Meetup"
      }
    ];
    setEvents(sampleEvents);
  }, []);

  useEffect(() => {
    if (events.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % events.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [events]);

  if (events.length === 0)
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="w-16 h-16 border-4 border-red-400 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-600 text-xl font-medium">Loading live events...</p>
        </motion.div>
      </div>
    );

  const event = events[current];

  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden" id="home">
      {/* Subtle Background Elements */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-30"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 bg-gray-100 rounded-full blur-3xl opacity-30"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-20"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 360]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-flex items-center px-6 py-3 bg-white border-2 border-red-200 rounded-full shadow-lg mb-6"
            whileHover={{ scale: 1.05 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Play className="w-5 h-5 text-red-500 mr-3" />
            </motion.div>
            <span className="text-red-600 font-semibold">LIVE NOW</span>
          </motion.div>
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-900 to-slate-800">
              Live Events
            </span>
          </motion.h1>
          <motion.p 
            className="text-gray-600 text-base max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Join these happening events right now and connect with like-minded people
          </motion.p>
        </motion.div>

        {/* Event Card */}
        <motion.div 
          className="relative w-full max-w-3xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-red-200 to-slate-200 rounded-3xl blur-xl opacity-40"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative bg-white rounded-3xl border-2 border-gray-100 shadow-2xl overflow-hidden">
            
            {/* Event Content */}
            <div className="p-6 sm:p-8">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                
                {/* Left Column - Event Details */}
                <motion.div 
                  className="space-y-6"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    <motion.span 
                      className="px-3 py-1.5 bg-gradient-to-r from-red-700 to-slate-800 text-white rounded-full text-xs font-semibold shadow-lg"
                      whileHover={{ scale: 1.1 }}
                    >
                      {event["Event Type"]}
                    </motion.span>
                    <motion.span 
                      className="px-3 py-1.5 bg-gradient-to-r from-slate-700 to-red-800 text-white rounded-full text-xs font-semibold shadow-lg"
                      whileHover={{ scale: 1.1 }}
                    >
                      {event.Location}
                    </motion.span>
                  </div>

                  <motion.h2 
                    className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    {event["Event Name"]}
                  </motion.h2>

                  <div className="space-y-3">
                    {[
                      { icon: Calendar, text: event["Event Date"], bg: "bg-red-100", color: "text-red-700" },
                      { icon: Clock, text: event["Event Time"], bg: "bg-slate-100", color: "text-slate-700" },
                      { icon: User, text: event["Organizer Name"], bg: "bg-red-100", color: "text-red-700" },
                      { icon: MapPin, text: event.Address, bg: "bg-slate-100", color: "text-slate-700" }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-center text-gray-700"
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                        whileHover={{ x: 10 }}
                      >
                        <motion.div 
                          className={`w-8 h-8 ${item.bg} rounded-full flex items-center justify-center mr-3`}
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          <item.icon className={`w-4 h-4 ${item.color}`} />
                        </motion.div>
                        <span className="font-medium text-sm">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Right Column - Action Section */}
                                  <motion.div 
                    className="text-center space-y-4"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  >
                  <motion.div 
                    className="relative"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <motion.div 
                      className="w-24 h-24 mx-auto bg-gradient-to-br from-red-700 to-slate-800 rounded-full flex items-center justify-center mb-4 shadow-2xl"
                      whileHover={{ scale: 1.1 }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-12 h-12 text-white" />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                  
                  <motion.button 
                    className="group w-full bg-gradient-to-r from-red-700 to-slate-800 text-white font-bold py-3 px-6 rounded-xl hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center justify-center">
                      Join Event
                      <motion.div
                        className="ml-2"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </span>
                  </motion.button>
                  
                  <motion.div 
                    className="flex items-center justify-center space-x-2 text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    </motion.div>
                    <span className="text-sm font-medium">4.8 rating • 234 attendees</span>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Dots */}
        <motion.div 
          className="flex justify-center mt-8 space-x-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {events.map((_, idx) => (
            <motion.button
              key={idx}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                idx === current
                  ? "bg-gradient-to-r from-red-700 to-slate-800 scale-125 shadow-lg"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => setCurrent(idx)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              aria-label={`Go to event ${idx + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Redesigned EventGrid with Red/Black Theme
interface EventGridProps {
  events?: Event[];
}

const EventGrid: React.FC<EventGridProps> = ({ events }) => {
  // State for search query and visible cards for animation
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // State to manage pagination
  const [eventsToShow, setEventsToShow] = useState(6);

  // Sample events for demo (extended to demonstrate pagination)
  const sampleEvents: Event[] = [
    {
      "Event Name": "React Native Workshop",
      Location: "Mumbai",
      Address: "Tech Park, Powai",
      "Organizer Name": "Mobile Dev Community",
      "Event Date": "2025-08-10",
      "Event Time": "02:00 PM",
      "Event Type": "Workshop"
    },
    {
      "Event Name": "Cloud Computing Summit",
      Location: "Bangalore",
      Address: "International Convention Centre",
      "Organizer Name": "Cloud Experts",
      "Event Date": "2025-08-12",
      "Event Time": "09:00 AM",
      "Event Type": "Conference"
    },
    {
      "Event Name": "DevOps Meetup",
      Location: "Pune",
      Address: "Innovation Center, Hinjewadi",
      "Organizer Name": "DevOps India",
      "Event Date": "2025-08-14",
      "Event Time": "07:00 PM",
      "Event Type": "Meetup"
    },
    {
      "Event Name": "Blockchain Bootcamp",
      Location: "Delhi",
      Address: "Cyber Hub, Gurgaon",
      "Organizer Name": "Crypto Community",
      "Event Date": "2025-08-18",
      "Event Time": "10:00 AM",
      "Event Type": "Workshop"
    },
    {
      "Event Name": "UI/UX Design Conference",
      Location: "Chennai",
      Address: "Design Center, OMR",
      "Organizer Name": "Design Collective",
      "Event Date": "2025-08-22",
      "Event Time": "09:30 AM",
      "Event Type": "Conference"
    },
    {
      "Event Name": "Startup Pitch Night",
      Location: "Hyderabad",
      Address: "HITEC City Convention Center",
      "Organizer Name": "Startup Hub",
      "Event Date": "2025-08-26",
      "Event Time": "06:30 PM",
      "Event Type": "Networking"
    },
    {
      "Event Name": "JavaScript Masterclass",
      Location: "Mumbai",
      Address: "Coding Bootcamp, Andheri",
      "Organizer Name": "JS Community",
      "Event Date": "2025-08-28",
      "Event Time": "11:00 AM",
      "Event Type": "Workshop"
    },
    {
      "Event Name": "Music Production Workshop",
      Location: "Delhi",
      Address: "Sound Studio, Karol Bagh",
      "Organizer Name": "Music Makers",
      "Event Date": "2025-08-30",
      "Event Time": "03:00 PM",
      "Event Type": "Music"
    },
    {
      "Event Name": "Art and AI Exhibition",
      Location: "Kolkata",
      Address: "Cultural Center, Park Street",
      "Organizer Name": "ArtTech Collective",
      "Event Date": "2025-09-05",
      "Event Time": "11:00 AM",
      "Event Type": "Art & Culture"
    },
    {
      "Event Name": "Figma for Beginners",
      Location: "Bangalore",
      Address: "Creative Hub, Koramangala",
      "Organizer Name": "Design Wizards",
      "Event Date": "2025-09-10",
      "Event Time": "04:00 PM",
      "Event Type": "Workshop"
    },
    {
      "Event Name": "Cybersecurity Conclave",
      Location: "Mumbai",
      Address: "Security HQ, BKC",
      "Organizer Name": "Cyber Warriors",
      "Event Date": "2025-09-15",
      "Event Time": "09:00 AM",
      "Event Type": "Conference"
    },
    {
      "Event Name": "Startup Founders' Mixer",
      Location: "Delhi",
      Address: "The Terrace, Hauz Khas",
      "Organizer Name": "Founders Club",
      "Event Date": "2025-09-18",
      "Event Time": "07:00 PM",
      "Event Type": "Networking"
    }
  ];

  const displayEvents = events && events.length > 0 ? events : sampleEvents;

  // Filter events based on search query
  const filteredEvents = displayEvents.filter(event =>
    event["Event Name"].toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.Location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event["Event Type"].toLowerCase().includes(searchQuery.toLowerCase()) ||
    event["Organizer Name"].toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Effect to reset animation state when filtered events change
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards(new Array(filteredEvents.length).fill(true));
    }, 300);
    return () => clearTimeout(timer);
  }, [filteredEvents.length]);
  
  // Handler for when the user clicks the main search button
  const handleSearch = () => {
    // Reset eventsToShow to the initial value for a new search
    setEventsToShow(6);
  };

  // Handler for when the user clicks a tag button
  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    setEventsToShow(6); // Reset eventsToShow when a new tag is clicked
  };

  // Handler for the "Load More" button
  const handleLoadMore = () => {
    // Increment the number of events to show by 6
    setEventsToShow(prev => prev + 6);
  };

  if (!displayEvents || displayEvents.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-16 h-16 text-red-400 mx-auto mb-4" />
          </motion.div>
          <p className="text-gray-600 text-xl font-medium">No events found.</p>
        </motion.div>
      </div>
    );
  }

  // Consistent color mapping for a unified theme
  const getEventTypeColor = (type: string) => {
    const colors = {
      'Workshop': 'from-red-700 to-slate-800',
      'Conference': 'from-slate-700 to-red-800',
      'Meetup': 'from-red-700 to-slate-800',
      'Networking': 'from-slate-700 to-red-800',
      'Music': 'from-red-700 to-slate-800',
      'Art & Culture': 'from-slate-700 to-red-800',
      'default': 'from-red-700 to-slate-800'
    };
    return colors[type as keyof typeof colors] || colors.default;
  };

  const getEventTypeBgColor = (type: string) => {
    const colors = {
      'Workshop': 'bg-red-50 border-red-200',
      'Conference': 'bg-slate-50 border-slate-200',
      'Meetup': 'bg-red-50 border-red-200',
      'Networking': 'bg-slate-50 border-slate-200',
      'Music': 'bg-red-50 border-red-200',
      'Art & Culture': 'bg-slate-50 border-slate-200',
      'default': 'bg-gray-50 border-gray-200'
    };
    return colors[type as keyof typeof colors] || colors.default;
  };

  const getIconBgColor = (type: string) => {
    const colors = {
      'Workshop': 'bg-red-100',
      'Conference': 'bg-slate-100',
      'Meetup': 'bg-red-100',
      'Networking': 'bg-slate-100',
      'Music': 'bg-red-100',
      'Art & Culture': 'bg-slate-100',
      'default': 'bg-gray-100'
    };
    return colors[type as keyof typeof colors] || colors.default;
  }

  const getIconColor = (type: string) => {
    const colors = {
      'Workshop': 'text-red-700',
      'Conference': 'text-slate-700',
      'Meetup': 'text-red-700',
      'Networking': 'text-slate-700',
      'Music': 'text-red-700',
      'Art & Culture': 'text-slate-700',
      'default': 'text-gray-700'
    };
    return colors[type as keyof typeof colors] || colors.default;
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden" id="event">
      {/* Background Elements */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-40"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-40"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-30"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 360]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      <div className="relative z-10 px-4 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <motion.div 
            className="text-center mb-8"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-gray-900"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block mb-2">Explore, Connect</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-900 via-rose-900 to-slate-800">
                And Elevate in Tech
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Connect, learn, and grow with the most innovative tech events happening around you
            </motion.p>
          </motion.div>

          {/* Search Bar */}
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
            onTagClick={handleTagClick}
          />

          {/* Search Results Info */}
          <AnimatePresence>
            {searchQuery && (
              <motion.div 
                className="text-center mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="inline-flex items-center px-4 py-2 bg-white border-2 border-gray-200 rounded-full shadow-md">
                  <Search className="w-4 h-4 text-red-700 mr-2" />
                  <span className="text-gray-700 text-sm">
                    {filteredEvents.length} events found for "{searchQuery}"
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Events Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {filteredEvents.slice(0, eventsToShow).map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                {/* Card Glow Effect */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-r ${getEventTypeColor(event["Event Type"])} rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  whileHover={{ opacity: 0.2 }}
                />
                
                {/* Card Content */}
                <motion.div 
                  className={`relative bg-white rounded-2xl border-2 ${getEventTypeBgColor(event["Event Type"]).split(' ')[1]} shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden`}
                  whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                >
                  
                  {/* Card Header */}
                  <motion.div 
                    className={`h-2 bg-gradient-to-r ${getEventTypeColor(event["Event Type"])}`}
                    whileHover={{ height: "8px" }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="p-4">
                    {/* Event Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <motion.span 
                        className={`px-2 py-0.5 bg-gradient-to-r ${getEventTypeColor(event["Event Type"])} text-white rounded-full text-xs font-semibold shadow-md`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {event["Event Type"]}
                      </motion.span>
                      <motion.span 
                        className="px-2 py-0.5 bg-gray-100 text-gray-700 border border-gray-200 rounded-full text-xs font-semibold"
                        whileHover={{ scale: 1.1 }}
                      >
                        {event.Location}
                      </motion.span>
                    </div>

                    {/* Event Title */}
                    <motion.h2 
                      className="text-lg font-bold mb-3 text-gray-900 leading-tight group-hover:text-red-800 transition-colors"
                      whileHover={{ color: "#991b1b" }}
                    >
                      {event["Event Name"]}
                    </motion.h2>

                    {/* Event Details */}
                    <div className="space-y-2 mb-4">
                      {[
                        { icon: User, text: event["Organizer Name"] },
                        { icon: Calendar, text: event["Event Date"] },
                        { icon: Clock, text: event["Event Time"] },
                        { icon: MapPin, text: event.Address }
                      ].map((item, idx) => (
                        <motion.div 
                          key={idx}
                          className="flex items-center text-gray-600"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 + idx * 0.05 }}
                          whileHover={{ x: 5 }}
                        >
                          <motion.div 
                            className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${getIconBgColor(event["Event Type"])}`}
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ duration: 0.3 }}
                          >
                            <item.icon className={`w-3 h-3 ${getIconColor(event["Event Type"])}`} />
                          </motion.div>
                          <span className="text-xs">{item.text}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <motion.button 
                      className={`w-full bg-gradient-to-r ${getEventTypeColor(event["Event Type"])} text-white font-semibold py-2 px-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 group`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="flex items-center justify-center">
                        Register Now
                        <motion.div
                          className="ml-2"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="w-3 h-3" />
                        </motion.div>
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Load More Button */}
          <AnimatePresence>
            {eventsToShow < filteredEvents.length && (
              <motion.div 
                className="flex justify-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <motion.button
                  onClick={handleLoadMore}
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-red-200 rounded-full font-bold text-gray-700 hover:text-red-700 hover:border-red-300 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Load More Events
                  <motion.div
                    className="ml-3 text-red-500"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* No Results Message */}
          <AnimatePresence>
            {filteredEvents.length === 0 && searchQuery && (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="w-32 h-32 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-16 h-16 text-red-400 opacity-50" />
                </motion.div>
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  No events found
                </motion.h3>
                <motion.p 
                  className="text-gray-600 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Try adjusting your search terms or browse all events
                </motion.p>
                <motion.button
                  onClick={() => {
                    setSearchQuery("");
                    setEventsToShow(6); // Reset the number of events to show when clearing the search
                  }}
                  className="bg-gradient-to-r from-red-700 to-slate-800 text-white font-semibold py-3 px-6 rounded-xl hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Show All Events
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export { Carousel, SearchBar };
export default EventGrid;
