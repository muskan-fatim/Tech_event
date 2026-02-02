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
  filterType?: string;
  setFilterType?: (type: string) => void;
  filterLocation?: string;
  setFilterLocation?: (location: string) => void;
  filterDate?: string;
  setFilterDate?: (date: string) => void;
  onSearch?: () => void;
  onTagClick?: (tag: string) => void;
  eventTypes?: string[];
  locations?: string[];
}

// Search Bar Component with Red/Black Theme and Advanced Filters
const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
  filterLocation,
  setFilterLocation,
  filterDate,
  setFilterDate,
  onSearch,
  onTagClick,
  eventTypes = [],
  locations = []
}) => {
  const [focusedInput, setFocusedInput] = useState(false);

  const handleSearch = () => {
    if (onSearch) {
      onSearch();
    }
  };

  const tags = ['Workshops', 'Tech Events', 'Music', 'Art & Culture', 'Sports', 'Networking'];

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 transform translate-y-0 opacity-100 transition-all duration-800">
      <div className="relative group">
        {/* Search Input Container */}
        <div className={`relative transform transition-all duration-300 ${focusedInput ? 'scale-105' : 'scale-100'}`}> 
          <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-slate-800 rounded-2xl blur-sm opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
          <div className="relative bg-white rounded-2xl border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row md:items-center px-4 py-3 gap-2 md:gap-0">
              <div className={`transition-colors duration-300 mr-3 ${focusedInput ? 'text-red-700' : 'text-gray-400'}`}> 
                <Search className="w-5 h-5" />
              </div>
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
              {/* Event Type Filter */}
              {setFilterType && (
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="ml-2 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <option key="all-types" value="">All Types</option>
                  {eventTypes.map((type, idx) => (
                    <option key={`event-type-${type}-${idx}`} value={type}>{type}</option>
                  ))}
                </select>
              )}
              {/* Location Filter */}
              {setFilterLocation && (
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="ml-2 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <option key="all-locations" value="">All Locations</option>
                  {locations.map((loc, idx) => (
                    <option key={`location-${loc}-${idx}`} value={loc}>{loc}</option>
                  ))}
                </select>
              )}
              {/* Date Filter */}
              {setFilterDate && (
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="ml-2 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="Date"
                />
              )}
              <button
                onClick={handleSearch}
                className="ml-3 bg-gradient-to-r from-red-800 to-slate-900 text-white px-6 py-2 rounded-lg font-semibold hover:from-red-900 hover:to-slate-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Filter Tags */}
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {tags.map((tag, index) => (
          <button
            key={tag}
            onClick={() => {
              if (onTagClick) {
                onTagClick(tag.toLowerCase());
              }
            }}
            className="px-4 py-1.5 rounded-full bg-white border-2 border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700 transition-all duration-200 text-xs font-medium shadow-sm hover:shadow-md hover:scale-110 hover:-translate-y-0.5"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

// Carousel component with Red/Black Theme
interface CarouselProps {
  onJoinEvent: () => void;
}

const Carousel: React.FC<CarouselProps> = ({ onJoinEvent }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
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

  if (events.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-400 border-t-transparent rounded-full mx-auto mb-4 animate-spin" />
          <p className="text-gray-600 text-xl font-medium">Loading live events...</p>
        </div>
      </div>
    );
  }

  const event = events[current];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-500 px-4 py-10 dark:bg-gray-900">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-wide mb-6 text-center drop-shadow-lg">
        Live Events
      </h1>

      <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-2xl w-full transition-all duration-700 ease-in-out">
        {/* Event Card Content */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Event Details */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-red-900 to-slate-800 text-white rounded-full text-sm font-semibold shadow-lg hover:scale-110 transition-transform duration-200">
                {event["Event Type"]}
              </span>
              <span className="px-4 py-2 bg-gradient-to-r from-slate-700 to-red-800 text-white rounded-full text-sm font-semibold shadow-lg hover:scale-110 transition-transform duration-200">
                {event.Location}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight dark:text-white">
              {event["Event Name"]}
            </h2>

            <div className="space-y-3">
              {[
                { icon: Calendar, text: event["Event Date"], bg: "bg-red-100", color: "text-red-700" },
                { icon: Clock, text: event["Event Time"], bg: "bg-slate-100", color: "text-slate-700" },
                { icon: User, text: event["Organizer Name"], bg: "bg-red-100", color: "text-red-700" },
                { icon: MapPin, text: event.Address, bg: "bg-slate-100", color: "text-slate-700" }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:translate-x-2 transition-transform duration-200"
                >
                  <div className={`w-8 h-8 ${item.bg} rounded-full flex items-center justify-center mr-3 hover:scale-110 transition-transform duration-200`}>
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <span className="font-medium text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Action Section */}
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-700 to-slate-800 rounded-full flex items-center justify-center mb-6 shadow-2xl hover:scale-110 transition-transform duration-300">
                <div className="animate-spin">
                  <Sparkles className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>

            <button 
              onClick={onJoinEvent}
              className="group w-full bg-gradient-to-r from-red-700 to-slate-800 text-white font-bold py-4 px-8 rounded-2xl hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <span className="flex items-center justify-center">
                Join Event
                <div className="ml-2 group-hover:translate-x-1 transition-transform duration-200">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </span>
            </button>

            {/* Rating & Attendance */}
            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
              <div className="animate-spin">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              </div>
              <span className="text-sm font-medium">4.8 rating • 234 attendees</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-8 space-x-3">
        {events.map((_, idx) => (
          <button
            key={idx}
            className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 ${
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
  );
};

// EventGrid with Red/Black Theme
interface EventGridProps {
  events?: Event[];
  onRegisterNow: () => void;
}

const EventGrid: React.FC<EventGridProps> = ({ events, onRegisterNow }) => {
  // State for search query and visible cards for animation
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [eventsToShow, setEventsToShow] = useState(6);

  // Sample events for demo
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
    }
  ];

  const displayEvents = events && events.length > 0 ? events : sampleEvents;

  // Get unique event types and locations for filter dropdowns
  const eventTypes = Array.from(new Set(displayEvents.map(e => e["Event Type"])));
  const locations = Array.from(new Set(displayEvents.map(e => e.Location)));

  // Advanced filter logic
  const filteredEvents = displayEvents.filter(event => {
    const matchesQuery =
      (event["Event Name"]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.Location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event["Event Type"]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event["Organizer Name"]?.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType ? event["Event Type"] === filterType : true;
    const matchesLocation = filterLocation ? event.Location === filterLocation : true;
    const matchesDate = filterDate ? event["Event Date"] === filterDate : true;
    return matchesQuery && matchesType && matchesLocation && matchesDate;
  });

  const handleSearch = () => {
    setEventsToShow(6);
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    setEventsToShow(6);
  };

  const handleLoadMore = () => {
    setEventsToShow(prev => prev + 6);
  };

  if (!displayEvents || displayEvents.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin">
            <Sparkles className="w-16 h-16 text-red-900 mx-auto mb-4" />
          </div>
          <p className="text-gray-600 text-xl font-medium">No events found.</p>
        </div>
      </div>
    );
  }

  // Color mapping functions
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
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-30 animate-pulse" />
      </div>

      <div className="relative z-10 px-4 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto">

          {/* Header Section */}
          <div className="text-center mb-12 animate-fade-in-up">
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

          {/* Search Bar with Filters */}
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterType={filterType}
            setFilterType={setFilterType}
            filterLocation={filterLocation}
            setFilterLocation={setFilterLocation}
            filterDate={filterDate}
            setFilterDate={setFilterDate}
            onSearch={handleSearch}
            onTagClick={handleTagClick}
            eventTypes={eventTypes}
            locations={locations}
          />

          {/* Search Results Info */}
          {searchQuery && (
            <div className="text-center mb-8 animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 bg-white border-2 border-gray-200 rounded-full shadow-md">
                <Search className="w-4 h-4 text-red-700 mr-2" />
                <span className="text-gray-700 text-sm">
                  {filteredEvents.length} events found for "{searchQuery}"
                </span>
              </div>
            </div>
          )}

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.slice(0, eventsToShow).map((event, index) => (
              <div
                key={index}
                className="group relative animate-fade-in-up hover:-translate-y-2 hover:scale-102 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${getEventTypeColor(event["Event Type"])} rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

                {/* Card Content */}
                <div className={`relative bg-white rounded-2xl border-2 ${getEventTypeBgColor(event["Event Type"]).split(' ')[1]} shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden`}>

                  {/* Card Header */}
                  <div className={`h-2 bg-gradient-to-r ${getEventTypeColor(event["Event Type"])} group-hover:h-3 transition-all duration-300`} />

                  <div className="p-6">
                    {/* Event Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className={`px-2 py-0.5 bg-gradient-to-r ${getEventTypeColor(event["Event Type"])} text-white rounded-full text-xs font-semibold shadow-md hover:scale-110 transition-transform duration-200`}>
                        {event["Event Type"]}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 border border-gray-200 rounded-full text-xs font-semibold hover:scale-110 transition-transform duration-200">
                        {event.Location}
                      </span>
                    </div>

                    {/* Event Title */}
                    <h2 className="text-lg font-bold mb-3 text-gray-900 leading-tight group-hover:text-red-800 transition-colors">
                      {event["Event Name"]}
                    </h2>

                    {/* Event Details */}
                    <div className="space-y-2 mb-4">
                      {[
                        { icon: User, text: event["Organizer Name"] },
                        { icon: Calendar, text: event["Event Date"] },
                        { icon: Clock, text: event["Event Time"] },
                        { icon: MapPin, text: event.Address }
                      ].map((item, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center text-gray-600 hover:translate-x-1 transition-transform duration-200"
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${getIconBgColor(event["Event Type"])} hover:scale-125 transition-transform duration-200`}>
                            <item.icon className={`w-3 h-3 ${getIconColor(event["Event Type"])}`} />
                          </div>
                          <span className="text-xs">{item.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <button 
                      onClick={onRegisterNow}
                      className={`w-full bg-gradient-to-r ${getEventTypeColor(event["Event Type"])} text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 group`}
                    >
                      <span className="flex items-center justify-center">
                        Register Now
                        <div className="ml-2 group-hover:translate-x-1 transition-transform duration-200">
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {eventsToShow < filteredEvents.length && (
            <div className="flex justify-center mt-12 animate-fade-in">
              <button
                onClick={handleLoadMore}
                className="group inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-red-200 rounded-full font-bold text-gray-700 hover:text-red-700 hover:border-red-300 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl"
              >
                Load More Events
                <div className="ml-3 text-red-500 group-hover:translate-x-1 transition-transform duration-200">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </button>
            </div>
          )}

          {/* No Results Message */}
          {filteredEvents.length === 0 && searchQuery && (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-32 h-32 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-16 h-16 text-red-400 opacity-50 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search terms or browse all events</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setEventsToShow(6);
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

// Registration Form Modal Component
interface RegistrationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationFormModal: React.FC<RegistrationFormModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in all fields.');
      return;
    }
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '' });
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300">
      <div className="relative bg-slate-900 text-white rounded-3xl p-8 sm:p-12 max-w-lg w-full shadow-2xl border border-red-900 transform transition-all duration-300 animate-fade-in-up">
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
            <div className="animate-pulse">
              <Sparkles size={64} className="text-red-500 mx-auto mb-4" />
            </div>
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

// Main EventComponent that receives events as prop


interface EventComponentProps {
  events: any[];
}

const EventComponent: React.FC<EventComponentProps> = ({ events }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div className="font-sans antialiased text-gray-800 bg-white min-h-screen">
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
      <Carousel onJoinEvent={handleOpenModal} />
      <EventGrid events={events} onRegisterNow={handleOpenModal} />
      <RegistrationFormModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default EventComponent;