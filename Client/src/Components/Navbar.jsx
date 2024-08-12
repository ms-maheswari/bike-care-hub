import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CgMenuGridR, CgClose } from 'react-icons/cg';
import Swal from 'sweetalert2';

// The Navbar component defines the navigation bar at the top of the application.
// It includes navigation links, a responsive menu toggle, and an avatar dropdown for logged-in users.
const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // State to manage the opening and closing of the mobile menu
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false); // State to manage the opening and closing of the avatar dropdown menu

  const role = sessionStorage.getItem("role"); // Retrieves the user's role from sessionStorage
  const username = sessionStorage.getItem("username"); // Retrieves the user's username from sessionStorage

  // Handles user logout, clears session storage, and navigates back to the home page.
  const logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!'
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        navigate('/');
        Swal.fire(
          'Logged Out!',
          'You have been logged out.',
          'success'
        );
      }
    });
  };

  // Handles navigation based on the user's role: redirects to either the customer home or admin home.
  const Home = () => {
    if (role == null) {
      navigate(`/`);
    } else if (role === "user") {
      navigate(`/customerhome`);
    } else {
      navigate(`/adminhome`);
    }
  };

  // Returns the first letter of the username in uppercase as the avatar.
  const getAvatar = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black shadow-md z-50 italic">
      <div className="flex items-center justify-between py-4 px-7 md:px-10 lg:px-24">
        {/* Logo and Home navigation */}
        <h3 onClick={Home} className="text-2xl font-bold cursor-pointer flex items-center">
          BikeCare Hub
        </h3>
        
        {/* Mobile menu toggle button */}
        <div 
          className="md:hidden text-3xl cursor-pointer" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <CgClose /> : <CgMenuGridR />}
        </div>

        {/* Navigation links */}
        <ul className={`md:flex md:items-center md:space-x-8 space-y-4 md:space-y-0 absolute md:static left-0 w-full md:w-auto md:pl-0 pl-7 md:top-0 top-16 transition-all duration-500 ${menuOpen ? 'top-16 bg-white' : 'top-[-200px]'} md:bg-transparent`}>
          <li>
            {/* Home link */}
            <NavLink 
              to="/" 
              className={({ isActive }) => `inline-block text-lg hover:text-red-500 ${isActive ? 'border-b-2 border-red-500' : ''}`}
            >
              Home
            </NavLink>
          </li>
          <li>
            {/* About link */}
            <NavLink 
              to="/about" 
              className={({ isActive }) => `inline-block text-lg hover:text-red-500 ${isActive ? 'border-b-2 border-red-500' : ''}`}
            >
              About
            </NavLink>
          </li>
          {role == null ? (
            <>
              {/* Login and Signup links displayed if the user is not logged in */}
              <li>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => `inline-block text-lg hover:text-red-500 ${isActive ? 'border-b-2 border-red-500' : ''}`}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/signup" 
                  className={({ isActive }) => `inline-block text-lg hover:text-red-500 ${isActive ? 'border-b-2 border-red-500' : ''}`}
                >
                  Signup
                </NavLink>
              </li>
            </>
          ) : (
            <>
              {role === "user" ? (
                <>
                  {/* Links specific to a logged-in user */}
                  <li>
                    <NavLink 
                      to="/customerbooking" 
                      className={({ isActive }) => `inline-block text-lg hover:text-red-500 ${isActive ? 'border-b-2 border-red-500' : ''}`}
                    >
                      Book
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/customerhistory" 
                      className={({ isActive }) => `inline-block text-lg hover:text-red-500 ${isActive ? 'border-b-2 border-red-500' : ''}`}
                    >
                      History
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/customerbooked" 
                      className={({ isActive }) => `inline-block text-lg hover:text-red-500 ${isActive ? 'border-b-2 border-red-500' : ''}`}
                    >
                      Status
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  {/* Links specific to an admin user */}
                  <li>
                    <NavLink 
                      to="/adminservice" 
                      className={({ isActive }) => `inline-block text-lg hover:text-red-500 ${isActive ? 'border-b-2 border-red-500' : ''}`}
                    >
                      Service
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/admincustbooking" 
                      className={({ isActive }) => `inline-block text-lg hover:text-red-500 ${isActive ? 'border-b-2 border-red-500' : ''}`}
                    >
                      Booking
                    </NavLink>
                  </li>
                </>
              )}
              {/* Avatar and dropdown menu for logged-in users */}
              <div className="hidden md:flex items-center relative">
                <div 
                  className="w-10 h-10 bg-red-600 text-white flex items-center justify-center rounded-full mr-4 text-lg cursor-pointer"
                  onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
                >
                  {getAvatar(username)}
                </div>
                {avatarMenuOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-red-600 text-white rounded-lg shadow-lg">
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 hover:bg-red-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
