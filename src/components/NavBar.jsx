import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/homelink-logo.png" // replace with your logo path
              alt="HomeLink"
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-gray-800">HomeLink</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a className="rounded-md px-3 py-2 text-md font-medium text-gray-300 hover:text-white">
              Rent
            </a>
            <a href="#buy" className="text-gray-600 hover:text-teal-600">
              Buy
            </a>
            <a href="#about" className="text-gray-600 hover:text-teal-600">
              About
            </a>
            <a href="#contact" className="text-gray-600  hover:text-teal-600">
              Contact
            </a>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {/* <a
                href="#login"
                className="text-gray-600 hover:text-teal-600 font-medium">
                Login
              </a> */}
              <a
                href="#signup"
                className="px-4 py-2 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition">
                Sign Up
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} className="text-gray-700">
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <a
            href="#rent"
            className="block text-gray-600 hover:text-teal-600 no-underline">
            Rent
          </a>
          <a
            href="#buy"
            className="block no-underline text-gray-600 hover:text-teal-600">
            Buy
          </a>
          <a href="#about" className="block text-gray-600 hover:text-teal-600">
            About
          </a>
          <a
            href="#contact"
            className="block text-gray-600 hover:text-teal-600">
            Contact
          </a>

          {/* Auth Buttons */}
          <a
            href="#login"
            className="block text-gray-600 hover:text-teal-600 font-medium ">
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
