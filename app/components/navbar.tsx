'use client';
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
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
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

    const observer = new IntersectionObserver(
      entries => {
        let currentActive = "";
        let highestIntersectionRatio = 0;

        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > highestIntersectionRatio) {
            highestIntersectionRatio = entry.intersectionRatio;
            currentActive = `#${entry.target.id}`;
          }
        });

        if (currentActive) {
          setActiveSection(prev => (prev !== currentActive ? currentActive : prev));
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.5 }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (href: string) => {
    setActiveSection(href === '/' ? '#home' : href);
    setIsOpen(false);
  };

  const getLinkClasses = (href: string) => {
    const isActive = activeSection === href || (href === '/' && activeSection === '#home');
    return `px-4 py-2 rounded-full transition-all duration-300 ease-in-out ${
      isActive
        ? "bg-purple-600 text-white font-semibold shadow-md"
        : "hover:bg-purple-300/20 text-white"
    }`;
  };

  const getMobileLinkClasses = (href: string) => {
    const isActive = activeSection === href || (href === '/' && activeSection === '#home');
    return `block py-3 px-6 rounded-md transition-colors duration-300 ${
      isActive
        ? "bg-purple-700 text-white font-semibold"
        : "hover:bg-purple-500/20 text-white"
    }`;
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-purple-400 via-purple-500 to-indigo-500 dark:from-purple-950 dark:to-indigo-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" onClick={() => handleLinkClick("/")} className="text-2xl font-bold tracking-wide">Tech Events</Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-4 items-center">
          <li><Link href="/" className={getLinkClasses("/")} onClick={() => handleLinkClick("/")}>Home</Link></li>
          <li><Link href="#event" className={getLinkClasses("#event")} onClick={() => handleLinkClick("#event")}>View Events</Link></li>
          <li><Link href="#eventform" className={getLinkClasses("#eventform")} onClick={() => handleLinkClick("#eventform")}>Add Events</Link></li>
          <li><ThemeToggle /></li>
        </ul>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <ul
        ref={mobileMenuRef}
        className={`md:hidden flex flex-col gap-3 px-6 py-4 absolute top-16 left-0 w-full bg-purple-900/90 backdrop-blur-md transition-all ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <li><Link href="/" className={getMobileLinkClasses("/")} onClick={() => handleLinkClick("/")}>Home</Link></li>
        <li><Link href="#event" className={getMobileLinkClasses("#event")} onClick={() => handleLinkClick("#event")}>View Events</Link></li>
        <li><Link href="#eventform" className={getMobileLinkClasses("#eventform")} onClick={() => handleLinkClick("#eventform")}>Add Event</Link></li>
        <li><ThemeToggle /></li>
      </ul>
    </nav>
  );
}

}