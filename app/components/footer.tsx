import React from "react";
import { Calendar, MapPin, Sparkles, Mail, Phone, Facebook, Twitter, Linkedin, Heart } from "lucide-react";

// This component presents a modern, responsive footer with a dark black and red color scheme,
// matching the style of the hero section provided by the user.
const Footer: React.FC = () => {
  // Social media links with updated hover colors for the new theme
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-red-400" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-red-400" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-red-400" }
  ];

  // Quick navigation links
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "View Events", href: "#event" },
    { name: "Add Events", href: "#eventform" },
    { name: "About Us", href: "#about" }
  ];

  return (
    <footer className="bg-gradient-to-r from-blue-600 to-purple-700 dark:from-gray-900 dark:to-gray-800 text-white py-10 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold">About Us</h3>
            <p className="mt-2 text-gray-200 dark:text-gray-400">
              We bring you the best tech events in town. Stay updated with conferences, meetups, and more.

              
              // The main footer container now uses a dark gradient similar to the hero section.
    <footer className="relative bg-gradient-to-br from-black via-slate-950 to-black text-white overflow-hidden font-inter">
      {/* Animated Background Elements - these are now darker shades of red and rose, matching the hero's aesthetic */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-red-900 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-rose-900 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-red-900 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Subtle gradient overlay to enhance the theme */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/5 via-rose-900/5 to-red-900/5"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                {/* Logo with a red gradient blur */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-red-900 rounded-full blur-sm opacity-50"></div>
                <img 
                  src="/logo.png"
                  alt="Tech Events Logo" 
                  className="relative h-12 w-12 rounded-full border-2 border-white/20" 
                />
              </div>
              <div className="flex items-center space-x-2">
                {/* Brand name with a red gradient text effect */}
                <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-red-200 to-red-200">
                  Tech Events
                </span>
                <Sparkles className="w-5 h-5 text-red-400 animate-pulse" />
              </div>
            </div>
            
            <p className="text-white/80 text-lg leading-relaxed mb-6 max-w-md">
              Connecting innovators, creators, and learners through extraordinary tech experiences. 
              Discover workshops, meetups, and events that shape the future.

            
            </p>

            {/* Stats - icons and text are now red/white */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Calendar, number: '10K+', label: 'Events' },
                { icon: MapPin, number: '500+', label: 'Cities' },
                { icon: Sparkles, number: '50K+', label: 'Users' }
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <IconComponent className="w-5 h-5 text-red-900" />
                    </div>
                    <div className="text-xl font-bold text-white">{stat.number}</div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Links Section */}
          <div>

            
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300 dark:hover:text-gray-400 transition">Home</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 dark:hover:text-gray-400 transition">Events</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 dark:hover:text-gray-400 transition">About</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 dark:hover:text-gray-400 transition">Contact</a>
              </li>

              
              <h3 className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-100 to-rose-100">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-white/70 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 hover:translate-x-1 block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            
            
            <h3 className="text-xl font-semibold">Contact</h3>
            <p className="mt-2 text-gray-200 dark:text-gray-400">Email: info@techevents.com</p>
            <p className="text-gray-200 dark:text-gray-400">Phone: +123 456 7890</p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="hover:text-gray-300 dark:hover:text-gray-400 transition">Facebook</a>
              <a href="#" className="hover:text-gray-300 dark:hover:text-gray-400 transition">Twitter</a>
              <a href="#" className="hover:text-gray-300 dark:hover:text-gray-400 transition">LinkedIn</a>

              
              <h3 className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-100 to-red-100">
              Get In Touch
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors duration-300">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Mail className="w-4 h-4" />
                </div>
                <span>info@techevents.com</span>
              </div>
              
              <div className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors duration-300">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+123 456 7890</span>
              </div>
            </div>

            {/* Social Links with hover effect */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className={`p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white/70 ${social.color} hover:bg-white/20 hover:scale-110 transform transition-all duration-300`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}

              
              </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-400 dark:border-gray-600 pt-4 text-center text-gray-300 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Tech Events. All rights reserved.</p>

              
              

        {/* Bottom Section - copyright and terms */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-center md:text-left">
              <p>&copy; {new Date().getFullYear()} Tech Events. All rights reserved.</p>
            </div>
            
            <div className="flex items-center space-x-2 text-white/60">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>for the tech community</span>
            </div>
            
            <div className="flex space-x-6 text-sm text-white/60">
              <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
            </div>
          </div>

              </div>
      </div>
    </footer>
  );
};

export default Footer;
