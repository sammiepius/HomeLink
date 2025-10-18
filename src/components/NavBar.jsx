import { useState, useEffect, useRef, useContext } from 'react';
import { ChevronDown, LogOut, Menu, Settings, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  // const { user, logout } = useAuth ;
  const auth = useContext(AuthContext);
  // console.log(auth)
  const { user, login, logout } = auth || {};
  console.log(user);

  const isHome = location.pathname === '/';

  useEffect(
    () => {
      if (!isHome) return;
      const handleScroll = () => {
        setScrolled(window.scrollY > 50); // activate after 50px
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    },
    [],
    [isHome]
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (email) => {
    if (!email) return '?';
    return email.charAt(0).toUpperCase();
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isHome
          ? scrolled
            ? 'bg-white shadow-md'
            : 'bg-transparent'
          : 'bg-white shadow-md'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="src\assets/home.png" // replace with your logo path
              alt="HomeLink"
              className="h-18 w-18 cursor-pointer"
              onClick={() => navigate('/')}
            />
            {/* <span

              className={`text-xl font-bold ${
                scrolled ? 'text-gray-800' : 'text-white'
              }`}>
              HomeLink
            </span> */}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <div
              href="#properties"
              onClick={() => navigate('/properties')}
              className={`cursor-pointer font-medium
                ${
                  isHome
                    ? scrolled
                      ? 'text-gray-600 hover:text-teal-600'
                      : 'text-white hover:text-teal-200'
                    : 'text-gray-600 hover:text-teal-600'
                }`}>
              Properties
            </div>
            <div
              // style={{ textDecoration: 'none', color: 'gray' }}
              // to="/listings/rent"
              // href="#rent"
              onClick={() => navigate('/listings/rent')}
              className={`cursor-pointer font-medium  ${
                isHome
                  ? scrolled
                    ? 'text-gray-600 hover:text-teal-600'
                    : 'text-white hover:text-teal-200'
                  : 'text-gray-600 hover:text-teal-600'
              }`}>
              For Rent
            </div>
            <div
              onClick={() => navigate('/listings/buy')}
              // to="/listings/buy"
              href="#listing"
              // onClick={() => navigate('/landlord')}
              className={`cursor-pointer font-medium ${
                isHome
                  ? scrolled
                    ? 'text-gray-600 hover:text-teal-600'
                    : 'text-white hover:text-teal-200'
                  : 'text-gray-600 hover:text-teal-600'
              }`}>
              For Sale
            </div>
            {/* <div
              onClick={() => navigate('/landlord')}
              href="#contact"
              className={`cursor-pointer font-medium ${
                scrolled
                  ? 'text-gray-600 hover:text-teal-600'
                  : 'text-white hover:text-teal-200'
              }`}>
              Contact
            </div> */}

            {/* Auth Buttons */}
            {!user ? (
              <>
                <div className="flex items-center space-x-4">
                  <div
                    href="login"
                    onClick={() => navigate('/login')}
                    className={`cursor-pointer font-medium  ${
                      isHome
                        ? scrolled
                          ? 'text-gray-600 hover:text-teal-600'
                          : 'text-white hover:text-teal-200'
                        : 'text-gray-600 hover:text-teal-600'
                    }`}
                    // className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-600 border rounded-lg hover:bg-teal-100"
                  >
                    Login
                  </div>
                  <div
                    href="#signup"
                    onClick={() => navigate('/signup')}
                    className="cursor-pointer px-4 py-2 border rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition">
                    Sign Up
                  </div>
                </div>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                {/* Profile Toggle */}
                <div
                  className="flex items-center space-x-2 cursor-pointer bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
                  onClick={() => setOpenDropdown(!openDropdown)}>
                  {/* Avatar / Initial */}
                  <div className="w-8 h-8 flex items-center justify-center bg-teal-600 text-white font-semibold rounded-full">
                    {getInitials(user.email)}
                  </div>
                  {/* <span className="font-medium text-gray-700">
                    {user.email.split('@')[0]}
                  </span> */}
                  <ChevronDown
                    size={18}
                    className={`text-gray-600 transition-transform ${
                      openDropdown ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                {/* Animated Dropdown */}
                <AnimatePresence>
                  {openDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-lg py-2 border border-gray-100">
                      <div
                        onClick={() => {
                          setOpenDropdown(false);
                          navigate('/profile');
                        }}
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 cursor-pointer">
                        <Settings size={16} className="mr-2" />
                        Account Settings
                      </div>

                      <div
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 cursor-pointer">
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className={scrolled ? 'text-gray-900' : 'text-white'}>
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
          <div
            href="#properties"
            onClick={() => navigate('/properties')}
            className={`cursor-pointer font-medium
                ${
                  scrolled
                    ? 'text-gray-600 hover:text-teal-600'
                    : 'text-white hover:text-teal-200'
                }`}>
            Properties
          </div>
          <div
            onClick={() => navigate('/listings/rent')}
            className={`cursor-pointer font-medium  ${
              scrolled
                ? 'text-gray-600 hover:text-teal-600'
                : 'text-white hover:text-teal-200'
            }`}>
            For Rent
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
            For Sale
          </div>

          {/* Auth Buttons */}
          {!user ? (
            <>
              <div className="flex items-center space-x-4">
                <div
                  href="login"
                  onClick={() => navigate('/login')}
                  className={`cursor-pointer font-medium  ${
                    isHome
                      ? scrolled
                        ? 'text-gray-600 hover:text-teal-600'
                        : 'text-white hover:text-teal-200'
                      : 'text-gray-600 hover:text-teal-600'
                  }`}
                  // className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-600 border rounded-lg hover:bg-teal-100"
                >
                  Login
                </div>
                <div
                  href="#signup"
                  onClick={() => navigate('/signup')}
                  className="cursor-pointer px-4 py-2 border rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition">
                  Sign Up
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-4">
                <div
                  href="login"
                  // onClick={() => navigate('/login')}
                  className={`cursor-pointer font-medium  ${
                    isHome
                      ? scrolled
                        ? 'text-gray-600 hover:text-teal-600'
                        : 'text-white hover:text-teal-200'
                      : 'text-gray-600 hover:text-teal-600'
                  }`}
                  // className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-600 border rounded-lg hover:bg-teal-100"
                >
                  Profile
                </div>
                <div
                  href=""
                  onClick={handleLogout}
                  className="cursor-pointer px-4 py-2 border rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition">
                  Logout
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
