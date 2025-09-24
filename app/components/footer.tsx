import React from "react";
import { Calendar, MapPin, Sparkles, Mail, Phone, Facebook, Twitter, Linkedin, Heart } from "lucide-react";

// Footer component for the Tech Events website
// Includes animated background, social links, quick navigation, contact info, and copyright
const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-red-400" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-red-400" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-red-400" }
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "View Events", href: "#event" },
    { name: "Add Events", href: "#eventform" },
    { name: "About Us", href: "#about" }
  ];

  const stats = [
    { icon: Calendar, number: '10K+', label: 'Events' },
    { icon: MapPin, number: '500+', label: 'Cities' },
    { icon: Sparkles, number: '50K+', label: 'Users' }
  ];

  return (
    <footer className="bg-gradient-to-r from-blue-600 to-purple-700 dark:from-gray-900 dark:to-gray-800 text-white py-10 transition-all duration-300 relative overflow-hidden font-inter">
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-red-900 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-rose-900 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-red-900 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/5 via-rose-900/5 to-red-900/5"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-red-900 rounded-full blur-sm opacity-50"></div>
                <img 
                  src="/logo.png"
                  alt="Tech Events Logo" 
                  className="relative h-12 w-12 rounded-full border-2 border-white/20" 
                />
              </div>
              <div className="flex items-center space-x-2">
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

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => {
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

          {/* Quick Links */}
          <div>
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

          {/* Contact Info */}
          <div>
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

            {/* Social Links */}
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

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
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
    </footer>
  );
};

export default Footer;
