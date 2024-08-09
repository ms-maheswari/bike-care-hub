import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CgMenuGridR, CgClose } from 'react-icons/cg';
import Swal from 'sweetalert2';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const role = sessionStorage.getItem("role");
  const username = sessionStorage.getItem("username");

  // Debugging: log the username and role
  console.log("Username:", username);
  console.log("Role:", role);

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

  const Home = () => {
    if (role == null) {
      navigate(`/`);
    } else if (role === "user") {
      navigate(`/customerhome`);
    } else {
      navigate(`/adminhome`);
    }
  };

  const getAvatar = (name) => {
    if (name) {
      return name.charAt(0).toUpperCase(); // Return the first letter of the username
    }
    return "";
  };

  return (
    <nav className="shadow-md w-full fixed top-0 left-0 bg-black text-white italic">
      <div className="flex items-center justify-between py-4 px-7 md:px-10 lg:px-24">
        <h3 onClick={Home} className="text-2xl font-bold cursor-pointer flex items-center">
          Ride
        </h3>
        <div 
          className="md:hidden text-3xl cursor-pointer" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <CgClose /> : <CgMenuGridR />}
        </div>
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
          {
            role == null ? (
              <>
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
                {role === "user" ? (
                  <>
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
                        CustBooking
                      </NavLink>
                    </li>
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
