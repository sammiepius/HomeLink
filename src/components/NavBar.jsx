import { useState, useEffect, useRef, useContext } from 'react';
import {
  ChevronDown,
  Eye,
  LogOut,
  Menu,
  Settings,
  Home,
  Building,
  User,
  UserPlus,
  UserCircle,
  X,
} from 'lucide-react';
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

  // const isHome = location.pathname === '/';

  // useEffect(
  //   () => {
  //     if (!isHome) return;
  //     const handleScroll = () => {
  //       setScrolled(window.scrollY > 50); // activate after 50px
  //     };
  //     window.addEventListener('scroll', handleScroll);
  //     return () => window.removeEventListener('scroll', handleScroll);
  //   },
  //   [],
  //   [isHome]
  // );

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
      className="fixed w-full z-50 transition-all duration-300 bg-white shadow-md"
      // className={`fixed w-full z-50 transition-all duration-300 ${
      //   isHome
      //     ? scrolled
      //       ? 'bg-white shadow-md'
      //       : 'bg-transparent'
      //     : 'bg-white shadow-md'
      // }`}
    >
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
              className="cursor-pointer font-medium text-gray-600 hover:text-teal-600"
              // className={`cursor-pointer font-medium
              //   ${
              //     isHome
              //       ? scrolled
              //         ? 'text-gray-600 hover:text-teal-600'
              //         : 'text-white hover:text-teal-200'
              //       : 'text-gray-600 hover:text-teal-600'
              //   }`}
            >
              Properties
            </div>
            <div
              // style={{ textDecoration: 'none', color: 'gray' }}
              // to="/listings/rent"
              // href="#rent"
              onClick={() => navigate('/listings/rent')}
              className="cursor-pointer font-medium text-gray-600 hover:text-teal-600"
              // className={`cursor-pointer font-medium  ${
              //   isHome
              //     ? scrolled
              //       ? 'text-gray-600 hover:text-teal-600'
              //       : 'text-white hover:text-teal-200'
              //     : 'text-gray-600 hover:text-teal-600'
              // }`}
            >
              For Rent
            </div>
            <div
              onClick={() => navigate('/listings/buy')}
              // to="/listings/buy"
              // href="#listing"
              // onClick={() => navigate('/landlord')}
              // className={`cursor-pointer font-medium ${
              //   isHome
              //     ? scrolled
              //       ? 'text-gray-600 hover:text-teal-600'
              //       : 'text-white hover:text-teal-200'
              //     : 'text-gray-600 hover:text-teal-600'
              // }`}
              className="cursor-pointer font-medium text-gray-600 hover:text-teal-600">
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
                    // className={`cursor-pointer font-medium  ${
                    //   isHome
                    //     ? scrolled
                    //       ? 'text-gray-600 hover:text-teal-600'
                    //       : 'text-white hover:text-teal-200'
                    //     : 'text-gray-600 hover:text-teal-600'
                    // }`}
                    className="cursor-pointer font-medium text-gray-600 hover:text-teal-600"
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
                  className="flex items-center space-x-2 cursor-pointe px-3 py-2 rounded-lg cursor-pointer transition"
                  onClick={() => setOpenDropdown(!openDropdown)}>
                  {/* Avatar / Initial */}
                  <div className="w-8 h-8 flex items-center justify-center bg-teal-600 text-white font-semibold rounded-full">
                    {getInitials(user.email)}
                  </div>
                  {/* <span className="font-medium text-gray-700">
                    {user.name.split('@')[0]}
                  </span> */}
                  {/* <ChevronDown
                    size={18}
                    className={`text-gray-600 transition-transform ${
                      openDropdown ? 'rotate-180' : ''
                    }`}
                  /> */}
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
                          const role = localStorage.getItem('role');
                          if (role === 'LANDLORD') navigate('/landlord');
                          else if (role === 'TENANT') navigate('/profile');
                          else navigate('/');
                        }}
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-teal-50 hover:text-teal-600 cursor-pointer">
                        <Eye size={16} className="mr-2" />
                        View Profile
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
            <button onClick={() => setOpen(!open)} className="text-gray-900">
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE SIDE DRAWER */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay (light blur + tint) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              className="fixed top-0 left-0 h-full w-72 bg-teal-700 text-white p-6 z-50 shadow-2xl rounded-r-2xl flex flex-col">
              {/* Top: Logo + Close button */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <img
                    src="/src/assets/home.png"
                    className="h-12 w-12 object-contain drop-shadow-md"
                    alt="Logo"
                  />
                  <span className="font-semibold text-xl tracking-wide">
                    HomeLink
                  </span>
                </div>

                <X
                  className="text-white w-6 h-6 cursor-pointer hover:scale-110 transition"
                  onClick={() => setOpen(false)}
                />
              </div>

              {/* Divider */}
              <div className="border-b border-white/20 mb-6"></div>

              {/* Menu Items */}
              <div className="space-y-4 flex-1">
                {/* PROPERTIES */}
                <div
                  onClick={() => {
                    navigate('/properties');
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 text-lg font-medium cursor-pointer p-2 rounded-lg hover:bg-white/15 hover:shadow transition">
                  <Eye className="w-5 h-5" />
                  Properties
                </div>

                {/* FOR RENT */}
                <div
                  onClick={() => {
                    navigate('/listings/rent');
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 text-lg font-medium cursor-pointer p-2 rounded-lg hover:bg-white/15 hover:shadow transition">
                  <Home className="w-5 h-5" />
                  For Rent
                </div>

                {/* FOR SALE */}
                <div
                  onClick={() => {
                    navigate('/listings/buy');
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 text-lg font-medium cursor-pointer p-2 rounded-lg hover:bg-white/15 hover:shadow transition">
                  <Building className="w-5 h-5" />
                  For Sale
                </div>
              </div>

              {/* Divider */}
              <div className="border-b border-white/20 mt-2 mb-4"></div>

              {/* AUTH SECTION */}
              {!user ? (
                <div className="space-y-4">
                  {/* LOGIN */}
                  <div
                    onClick={() => {
                      navigate('/login');
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg border border-white/30 hover:bg-white/15 cursor-pointer transition">
                    <User className="w-5 h-5" />
                    Login
                  </div>

                  {/* SIGN UP */}
                  <div
                    onClick={() => {
                      navigate('/signup');
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white text-teal-700 font-semibold hover:bg-gray-100 cursor-pointer transition">
                    <UserPlus className="w-5 h-5" />
                    Sign Up
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* MY PROFILE (Highlighted) */}
                  <div
                    // onClick={() => {
                    //   navigate('/profile');
                    //   setOpen(false);
                    // }}
                    onClick={() => {
                      setOpenDropdown(false);
                      const role = localStorage.getItem('role');
                      if (role === 'LANDLORD') navigate('/landlord');
                      else if (role === 'TENANT') navigate('/profile');
                      else navigate('/');
                    }}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg bg-teal-900 shadow-md cursor-pointer transition">
                    <UserCircle className="w-5 h-5" />
                    My Profile
                  </div>

                  {/* LOGOUT */}
                  <div
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer transition">
                    <LogOut className="w-5 h-5" />
                    Logout
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
