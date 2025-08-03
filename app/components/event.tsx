'use client'
import React, { useEffect, useState, FormEvent } from "react";
import { Calendar, Clock, MapPin, User, Star, ArrowRight, Sparkles, Play, Search, XCircle } from "lucide-react";

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

  return (
    <div className={`transform transition-all duration-1000 delay-300 w-full max-w-5xl mx-auto mb-12 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <div className="relative group">
        {/* Search Input Container */}
        <div className={`relative transform transition-all duration-300 ${focusedInput ? 'scale-105' : 'scale-100'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-slate-800 rounded-2xl blur-sm opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <div className="relative bg-white rounded-2xl border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center px-6 py-5">
              <Search className={`w-6 h-6 transition-colors duration-300 mr-4 ${focusedInput ? 'text-red-700' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search events by city, name, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setFocusedInput(true)}
                onBlur={() => setFocusedInput(false)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 text-lg text-gray-800 placeholder-gray-500 bg-transparent focus:outline-none font-medium"
              />
              <button
                onClick={handleSearch}
                className="ml-4 bg-gradient-to-r from-red-800 to-slate-900 text-white px-8 py-3 rounded-xl font-semibold hover:from-red-900 hover:to-slate-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Filter Tags */}
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {['Workshops', 'Tech Events', 'Music', 'Art & Culture', 'Sports', 'Networking'].map((tag, index) => (
          <button
            key={tag}
            onClick={() => {
              if (onTagClick) {
                onTagClick(tag.toLowerCase());
              }
            }}
            className={`px-6 py-2 rounded-full bg-white border-2 border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700 hover:scale-105 transform transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md`}
            style={{ animationDelay: `${500 + index * 100}ms` }}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

// Redesigned Carousel component with Red/Black Theme
interface CarouselProps {
  onJoinEvent: () => void;
}
const Carousel: React.FC<CarouselProps> = ({ onJoinEvent }) => {
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
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-xl font-medium">Loading live events...</p>
        </div>
      </div>
    );

  const event = events[current];

  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden" id="home">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gray-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Header Section */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center px-6 py-3 bg-white border-2 border-red-200 rounded-full shadow-lg mb-6">
            <Play className="w-5 h-5 text-red-900 mr-3 animate-pulse" />
            <span className="text-red-900 font-semibold">LIVE NOW</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-900 to-slate-800">
              Live Events
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Join these happening events right now and connect with like-minded people
          </p>
        </div>

        {/* Event Card */}
        <div className={`relative w-full max-w-4xl transform transition-all duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-red-200 to-slate-200 rounded-3xl blur-xl opacity-40"></div>
          <div className="relative bg-white rounded-3xl border-2 border-gray-100 shadow-2xl overflow-hidden">

            {/* Event Content */}
            <div className="p-8 sm:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">

                {/* Left Column - Event Details */}
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="px-4 py-2 bg-gradient-to-r from-red-900 to-slate-800 text-white rounded-full text-sm font-semibold shadow-lg">
                      {event["Event Type"]}
                    </span>
                    <span className="px-4 py-2 bg-gradient-to-r from-slate-700 to-red-800 text-white rounded-full text-sm font-semibold shadow-lg">
                      {event.Location}
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
                    {event["Event Name"]}
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center text-gray-700">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
                        <Calendar className="w-5 h-5 text-red-900" />
                      </div>
                      <span className="font-medium">{event["Event Date"]}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mr-4">
                        <Clock className="w-5 h-5 text-slate-700" />
                      </div>
                      <span className="font-medium">{event["Event Time"]}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-4">
                        <User className="w-5 h-5 text-red-700" />
                      </div>
                      <span className="font-medium">{event["Organizer Name"]}</span>
                    </div>
                    <div className="flex items-start text-gray-600">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mr-4 mt-0.5">
                        <MapPin className="w-5 h-5 text-slate-700" />
                      </div>
                      <span>{event.Address}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column - Action Section */}
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-700 to-slate-800 rounded-full flex items-center justify-center mb-6 shadow-2xl">
                      <Sparkles className="w-16 h-16 text-white" />
                    </div>

                  </div>

                  {/* Button to open the registration modal */}
                  <button
                    onClick={onJoinEvent}
                    className="group w-full bg-gradient-to-r from-red-700 to-slate-800 text-white font-bold py-4 px-8 rounded-2xl hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl"
                  >
                    <span className="flex items-center justify-center">
                      Join Event
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>

                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">4.8 rating • 234 attendees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-3">
          {events.map((_, idx) => (
            <button
              key={idx}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                idx === current
                  ? "bg-gradient-to-r from-red-700 to-slate-800 scale-125 shadow-lg"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to event ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Redesigned EventGrid with Red/Black Theme
interface EventGridProps {
  events?: Event[];
  onRegisterNow: () => void;
}
const EventGrid: React.FC<EventGridProps> = ({ events, onRegisterNow }) => {
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
        <div className="text-center">
          <Sparkles className="w-16 h-16 text-red-900 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600 text-xl font-medium">No events found.</p>
        </div>
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
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 px-4 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto">

          {/* Header Section */}
          <div className="text-center mb-12">


            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-gray-900">
              <span className="block mb-2">Explore, Connect</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-900 via-rose-900 to-slate-800">
                And Elevate in Tech
              </span>
            </h1>

            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
              Connect, learn, and grow with the most innovative tech events happening around you
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
            onTagClick={handleTagClick}
          />

          {/* Search Results Info */}
          {searchQuery && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-white border-2 border-gray-200 rounded-full shadow-md">
                <Search className="w-4 h-4 text-red-700 mr-2" />
                <span className="text-gray-700 text-sm">
                  {filteredEvents.length} events found for "{searchQuery}"
                </span>
              </div>
            </div>
          )}

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.slice(0, eventsToShow).map((event, index) => (
              <div
                key={index}
                className={`group relative transform transition-all duration-700 hover:scale-105 ${
                  visibleCards[index] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Card Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${getEventTypeColor(event["Event Type"])} rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>

                {/* Card Content */}
                <div className={`relative bg-white rounded-2xl border-2 ${getEventTypeBgColor(event["Event Type"]).split(' ')[1]} shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden`}>

                  {/* Card Header */}
                  <div className={`h-2 bg-gradient-to-r ${getEventTypeColor(event["Event Type"])}`}></div>

                  <div className="p-6">
                    {/* Event Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`px-3 py-1 bg-gradient-to-r ${getEventTypeColor(event["Event Type"])} text-white rounded-full text-xs font-semibold shadow-md`}>
                        {event["Event Type"]}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-full text-xs font-semibold">
                        {event.Location}
                      </span>
                    </div>

                    {/* Event Title */}
                    <h2 className="text-xl font-bold mb-4 text-gray-900 leading-tight group-hover:text-red-800 transition-colors">
                      {event["Event Name"]}
                    </h2>

                    {/* Event Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-600">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getIconBgColor(event["Event Type"])}`}>
                          <User className={`w-4 h-4 ${getIconColor(event["Event Type"])}`} />
                        </div>
                        <span className="text-sm font-medium">{event["Organizer Name"]}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getIconBgColor(event["Event Type"])}`}>
                          <Calendar className={`w-4 h-4 ${getIconColor(event["Event Type"])}`} />
                        </div>
                        <span className="text-sm">{event["Event Date"]}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getIconBgColor(event["Event Type"])}`}>
                          <Clock className={`w-4 h-4 ${getIconColor(event["Event Type"])}`} />
                        </div>
                        <span className="text-sm">{event["Event Time"]}</span>
                      </div>
                      <div className="flex items-start text-gray-500">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-0.5 ${getIconBgColor(event["Event Type"])}`}>
                          <MapPin className={`w-4 h-4 ${getIconColor(event["Event Type"])}`} />
                        </div>
                        <span className="text-sm">{event.Address}</span>
                      </div>
                    </div>

                    {/* Action Button to open the registration modal */}
                    <button
                      onClick={onRegisterNow}
                      className={`w-full bg-gradient-to-r ${getEventTypeColor(event["Event Type"])} text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 group`}
                    >
                      <span className="flex items-center justify-center">
                        Register Now
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {eventsToShow < filteredEvents.length && (
            <div className="flex justify-center mt-12">
              <button
                onClick={handleLoadMore}
                className="group inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-red-200 rounded-full font-bold text-gray-700 hover:text-red-700 hover:border-red-300 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl"
              >
                Load More Events
                <ArrowRight className="w-5 h-5 ml-3 text-red-500 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* No Results Message */}
          {filteredEvents.length === 0 && searchQuery && (
            <div className="text-center py-16">
              <div className="w-32 h-32 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-16 h-16 text-red-400 opacity-50" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search terms or browse all events</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setEventsToShow(6); // Reset the number of events to show when clearing the search
                }}
                className="bg-gradient-to-r from-red-700 to-slate-800 text-white font-semibold py-3 px-6 rounded-xl hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Show All Events
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// New Registration Form Modal Component
interface RegistrationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const RegistrationFormModal: React.FC<RegistrationFormModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on change
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in all fields.');
      return;
    }
    // Simulate API call or form submission
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    // Automatically close the modal and reset after a delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '' });
      onClose();
    }, 3000); // Confirmation message for 3 seconds
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative bg-slate-900 text-white rounded-3xl p-8 sm:p-12 max-w-lg w-full shadow-2xl border border-red-900 transform scale-95 opacity-0 animate-fade-in-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Close form"
        >
          <XCircle size={32} />
        </button>

        {isSubmitted ? (
          <div className="text-center py-10 animate-fade-in">
            <Sparkles size={64} className="text-red-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-3xl font-bold text-red-200 mb-2">Registration Successful!</h3>
            <p className="text-gray-300">You have been registered for the event. See you there!</p>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-bold mb-2 text-red-200">Join the Event</h2>
            <p className="text-gray-400 mb-6">Please fill in your details to register.</p>
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 text-white rounded-xl border border-gray-700 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 text-white rounded-xl border border-gray-700 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>

              {/* Phone input */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 text-white rounded-xl border border-gray-700 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-red-700 to-slate-800 text-white font-bold py-4 rounded-xl hover:from-red-800 hover:to-slate-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Register Now
              </button>
            </form>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(20px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};


// Main App component to render all other components and manage modal state
const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSearch = () => {
    // This is a placeholder for search logic if needed at this level
  };
  const handleTagClick = (tag: string) => {
    // This is a placeholder for tag click logic if needed at this level
  };

  return (
    <div className="font-sans antialiased text-gray-800 bg-white min-h-screen">
      <Carousel onJoinEvent={handleOpenModal} />
      <EventGrid onRegisterNow={handleOpenModal} />
      <RegistrationFormModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default App;

