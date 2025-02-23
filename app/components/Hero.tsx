import React from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Hero: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center py-16 md:py-24 lg:py-32">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Discover Amazing Events
        </h1>
        <p className="text-lg sm:text-xl mt-4 max-w-2xl mx-auto text-gray-700">
          Search through exciting events, workshops, and meetups happening near you!
        </p>

        {/* Search Bar */}
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search events by city or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 sm:py-5 px-6 text-lg border border-gray-200 rounded-full shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
