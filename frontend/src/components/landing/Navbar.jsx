import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'HOME', href: '#', active: true },
  { name: 'SERVICES', href: '#' },
  { name: 'ABOUT PROJECTS', href: '#' },
  { name: 'TESTIMONIALS', href: '#' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-blue-100 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto relative">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <svg aria-hidden="true" className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path d="M3 10l9-7 9 7v11a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4H9v4a2 2 0 01-2 2H3a2 2 0 01-2-2V10z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-extrabold text-blue-700 text-lg tracking-wide drop-shadow">Real Trust</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-sm font-semibold">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={`px-2 py-1 rounded transition-colors ${
                  link.active
                    ? 'text-blue-700 bg-blue-100'
                    : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                } focus:outline-none focus:ring-2 focus:ring-blue-300`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Button */}
        <a
          href="#"
          className="hidden md:inline-block bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-lg px-5 py-2 shadow transition focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          CONTACT
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={toggleMenu}
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute left-0 top-full w-full bg-white/95 shadow-lg border-b border-blue-100 transition-all duration-300 md:hidden z-20 ${
            isOpen
              ? 'opacity-100 pointer-events-auto translate-y-0'
              : 'opacity-0 pointer-events-none -translate-y-2'
          }`}
        >
          <ul className="flex flex-col space-y-2 px-6 py-4 text-base font-semibold">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`block px-2 py-2 rounded transition-colors ${
                    link.active
                      ? 'text-blue-700 bg-blue-100'
                      : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                  } focus:outline-none focus:ring-2 focus:ring-blue-300`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#"
                className="block mt-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-2 text-center shadow transition focus:outline-none focus:ring-2 focus:ring-orange-300"
                onClick={() => setIsOpen(false)}
              >
                CONTACT
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
