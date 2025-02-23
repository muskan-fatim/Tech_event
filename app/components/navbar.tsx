'use client'
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icons for menu toggle
import SearchBar from "./Hero";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className=" bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg" aria-label="Main Navigation">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo / Brand Name */}
                <h1 className="text-2xl font-bold">Tech Events</h1>
                     
                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6">
                    <li><Link href="/" className="hover:text-gray-400">Home</Link></li>
                    <li><Link href="#event" className="hover:text-gray-400">Add Event</Link></li>
                    <li><Link href="#eventform" className="hover:text-gray-400">View Events</Link></li>
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
                <ul id="mobile-menu" className="md:hidden flex flex-col mt-4 space-y-2 bg-gray-700 p-3 rounded-lg">
                    <li><a href="/" className="block py-2 px-4 hover:bg-gray-600" onClick={() => setIsOpen(false)}>Home</a></li>
                    <li><a href="#eventform" className="block py-2 px-4 hover:bg-gray-600" onClick={() => setIsOpen(false)}>Add Event</a></li>
                    <li><a href="#event" className="block py-2 px-4 hover:bg-gray-600" onClick={() => setIsOpen(false)}>View Events</a></li>
                </ul>
            )}
        </nav>
    );
}
