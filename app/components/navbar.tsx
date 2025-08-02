'use client';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";

// This component provides a responsive and thematic navigation bar for the application.
// It adapts to a red and black color scheme on a white background.
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLUListElement>(null);

  // Effect to handle the scroll state for the navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to close the mobile menu when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const sections = ['home', 'event', 'eventform'];

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      let currentActive = "";
      let highestIntersectionRatio = 0;

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio > highestIntersectionRatio) {
            highestIntersectionRatio = entry.intersectionRatio;
            currentActive = `#${entry.target.id}`;
          }
        }
      });

      if (currentActive) {
        setActiveSection(prevActive => {
          if (currentActive !== prevActive) {
            return currentActive;
          }
          return prevActive;
        });
      }
    }, observerOptions);

    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
      observer.disconnect();
    };
  }, []);

  const handleLinkClick = (href: string) => {
    setActiveSection(href === '/' ? '#home' : href);
    setIsOpen(false);
  };

  // Function to apply desktop link classes based on active state
  const getLinkClasses = (href: string) => {
    const baseClasses = "relative px-3 sm:px-4 py-1.5 rounded-full transition-all duration-300 ease-in-out font-medium overflow-hidden group text-sm";
    const activeClasses = "bg-red-900 text-white shadow-lg transform scale-105";
    const hoverClasses = "text-slate-700 hover:bg-red-100";

    const isActive = activeSection === href || (href === '/' && activeSection === '#home');

    return `${baseClasses} ${isActive ? activeClasses : hoverClasses}`;
  };

  // Function to apply mobile link classes based on active state
  const getMobileLinkClasses = (href: string) => {
    const baseClasses = "block py-3 px-4 rounded-xl transition-all duration-300 ease-in-out font-medium relative overflow-hidden text-sm";
    const activeClasses = "bg-red-700 text-white shadow-lg";
    const hoverClasses = "text-white/80 hover:bg-white/10";

    const isActive = activeSection === href || (href === '/' && activeSection === '#home');

    return `${baseClasses} ${isActive ? activeClasses : hoverClasses}`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
      aria-label="Main Navigation"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 sm:h-14">
                      <Link
              href="/"
              className="flex items-center space-x-2 group"
              onClick={() => handleLinkClick("/")}
            >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-slate-800 rounded-full blur-sm opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
              <img
                src="/logo.png"
                alt="Tech Events Logo"
                className="relative h-7 w-7 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-all duration-300"
              />
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-lg sm:text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-red-900 via-rose-900 to-slate-800">
                Tech Events
              </span>
              <Sparkles className="w-4 h-4 text-red-700 animate-pulse" />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex space-x-1">
            <li>
              <Link
                href="/"
                className={getLinkClasses("/")}
                onClick={() => handleLinkClick("/")}
              >
                <span className="relative z-10">Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="#event"
                className={getLinkClasses("#event")}
                onClick={() => handleLinkClick("#event")}
              >
                <span className="relative z-10">View Events</span>
              </Link>
            </li>
            <li>
              <Link
                href="#eventform"
                className={getLinkClasses("#eventform")}
                onClick={() => handleLinkClick("#eventform")}
              >
                <span className="relative z-10">Add Events</span>
              </Link>
            </li>
            <li>
              <Link href="/auth" className="ml-3">
                <button className="bg-gradient-to-r from-red-700 to-slate-800 text-white font-semibold px-4 py-1.5 rounded-full hover:from-red-800 hover:to-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm">
                  Login / Signup
                </button>
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden z-50 p-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} className="text-slate-900" /> : <Menu size={20} className="text-slate-900" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - A full-screen overlay when open */}
      <ul
        id="mobile-menu"
        ref={mobileMenuRef}
        className={`md:hidden absolute top-0 left-0 w-full min-h-screen bg-slate-950/95 backdrop-blur-md transition-all duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative pt-20 px-6 space-y-3">
          <li>
            <Link
              href="/"
              className={getMobileLinkClasses("/")}
              onClick={() => handleLinkClick("/")}
            >
              <span className="relative z-10">Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="#event"
              className={getMobileLinkClasses("#event")}
              onClick={() => handleLinkClick("#event")}
            >
              <span className="relative z-10">View Events</span>
            </Link>
          </li>
          <li>
            <Link
              href="#eventform"
              className={getMobileLinkClasses("#eventform")}
              onClick={() => handleLinkClick("#eventform")}
            >
              <span className="relative z-10">Add Event</span>
            </Link>
          </li>
          <li>
            <Link
              href="/auth"
              className={getMobileLinkClasses("/auth")}
              onClick={() => handleLinkClick("/auth")}
            >
              <span className="relative z-10">Login / Signup</span>
            </Link>
          </li>

          {/* Mobile menu decorative elements */}
          <div className="pt-8 mt-8 border-t border-white/20">
            <div className="flex items-center justify-center space-x-2 text-white/60">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Discover Amazing Events</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>
      </ul>
    </nav>
  );
}
