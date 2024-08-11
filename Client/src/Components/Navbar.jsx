import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CgMenuGridR, CgClose } from 'react-icons/cg';
import Swal from 'sweetalert2';

// Navbar component responsible for rendering the navigation bar
const Navbar = () => {
  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // State for controlling the menu's visibility on mobile
  const [menuOpen, setMenuOpen] = useState(false);

  // State for controlling the avatar dropdown menu's visibility
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);

  // Retrieve the user's role and username from sessionStorage
  const role = sessionStorage.getItem("role");
  const username = sessionStorage.getItem("username");

  // Debugging: log the username and role
  console.log("Username:", username);
  console.log("Role:", role);

  // Function to handle user logout
  const logout = () => {
    // Display a confirmation alert before logging out
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
        // Clear session storage and navigate to the homepage
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

  // Function to navigate the user to the appropriate home page based on their role
  const Home = () => {
    if (role == null) {
      navigate(`/`); // Navigate to the default homepage if no role is defined
    } else if (role === "user") {
      navigate(`/customerhome`); // Navigate to the customer home page
    } else {
      navigate(`/adminhome`); // Navigate to the admin home page
    }
  };

  // Function to get the avatar text, which is the first letter of the username
  const getAvatar = (name) => {
    if (name) {
      return name.charAt(0).toUpperCase(); // Return the first letter of the username
    }
    return ""; // Return an empty string if the name is not available
  };

  return (
    <nav className="shadow-md w-full fixed top-0 left-0 bg-black text-white italic">
      <div className="flex items-center justify-between py-4 px-7 md:px-10 lg:px-24">
        {/* Logo / Home link */}
        <h3 onClick={Home} className="text-2xl font-bold cursor-pointer flex items-center">
          BikeCare Hub
        </h3>
        
        {/* Hamburger menu for mobile view */}
        <div 
          className="md:hidden text-3xl cursor-pointer" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <CgClose /> : <CgMenuGridR />}
        </div>

        {/* Navigation links */}
        <ul className={`md:flex md:items-center md:space-x-8 space-y-4 md:space-y-0 absolute md:static left-0 w-full md:w-auto md:pl-0 pl-7 md:top-0 top-16 transition-all duration-500 ${menuOpen ? 'top-16' : 'top-[-200px]'}`}>
          {/* Always include the Home and About links */}
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => `block text-lg hover:text-red-500 ${isActive ? 'border-b-2 border-red-500' : ''}`}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({ isActive }) => `block text-lg hover:text-red-500 ${isActive ? 'border-b-2 border-red-500' : ''}`}
            >
              About
            </NavLink>
          </li>
          
          {/* Conditional rendering of links based on user's role */}
          {
            role == null ? (
              <>
                {/* If no role is defined, show Login and Signup links */}
                <li>
                  <NavLink 
                    to="/login" 
                    className={({ isActive }) => `block text-lg hover:text-red-500 ${isActive ? 'border-b-2 border-red-500' : ''}`}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/signup" 
                    className={({ isActive }) => `block text-lg hover:text-red-500 ${isActive ? 'border-b-2 border-red-500' : ''}`}
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {/* If the user is logged in */}
                {role === "user" ? (
                  <>
                    {/* User-specific links */}
                    <li>
                      <NavLink 
                        to="/customerbooking" 
                        className={({ isActive }) => `block text-lg hover:text-red-500 ${isActive ? 'border-b-2 border-red-500' : ''}`}
                      >
                        Book
                      </NavLink>
                    </li>
                    <li>
                      <NavLink 
                        to="/customerhistory" 
                        className={({ isActive }) => `block text-lg hover:text-red-500 ${isActive ? 'border-b-2 border-red-500' : ''}`}
                      >
                        History
                      </NavLink>
                    </li>
                    <li>
                      <NavLink 
                        to="/customerbooked" 
                        className={({ isActive }) => `block text-lg hover:text-red-500 ${isActive ? 'border-b-2 border-red-500' : ''}`}
                      >
                        Status
                      </NavLink>
                    </li>
                    {/* Avatar dropdown menu for logged-in users */}
                    <div className="hidden md:flex items-center relative">
                      <div 
                        className="w-10 h-10 bg-red-600 text-white flex items-center justify-center rounded-full mr-4 text-lg cursor-pointer"
                        onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
                      >
                        {getAvatar(username)}
                      </div>
                      {avatarMenuOpen && (
                        <div className="absolute right-0 mt-24 w-32 bg-gray-800 text-white rounded-lg shadow-lg">
                          <button 
                            onClick={logout}
                            className=" block w-full text-left px-4 py-2 hover:bg-red-700"
                          >
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Admin-specific links */}
                    <li>
                      <NavLink 
                        to="/adminservice" 
                        className={({ isActive }) => `block text-lg hover:text-red-500 ${isActive ? 'border-b-2 border-red-500' : ''}`}
                      >
                        Service
                      </NavLink>
                    </li>
                    <li>
                      <NavLink 
                        to="/admincustbooking" 
                        className={({ isActive }) => `block text-lg hover:text-red-500 ${isActive ? 'border-b-2 border-red-500' : ''}`}
                      >
                        Booking
                      </NavLink>
                    </li>
                    {/* Avatar dropdown menu for admins */}
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
              </>
            )
          }
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
