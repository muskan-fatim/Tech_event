'use client'
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import SearchBar from "./Hero";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
  className="fixed top-0 left-0 w-full 
    bg-gradient-to-r from-indigo-800 to-purple-800 
    dark:from-purple-950 dark:to-indigo-900 
    text-white dark:text-violet-100 
    p-4 shadow-lg z-50 transition-colors duration-300"
  aria-label="Main Navigation"
>
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    <h1 className="text-2xl font-bold tracking-wider">Tech Events</h1>

    {/* Desktop Menu */}
    <ul className="hidden md:flex space-x-6 items-center">
      <li>
        <Link
          href="/"
          className="hover:text-purple-200 dark:hover:text-purple-300 transition-colors"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="#event"
          className="hover:text-purple-200 dark:hover:text-purple-300 transition-colors"
        >
          Add Event
        </Link>
      </li>
      <li>
        <Link
          href="#eventform"
          className="hover:text-purple-200 dark:hover:text-purple-300 transition-colors"
        >
          View Events
        </Link>
      </li>
      <li>
        <ThemeToggle />
      </li>
    </ul>

    {/* Mobile Menu Button */}
    <button
      className="md:hidden"
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-label="Toggle menu"
    >
      {isOpen ? <X size={28} /> : <Menu size={28} />}
    </button>
  </div>

  {/* Mobile Menu Dropdown */}
  {isOpen && (
    <ul
      id="mobile-menu"
      className="md:hidden flex flex-col mt-4 space-y-2 
        bg-indigo-900 dark:bg-gradient-to-br dark:from-purple-950 dark:to-indigo-900 
        p-4 rounded-lg border border-white/10 dark:border-purple-700/30 transition-all"
    >
      <li>
        <a
          href="/"
          className="block py-2 px-4 rounded hover:bg-indigo-800 dark:hover:bg-purple-700/20 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Home
        </a>
      </li>
      <li>
        <a
          href="#eventform"
          className="block py-2 px-4 rounded hover:bg-indigo-800 dark:hover:bg-purple-700/20 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Add Event
        </a>
      </li>
      <li>
        <a
          href="#event"
          className="block py-2 px-4 rounded hover:bg-indigo-800 dark:hover:bg-purple-700/20 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          View Events
        </a>
      </li>
      <li>
        <ThemeToggle />
      </li>
    </ul>
  )}
</nav>

  );
}