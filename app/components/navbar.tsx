'use client';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Moon, Sun, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLUListElement>(null);

  // Restore theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Update theme class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Section observer for active links
  useEffect(() => {
    const sections = ["home", "event", "eventform"];
    const observer = new IntersectionObserver(
      (entries) => {
        let currentActive = "";
        let highestRatio = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
            highestRatio = entry.intersectionRatio;
            currentActive = `#${entry.target.id}`;
          }
        });
        if (currentActive) setActiveSection((prev) => (prev !== currentActive ? currentActive : prev));
      },
      { root: null, rootMargin: "0px", threshold: 0.5 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
      observer.disconnect();
    };
  }, []);

  const handleLinkClick = (href: string) => {
    setActiveSection(href === "/" ? "#home" : href);
    setIsOpen(false);
  };

  const getLinkClasses = (href: string) => {
    const base = "px-4 py-2 rounded-full transition-all duration-300 ease-in-out";
    const active = "bg-gradient-to-r from-blue-700 to-purple-700 font-semibold text-white shadow-md hover:scale-105";
    const hover = "hover:bg-white/20";
    const isActive = activeSection === href || (href === "/" && activeSection === "#home");
    return `${base} ${isActive ? active : hover}`;
  };

  const getMobileLinkClasses = (href: string) => {
    const base = "block py-3 px-6 rounded-md transition-colors duration-300 ease-in-out text-gray-300";
    const active = "bg-gray-600 font-bold text-teal-300";
    const hover = "hover:bg-gray-600 hover:text-white";
    const isActive = activeSection === href || (href === "/" && activeSection === "#home");
    return `${base} ${isActive ? active : hover}`;
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200" : "bg-white/95 backdrop-blur-sm"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-14">
        <Link href="/" className="flex items-center space-x-2" onClick={() => handleLinkClick("/")}>
          <img src="/logo.png" alt="Tech Events Logo" className="h-8 w-8 rounded-full" />
          <span className="text-2xl font-bold">Tech Events</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-2 items-center">
          <li><Link href="/" className={getLinkClasses("/")} onClick={() => handleLinkClick("/")}>Home</Link></li>
          <li><Link href="#event" className={getLinkClasses("#event")} onClick={() => handleLinkClick("#event")}>View Events</Link></li>
          <li><Link href="#eventform" className={getLinkClasses("#eventform")} onClick={() => handleLinkClick("#eventform")}>Add Events</Link></li>
          <li>
            <Link href="/auth">
              <button className="ml-4 bg-white text-blue-700 font-semibold px-4 py-2 rounded-full hover:bg-yellow-200 transition">Login / Signup</button>
            </Link>
          </li>
          <li>
            <button onClick={() => setDarkMode(!darkMode)} className="ml-4 p-2 rounded-full bg-white text-purple-700 dark:bg-gray-700 dark:text-yellow-400 hover:scale-105 transition">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden z-50 p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        <ul ref={mobileMenuRef} className={`md:hidden absolute top-0 left-0 w-full h-screen bg-gray-700/80 dark:bg-gray-900/90 p-6 flex flex-col space-y-4 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <li><Link href="/" className={getMobileLinkClasses("/")} onClick={() => handleLinkClick("/")}>Home</Link></li>
          <li><Link href="#event" className={getMobileLinkClasses("#event")} onClick={() => handleLinkClick("#event")}>View Events</Link></li>
          <li><Link href="#eventform" className={getMobileLinkClasses("#eventform")} onClick={() => handleLinkClick("#eventform")}>Add Event</Link></li>
          <li><Link href="/auth" className={getMobileLinkClasses("/auth")} onClick={() => handleLinkClick("/auth")}>Login / Signup</Link></li>
          <li>
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-white text-purple-700 dark:bg-gray-700 dark:text-yellow-400 hover:scale-105 transition">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
