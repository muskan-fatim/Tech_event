import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold">About Us</h3>
            <p className="mt-2 text-gray-200">
              We bring you the best tech events in town. Stay updated with conferences, meetups, and more.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300 transition">Home</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 transition">Events</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 transition">About</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300 transition">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold">Contact</h3>
            <p className="mt-2">Email: info@techevents.com</p>
            <p>Phone: +123 456 7890</p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="hover:text-gray-300 transition">Facebook</a>
              <a href="#" className="hover:text-gray-300 transition">Twitter</a>
              <a href="#" className="hover:text-gray-300 transition">LinkedIn</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-400 pt-4 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Tech Events. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
