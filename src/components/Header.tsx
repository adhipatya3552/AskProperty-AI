// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { useModals } from '../hooks/useModals';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { openModal } = useModals();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // common text color for links & logo
  const linkColor = scrolled ? 'text-black' : 'text-white';
  const iconColor = scrolled ? 'text-black' : 'text-white';

  return (
      <header
        className={`
              fixed w-full z-50 transition-all duration-300
              ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}
            `}
          >
        <nav className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <div className="logo flex items-center">
            <a href="#home" className="flex items-center">
              <img 
                src="/src/logo.png" 
                alt="AskProperty AI Logo" 
                className="w-12 h-12 rounded-full object-cover mr-2"
              />
              <span className={`font-bold text-xl ${linkColor}`}>
                AskProperty AI
              </span>
            </a>
          </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <a
              href="#home"
              className={`${linkColor} hover:text-blue-600 transition-colors`}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={`${linkColor} hover:text-blue-600 transition-colors`}
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="#customer-reviews"
              className={`${linkColor} hover:text-blue-600 transition-colors`}
            >
              Reviews
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={`${linkColor} hover:text-blue-600 transition-colors`}
            >
              Contact Us
            </a>
          </li>
          <li>
            <button
              onClick={() => openModal('login')}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </li>
          <li>
            <button
              onClick={() => openModal('signup')}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${iconColor}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
