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

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle dark mode
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    // Handle click outside mobile menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && isOpen) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // Handle intersection observer
    useEffect(() => {
        const sections = ['home', 'event', 'eventform'];
        const observer = new IntersectionObserver((entries) => {
            let currentActive = "";
            let highestIntersectionRatio = 0;

            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > highestIntersectionRatio) {
                    highestIntersectionRatio = entry.intersectionRatio;
                    currentActive = `#${entry.target.id}`;
                }
            });

            if (currentActive) {
                setActiveSection(currentActive);
            }
        }, {
            threshold: 0.5,
        });

        sections.forEach(id => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const handleLinkClick = (href: string) => {
        setActiveSection(href === '/' ? '#home' : href);
        setIsOpen(false);
    };

    const getLinkClasses = (href: string) => {
        const base = "relative px-3 sm:px-4 py-1.5 rounded-full transition-all duration-300 ease-in-out font-medium text-sm hover:scale-105";
        const active = "bg-red-900 text-white shadow-lg";
        const inactive = "text-slate-700 hover:bg-red-100";
        const isActive = activeSection === href || (href === '/' && activeSection === '#home');
        return `${base} ${isActive ? active : inactive}`;
    };

    const getMobileLinkClasses = (href: string) => {
        const base = "block py-3 px-4 rounded-xl transition-all duration-300 ease-in-out font-medium text-sm";
        const active = "bg-red-700 text-white shadow-lg";
        const inactive = "text-white/80 hover:bg-white/10";
        const isActive = activeSection === href || (href === '/' && activeSection === '#home');
        return `${base} ${isActive ? active : inactive}`;
    };

    return (
        <nav 
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
                    : 'bg-white/90 backdrop-blur-sm'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
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
                                className="relative h-8 w-8 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-all duration-300"
                            />
                        </div>
                        <div className="flex items-center space-x-1">
                            <span className="text-lg sm:text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-red-900 via-rose-900 to-slate-800">
                                Tech Events
                            </span>
                            <Sparkles className="w-4 h-4 text-red-700 animate-pulse" />
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center space-x-2">
                        <li>
                            <Link href="/" className={getLinkClasses("/")} onClick={() => handleLinkClick("/")}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="#event" className={getLinkClasses("#event")} onClick={() => handleLinkClick("#event")}>
                                View Events
                            </Link>
                        </li>
                        <li>
                            <Link href="#eventform" className={getLinkClasses("#eventform")} onClick={() => handleLinkClick("#eventform")}>
                                Add Events
                            </Link>
                        </li>
                        <li>
                            <Link href="/auth" className="ml-3">
                                <button className="bg-gradient-to-r from-red-700 to-slate-800 text-white font-semibold px-4 py-1.5 rounded-full hover:from-red-800 hover:to-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm">
                                    Login / Signup
                                </button>
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="ml-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                                aria-label="Toggle dark mode"
                            >
                                {darkMode ? (
                                    <Sun className="w-5 h-5 text-yellow-500" />
                                ) : (
                                    <Moon className="w-5 h-5 text-slate-700" />
                                )}
                            </button>
                        </li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6 text-slate-700" />
                        ) : (
                            <Menu className="w-6 h-6 text-slate-700" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                style={{ marginTop: '64px' }}
            >
                <ul
                    ref={mobileMenuRef}
                    className={`flex flex-col space-y-4 p-6 bg-slate-900 min-h-screen transform transition-transform duration-300 ${
                        isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <li>
                        <Link href="/" className={getMobileLinkClasses("/")} onClick={() => handleLinkClick("/")}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="#event" className={getMobileLinkClasses("#event")} onClick={() => handleLinkClick("#event")}>
                            View Events
                        </Link>
                    </li>
                    <li>
                        <Link href="#eventform" className={getMobileLinkClasses("#eventform")} onClick={() => handleLinkClick("#eventform")}>
                            Add Events
                        </Link>
                    </li>
                    <li>
                        <Link href="/auth" className={getMobileLinkClasses("/auth")} onClick={() => handleLinkClick("/auth")}>
                            Login / Signup
                        </Link>
                    </li>
                    <li className="flex justify-center pt-4">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? (
                                <Sun className="w-5 h-5 text-yellow-400" />
                            ) : (
                                <Moon className="w-5 h-5 text-white" />
                            )}
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
