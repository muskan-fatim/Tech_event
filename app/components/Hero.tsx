import React from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Hero: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div
      id="home"
      className="w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 sm:px-6 lg:px-8 transition-all duration-500"
    >
      <div className="max-w-6xl mx-auto text-center py-16 md:py-24 lg:py-32">
        {/* Heading */}
        <h1 className="pt-5 text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-300 dark:to-purple-300">
          Discover Amazing Events
        </h1>
        <p className="text-lg sm:text-xl mt-4 max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
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
              className="w-full py-4 sm:py-5 px-6 text-lg border border-gray-200 dark:border-gray-600 rounded-full shadow-md bg-white dark:bg-gray-700 text-black dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
