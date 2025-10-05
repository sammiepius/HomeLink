import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // activate after 50px
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/homelink-logo.png" // replace with your logo path
              alt="HomeLink"
              className="h-8 w-8"
            />
            <span
              className={`text-xl font-bold ${
                scrolled ? 'text-gray-800' : 'text-white'
              }`}>
              HomeLink
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <div
              href="#properties"
              onClick={() => navigate('/properties')}
              className={`cursor-pointer font-medium ${
                scrolled
                  ? 'text-gray-600 hover:text-teal-600'
                  : 'text-white hover:text-teal-200'
              }`}>
              Properties
            </div>
            <div
              // style={{ textDecoration: 'none', color: 'gray' }}
              // to="/listings/rent"
              // href="#rent"
              onClick={() => navigate('/listings/rent')}
              className={`cursor-pointer font-medium  ${
                scrolled
                  ? 'text-gray-600 hover:text-teal-600'
                  : 'text-white hover:text-teal-200'
              }`}>
              Rent
            </div>
            <div
              onClick={() => navigate('/listings/buy')}
              // to="/listings/buy"
              href="#listing"
              // onClick={() => navigate('/landlord')}
              className={`cursor-pointer font-medium ${
                scrolled
                  ? 'text-gray-600 hover:text-teal-600'
                  : 'text-white hover:text-teal-200'
              }`}>
              Buy
            </div>
            <div
              href="#contact"
              className={`cursor-pointer font-medium ${
                scrolled
                  ? 'text-gray-600 hover:text-teal-600'
                  : 'text-white hover:text-teal-200'
              }`}>
              Contact
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <div
                href="login"
                onClick={() => navigate('/login')}
                className={`cursor-pointer font-medium ${
                  scrolled
                    ? 'text-gray-600 hover:text-teal-600'
                    : 'text-white hover:text-teal-200'
                }`}>
                Login
              </div>
              <div
                href="#signup"
                onClick={() => navigate('/signup')}
                className="cursor-pointer px-4 py-2 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition">
                Sign Up
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className={scrolled ? 'text-gray-700' : 'text-white'}>
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className={`md:hidden px-4 pb-4 space-y-3 ${
            scrolled ? 'bg-white' : 'bg-gray-900'
          }`}>
          <a
            href="#rent"
            className={`block ${
              scrolled
                ? 'text-gray-600 hover:text-teal-600'
                : 'text-white hover:text-teal-200'
            }`}>
            Rent
          </a>
          <a
            href="#buy"
            className={`block ${
              scrolled
                ? 'text-gray-600 hover:text-teal-600'
                : 'text-white hover:text-teal-200'
            }`}>
            Buy
          </a>
          <a
            href="#about"
            className={`block ${
              scrolled
                ? 'text-gray-600 hover:text-teal-600'
                : 'text-white hover:text-teal-200'
            }`}>
            About
          </a>
          <a
            href="#contact"
            className={`block ${
              scrolled
                ? 'text-gray-600 hover:text-teal-600'
                : 'text-white hover:text-teal-200'
            }`}>
            Contact
          </a>

          {/* Auth Buttons */}
          <a
            href="#login"
            className={`block font-medium ${
              scrolled
                ? 'text-gray-600 hover:text-teal-600'
                : 'text-white hover:text-teal-200'
            }`}>
            Login
          </a>
          <a
            href="#signup"
            className="block w-full text-center px-4 py-2 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition">
            Sign Up
          </a>
        </div>
      )}
    </nav>
  );
}
