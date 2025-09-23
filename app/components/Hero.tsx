import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import Link from 'next/link';
import Hyperspeed from './Hyperspeed';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

// Red and White Hyperspeed Preset
const redWhitePreset = {
  onSpeedUp: () => { },
  onSlowDown: () => { },
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5] as [number, number],
  lightStickHeight: [1.3, 1.7] as [number, number],
  movingAwaySpeed: [60, 80] as [number, number],
  movingCloserSpeed: [-120, -160] as [number, number],
  carLightsLength: [400 * 0.03, 400 * 0.2] as [number, number],
  carLightsRadius: [0.05, 0.14] as [number, number],
  carWidthPercentage: [0.3, 0.5] as [number, number],
  carShiftX: [-0.8, 0.8] as [number, number],
  carFloorSeparation: [0, 5] as [number, number],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0xFFFFFF,
    brokenLines: 0xFFFFFF,
    leftCars: [0xFF0000, 0xDC2626, 0xB91C1C], // Red variations
    rightCars: [0xFFFFFF, 0xF3F4F6, 0xE5E7EB], // White variations
    sticks: 0xFF0000, // Red sticks
  }
};

const Hero: React.FC<HeroProps> = ({ searchQuery, setSearchQuery }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const floatingElements = [
    { icon: Calendar, delay: "0s", position: "top-16 left-10" },
    { icon: MapPin, delay: "0.5s", position: "top-24 right-16" },
    { icon: Sparkles, delay: "1s", position: "bottom-32 left-20" },
    { icon: Calendar, delay: "1.5s", position: "bottom-16 right-12" },
  ];

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

            <div id="home" className="relative w-full min-h-screen bg-gradient-to-br from-black via-slate-950 to-black overflow-hidden font-sans">
              {/* Hyperspeed Animation Background */}
              <div className="absolute inset-0 z-0">
                <Hyperspeed effectOptions={redWhitePreset} />
              </div>

              {/* Overlay to ensure text readability */}
              <div className="absolute inset-0 bg-black/30 z-10"></div>

              {/* Floating Icons */}
              {floatingElements.map((element, index) => {
                const IconComponent = element.icon;
                return (
                  <div
                    key={index}
                    className={`absolute ${element.position} text-white/5 animate-bounce hidden lg:block z-30`}
                    style={{ animationDelay: element.delay, animationDuration: '3s' }}
                  >
                    <IconComponent size={24} />
                  </div>
                );
              })}

              {/* Main Content */}
              <div className="relative z-40 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center min-h-screen text-center py-12">

                  {/* Heading */}
                  <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 mt-4 sm:mb-4 leading-tight">
                      <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-300 to-white">
                        Discover
                      </span>
                      <span className="block bg-clip-text text-transparent bg-gradient-to-r from-red-900 via-rose-900 to-slate-400 mt-1 sm:mt-2">
                        Fantastic Events
                      </span>
                    </h1>
                  </div>

                  {/* Subtitle */}
                  <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light mb-6">
                      Unlock extraordinary experiences with <span className="font-semibold text-red-500">workshops</span>,
                      <span className="font-semibold text-rose-500"> meetups</span>, and
                      <span className="font-semibold text-neutral-400"> events</span> happening around you
                    </p>
                  </div>

                  {/* 🔍 Search Input */}
                  <div className="w-full max-w-lg mb-8">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg text-base focus:outline-none bg-white/10 text-white placeholder-white/60 border border-white/20 backdrop-blur-sm"
                      placeholder="Search events by city, name, or category..."
                    />
                  </div>

                  {/* Stats Cards */}
                  <div className={`transform transition-all duration-1000 delay-700 mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {[
                      { number: '10K+', label: 'Events Listed', icon: Calendar },
                      { number: '500+', label: 'Cities Covered', icon: MapPin },
                      { number: '50K+', label: 'Happy Users', icon: Sparkles }
                    ].map((stat, index) => {
                      const IconComponent = stat.icon;
                      return (
                        <div
                          key={index}
                          className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 hover:scale-105 transform transition-all duration-300 cursor-pointer"
                        >
                          <div className="flex items-center justify-center mb-2">
                            <IconComponent className="w-6 h-6 text-red-700 group-hover:text-rose-600 transition-colors duration-300" />
                          </div>
                          <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                          <div className="text-white/70 text-xs font-medium">{stat.label}</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA Button */}
                  <div className={`transform transition-all duration-1000 delay-900 mt-8 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <Link
                      href="#event"
                      className="group relative inline-block px-6 py-3 bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white font-bold text-base rounded-xl hover:scale-105 transform transition-all duration-300 shadow-xl overflow-hidden"
                    >
                      <span className="relative z-10">Explore All Events</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-rose-800 via-red-700 to-rose-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  </div>

                </div>
              </div>
            </div> {/* closes inner #home */}
          </div>
        </div>
      </div>
    </div> {/* closes outer #home */}
  );
};

export default Hero;
