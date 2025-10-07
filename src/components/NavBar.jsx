import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  // const { user, logout } = useAuth ;
  const auth = useAuth();
  console.log(auth)
  const { user, login, logout } = auth || {};
  console.log(user)

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
                    onClick={logout}
                    className="cursor-pointer px-4 py-2 border rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition">
                    Logout
                  </div>
                </div>
              </>
            )}
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

// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// export default function Navbar() {
//   const { user, logout } = useAuth();

//   return (
//     <nav className="flex justify-between items-center p-4 bg-white shadow">
//       <h1 className="text-xl font-bold">HomeLink</h1>
//       <div className="flex gap-4">
//         <Link to="/">Home</Link>
//         <Link to="/listings">Listings</Link>

//         {!user ? (
//           <>
//             <Link to="/login">Login</Link>
//             <Link to="/signup">Signup</Link>
//           </>
//         ) : (
//           <>
//             <Link to="/profile">Profile</Link>
//             <button onClick={logout}>Logout</button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }
