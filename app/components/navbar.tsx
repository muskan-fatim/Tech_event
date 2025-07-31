'use client'
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const mobileMenuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const sections = ["home", "event", "eventform"];
    const observer = new IntersectionObserver(
      (entries) => {
        let current = "";
        let maxRatio = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            current = `#${entry.target.id}`;
          }
        });
        if (current) setActiveSection((prev) => (prev !== current ? current : prev));
      },
      { threshold: 0.5 }
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

  const getLinkClasses = (href: string) => {
    const isActive = activeSection === href || (href === "/" && activeSection === "#home");
    return `px-4 py-2 rounded-full transition-all duration-300 ease-in-out ${
      isActive
        ? "bg-gradient-to-r from-blue-700 to-purple-700 font-semibold text-white shadow hover:scale-105"
        : "hover:bg-white/20"
    }`;
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" onClick={() => setActiveSection("#home")} className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-8 rounded-full" />
          <span className="text-2xl font-bold">Tech Events</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4 items-center">
          <li>
            <Link href="/" className={getLinkClasses("/")} onClick={() => setActiveSection("#home")}>
              Home
            </Link>
          </li>
          <li>
            <Link href="#event" className={getLinkClasses("#event")} onClick={() => setActiveSection("#event")}>
              View Events
            </Link>
          </li>
          <li>
            <Link href="#eventform" className={getLinkClasses("#eventform")} onClick={() => setActiveSection("#eventform")}>
              Add Event
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
          <li>
            <Link
              href="/auth"
              className="bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 rounded-xl text-white font-semibold shadow hover:opacity-90 transition"
            >
              🔐 Login / Signup
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <ul
        ref={mobileMenuRef}
        className={`md:hidden flex flex-col space-y-3 bg-gray-800/90 text-white p-4 rounded-lg mt-2 transition-all ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <li><Link href="/" onClick={() => setIsOpen(false)}>Home</Link></li>
        <li><Link href="#event" onClick={() => setIsOpen(false)}>View Events</Link></li>
        <li><Link href="#eventform" onClick={() => setIsOpen(false)}>Add Event</Link></li>
        <li><ThemeToggle /></li>
        <li>
          <Link
            href="/auth"
            onClick={() => setIsOpen(false)}
            className="block text-center py-2 px-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white font-semibold"
          >
            🔐 Login / Signup
          </Link>
        </li>
      </ul>
    </nav>
  );
}
