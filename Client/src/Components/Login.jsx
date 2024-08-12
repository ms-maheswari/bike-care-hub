import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

const Login = () => {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // State variables for username and password
  const [uname, setUserName] = useState('');
  const [password, setPass] = useState('');

  // Store default values in session storage (note: this will reset on every render)
  // 

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hardcoded admin credentials check
    if ((uname === "mahes7439@gmail.com" || uname === "7123789456") && password === "@Mahes123") {
      sessionStorage.setItem("role", "admin"); // Set role to admin
      navigate("../adminhome"); // Navigate to admin home
      return;
    }

    try {
      // Send POST request to login endpoint
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        crossDomain: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uname, password }),
      });

      // Parse response JSON
      const result = await response.json();

      console.log("Result: ", result); // Log the result for debugging

      if (result.status === "ok") {
        // On successful login, store user data in session storage
        sessionStorage.setItem("username", uname);
  sessionStorage.setItem("role", "user");
        sessionStorage.setItem("Email", result.data.email);
        sessionStorage.setItem("Phone", result.data.phone);
        swal('Success!', 'Login Successful', 'success');
        sessionStorage.setItem("role", "user"); // Set role to user
        navigate("../customerhome"); // Navigate to customer home
      } else {
        swal('Login Failed!', 'Invalid credentials', 'error'); // Show error if login fails
      }
    } catch (error) {
      console.error("Error: ", error); // Log any errors
    }
  };

  return (
    <div className="p-10 flex items-center justify-center min-h-screen bg-black">
      <div className="container max-w-lg mx-auto p-6 bg-black bg-opacity-10 rounded-lg mt-12 shadow-lg shadow-red-500 backdrop-filter backdrop-blur-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Log in</h1>
        <form>
          {/* Username input */}
          <div className="form-group mb-4 flex flex-col md:flex-row md:items-center">
            <label htmlFor="uname" className="block text-gray-300 mb-2 md:mb-0 md:w-1/3">Email</label>
            <input
              type="text"
              name="uname"
              id="uname"
              value={uname}
              onChange={(e) => setUserName(e.target.value)}
              className="form-control w-full md:w-2/3 px-3 py-2 border rounded-md bg-gray-700 bg-opacity-30 text-white"
            />
          </div>
          {/* Password input */}
          <div className="form-group mb-4 flex flex-col md:flex-row md:items-center">
            <label htmlFor="password" className="block text-gray-300 mb-2 md:mb-0 md:w-1/3">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPass(e.target.value)}
              className="form-control w-full md:w-2/3 px-3 py-2 border rounded-md bg-gray-700 bg-opacity-30 text-white"
            />
          </div>
          {/* Submit button */}
          <div className=" justify-between">
            <button
              onClick={handleSubmit}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
