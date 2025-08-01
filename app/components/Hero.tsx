import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import Link from 'next/link';

// This is a responsive hero section component with a dark, minimalist red and black theme.
// It features animated background elements, floating icons, and a staggered text animation.
const Hero = () => {
  // State to control the visibility and animation of the main content
  const [isVisible, setIsVisible] = useState(false);

  // UseEffect hook to trigger the animation on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Configuration for the floating icons in the background
  const floatingElements = [
    { icon: Calendar, delay: "0s", position: "top-20 left-10" },
    { icon: MapPin, delay: "0.5s", position: "top-32 right-16" },
    { icon: Sparkles, delay: "1s", position: "bottom-40 left-20" },
    { icon: Calendar, delay: "1.5s", position: "bottom-20 right-12" },
  ];

  return (
    // Main container with a dark gradient background, emphasizing black with a hint of red
    <div id="home" className="relative w-full min-h-screen bg-gradient-to-br from-black via-slate-950 to-black overflow-hidden font-sans">
      {/* Animated Background Elements - large, blurry, pulsating circles with subtle red tones */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-red-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-rose-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-red-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Floating Icons that bounce in the background */}
      {floatingElements.map((element, index) => {
        const IconComponent = element.icon;
        return (
          <div
            key={index}
            className={`absolute ${element.position} text-white/5 animate-bounce hidden lg:block`}
            style={{ animationDelay: element.delay, animationDuration: '3s' }}
          >
            <IconComponent size={32} />
          </div>
        );
      })}

      {/* Main content container with a centered layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen text-center py-20">
          
          {/* Main Heading with a custom gradient and a subtle animation */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 mt-8 sm:mb-6 leading-tight">
              {/* First line of the heading with a gradient from white to gray */}
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-300 to-white">
                Discover
              </span>
              {/* Second line of the heading with a dark red-focused gradient */}
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-red-900 via-rose-900 to-slate-400 mt-1 sm:mt-2">
                Fantastic Events
              </span>
            </h1>
          </div>

          {/* Subtitle with staggered animation */}
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light mb-12">
              Unlock extraordinary experiences with <span className="font-semibold text-red-500">workshops</span>, 
              <span className="font-semibold text-rose-500"> meetups</span>, and 
              <span className="font-semibold text-neutral-400"> events</span> happening around you
            </p>
          </div>
          
          {/* Stats Cards grid with hover effects and staggered animation */}
          <div className={`transform transition-all duration-1000 delay-700 mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {[
              { number: '10K+', label: 'Events Listed', icon: Calendar },
              { number: '500+', label: 'Cities Covered', icon: MapPin },
              { number: '50K+', label: 'Happy Users', icon: Sparkles }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:scale-105 transform transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-center mb-3">
                    {/* Icon changes color on hover */}
                    <IconComponent className="w-8 h-8 text-red-700 group-hover:text-rose-600 transition-colors duration-300" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-white/70 text-sm font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Call-to-action button with a gradient and hover effect */}
          <div className={`transform transition-all duration-1000 delay-900 mt-12 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Link
              href="#event"
              className="group relative inline-block px-8 py-4 bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white font-bold text-lg rounded-2xl hover:scale-105 transform transition-all duration-300 shadow-2xl overflow-hidden"
            >
              <span className="relative z-10">Explore All Events</span>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-800 via-red-700 to-rose-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
