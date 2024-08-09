import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
const Login = () => {
  const navigate = useNavigate();
  const [uname, setUserName] = useState('');
  const [password, setPass] = useState('');
  sessionStorage.setItem("username", uname);
  sessionStorage.setItem("role", "user");
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hardcoded admin credentials check
    if ((uname === "mahes7439@gmail.com" || uname === "7123789456") && password === "@Mahes123") {
      sessionStorage.setItem("role", "admin");
      navigate("../adminhome");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        crossDomain: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uname, password }),
      });

      const result = await response.json();

      console.log("Result: ", result); // Log the result to debug

      if (result.status === "ok") {
        sessionStorage.setItem("Email", result.data.email);
        sessionStorage.setItem("Phone", result.data.phone);
        swal('Success!', 'Login Successful', 'success');
        sessionStorage.setItem("role", "user");
        navigate("../customerhome");
      } else {
        swal('Login Failed!', 'Invalid credentials', 'error');
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    alert("Forgot Password");
    navigate("../forgotpassword");
  };

  return (
    <div className="p-10 flex items-center justify-center min-h-screen bg-black">
      <div className="container max-w-lg mx-auto p-6 bg-black bg-opacity-10 rounded-lg mt-12 shadow-lg shadow-red-500 backdrop-filter backdrop-blur-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Log in</h1>
        <form>
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
          <div className=" justify-between">
            <button
              onClick={handleSubmit}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
            >
              Submit
            </button>
            <button
              onClick={handleCancel}
              className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200 mt-2"
            >
              Forgot Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
