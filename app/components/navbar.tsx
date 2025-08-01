'use client';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

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

    const getLinkClasses = (href: string) => {
        const baseClasses = "px-4 py-2 rounded-full transition-all duration-300 ease-in-out";
        const activeClasses = "bg-gradient-to-r from-blue-700 to-purple-700 font-semibold text-white shadow-md text-glow-effect hover:scale-105 transform";
        const hoverClasses = "hover:bg-white/20";
        const isActive = activeSection === href || (href === '/' && activeSection === '#home');
        return `${baseClasses} ${isActive ? activeClasses : hoverClasses}`;
    };

    const getMobileLinkClasses = (href: string) => {
        const baseClasses = "block py-3 px-6 rounded-md transition-colors duration-300 ease-in-out text-gray-300";
        const activeClasses = "bg-gray-600 font-bold text-teal-300";
        const hoverClasses = "hover:bg-gray-600 hover:text-white";
        const isActive = activeSection === href || (href === '/' && activeSection === '#home');
        return `${baseClasses} ${isActive ? activeClasses : hoverClasses}`;
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg z-50" aria-label="Main Navigation">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2" onClick={() => handleLinkClick("/")}>
                    <img src="/logo.png" alt="Tech Events Logo" className="h-8 w-8 rounded-full" />
                    <span className="text-2xl font-bold text-glow-effect">Tech Events</span>
                </Link>

                <ul className="hidden md:flex space-x-2 items-center">
                    <li><Link href="/" className={getLinkClasses("/")} onClick={() => handleLinkClick("/")}>Home</Link></li>
                    <li><Link href="#event" className={getLinkClasses("#event")} onClick={() => handleLinkClick("#event")}>View Events</Link></li>
                    <li><Link href="#eventform" className={getLinkClasses("#eventform")} onClick={() => handleLinkClick("#eventform")}>Add Events</Link></li>
                    <li>
                        <Link href="/auth" className="ml-4">
                            <button className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-full hover:bg-yellow-200 transition">
                                Login / Signup
                            </button>
                        </Link>
                    </li>
                </ul>

                <button
                    className="md:hidden z-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-300"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            <ul
                id="mobile-menu"
                ref={mobileMenuRef}
                className={`md:hidden flex flex-col mt-4 space-y-2 p-3 rounded-lg absolute top-0 left-0 w-full h-screen bg-gray-700/80 backdrop-blur-md transition-all duration-300 ease-in-out transform ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`}
                style={{ paddingTop: '80px' }}
            >
                <li><Link href="/" className={getMobileLinkClasses("/")} onClick={() => handleLinkClick("/")}>Home</Link></li>
                <li><Link href="#event" className={getMobileLinkClasses("#event")} onClick={() => handleLinkClick("#event")}>View Events</Link></li>
                <li><Link href="#eventform" className={getMobileLinkClasses("#eventform")} onClick={() => handleLinkClick("#eventform")}>Add Event</Link></li>
                <li><Link href="/auth" className={getMobileLinkClasses("/auth")} onClick={() => handleLinkClick("/auth")}>Login / Signup</Link></li>
            </ul>
        </nav>
    );
}
