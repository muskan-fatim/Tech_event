'use client'
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const mobileMenuRef = useRef<HTMLUListElement>(null);

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
    const sections = ["home", "event", "eventform"];
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      let currentActive = "";
      let highestRatio = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
          highestRatio = entry.intersectionRatio;
          currentActive = `#${entry.target.id}`;
        }
      });

      if (currentActive) setActiveSection(currentActive);
    }, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
      observer.disconnect();
    };
  }, []);

  const handleLinkClick = (href: string) => {
    setActiveSection(href === "/" ? "#home" : href);
    setIsOpen(false);
  };

  const getLinkClasses = (href: string) => {
    const base = "px-4 py-2 rounded-full transition duration-300";
    const active = "bg-gradient-to-r from-blue-700 to-purple-700 text-white font-semibold shadow";
    const hover = "hover:bg-white/20";
    return `${base} ${activeSection === href || (href === "/" && activeSection === "#home") ? active : hover}`;
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-800 to-purple-800 text-white p-4 shadow-lg z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Tech Events</Link>

        <ul className="hidden md:flex space-x-4 items-center">
          <li><Link href="/" className={getLinkClasses("/")} onClick={() => handleLinkClick("/")}>Home</Link></li>
          <li><Link href="#event" className={getLinkClasses("#event")} onClick={() => handleLinkClick("#event")}>View Events</Link></li>
          <li><Link href="#eventform" className={getLinkClasses("#eventform")} onClick={() => handleLinkClick("#eventform")}>Add Event</Link></li>
          <li><ThemeToggle /></li>
          <li>
            <Link
              href="/auth"
              className="bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-1.5 rounded-xl text-white font-semibold shadow hover:opacity-90 transition"
            >
              🔐 Login / Signup
            </Link>
          </li>
        </ul>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <ul
          ref={mobileMenuRef}
          className="md:hidden flex flex-col mt-4 space-y-2 bg-indigo-900 p-4 rounded-lg border border-white/10 transition-all"
        >
          <li><Link href="/" className="py-2 px-4 hover:bg-indigo-700 rounded" onClick={() => handleLinkClick("/")}>Home</Link></li>
          <li><Link href="#event" className="py-2 px-4 hover:bg-indigo-700 rounded" onClick={() => handleLinkClick("#event")}>View Events</Link></li>
          <li><Link href="#eventform" className="py-2 px-4 hover:bg-indigo-700 rounded" onClick={() => handleLinkClick("#eventform")}>Add Event</Link></li>
          <li><ThemeToggle /></li>
          <li>
            <Link
              href="/auth"
              className="block text-center py-2 px-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white font-semibold shadow hover:opacity-90"
              onClick={() => setIsOpen(false)}
            >
              🔐 Login / Signup
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
