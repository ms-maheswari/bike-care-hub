import { useState } from 'react';
import validator from 'validator';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import apiUrl from '../api';
const Signup = () => {
  // State to store the email input value
  const [email, setEmail] = useState("");
  
  // State to store the phone input value
  const [phone, setPhone] = useState("");
  
  // State to store the password input value
  const [pass, setPass] = useState("");
  
  // State to store the confirm password input value
  const [cpass, setCPass] = useState("");
  
  // useNavigate hook to programmatically navigate the user
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Validate the email address
    if (!validator.isEmail(email) || email === null) {
      // Display an error if the email is invalid
      swal('Invalid Email!', 'Please enter a valid email address.', 'error');
      return;
    }

    // Validate the phone number (should be exactly 10 digits)
    if (phone.length !== 10) {
      // Display an error if the phone number is invalid
      swal('Invalid Phone Number!', 'Please enter a valid phone number.', 'error');
      return;
    }

    // Validate that both password fields match
    if (pass !== cpass || pass === null || cpass === null) {
      // Display an error if the passwords do not match
      swal('Password Mismatch!', 'Passwords do not match.', 'error');
      return;
    }

    // Validate that the password is strong using the validator library
    if (!validator.isStrongPassword(pass, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      // Display an error if the password is weak
      swal('Weak Password!', 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol.', 'error');
      return;
    }

    // Try block to catch any errors during the API call
    try {
      // Make a POST request to the signup API endpoint
      fetch(`${apiUrl}/signup`, {
        method: "POST",
        crossDomain: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, pass }), // Send email, phone, and password as the request body
      })
        .then((res) => res.json())
        .then((data) => {
          // If registration is successful, show a success message and navigate to login page
          if (data.status === "ok") {
            swal('Registration Successful!', 'You have registered successfully.', 'success')
              .then(() => {
                navigate('../login'); // Navigate to login page after successful registration
              });
          } else {
            // If registration fails, show an error message
            swal('Registration Failed!', 'User email or phone number already exists.', 'error');
          }
        });
    } catch (error) {
      // Log any errors to the console and show an error message
      console.log(error);
      swal('Error!', 'An error occurred during registration. Please try again.', 'error');
    }
  }

  return (
    <div className="p-10 flex items-center justify-center min-h-screen bg-black">
      <div className="container max-w-lg mx-auto p-6 bg-black bg-opacity-10 rounded-lg mt-12 shadow-lg shadow-red-500 backdrop-filter backdrop-blur-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Sign up</h1>
        <form onSubmit={handleSubmit}>
          {/* Email input field */}
          <div className="form-group mb-4 flex flex-col md:flex-row md:items-center">
            <label htmlFor="email" className="block text-gray-300 mb-2 md:mb-0 md:w-1/3">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state on input change
              className="form-control w-full md:w-2/3 px-3 py-2 border rounded-md bg-gray-700 bg-opacity-30 text-white"
            />
          </div>

          {/* Phone number input field */}
          <div className="form-group mb-4 flex flex-col md:flex-row md:items-center">
            <label htmlFor="phone" className="block text-gray-300 mb-2 md:mb-0 md:w-1/3">Phone</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)} // Update phone state on input change
              className="form-control w-full md:w-2/3 px-3 py-2 border rounded-md bg-gray-700 bg-opacity-30 text-white"
            />
          </div>

          {/* Password input field */}
          <div className="form-group mb-4 flex flex-col md:flex-row md:items-center">
            <label htmlFor="password" className="block text-gray-300 mb-2 md:mb-0 md:w-1/3">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)} // Update password state on input change
              className="form-control w-full md:w-2/3 px-3 py-2 border rounded-md bg-gray-700 bg-opacity-30 text-white"
            />
          </div>

          {/* Confirm password input field */}
          <div className="form-group mb-4 flex flex-col md:flex-row md:items-center">
            <label htmlFor="cpass" className="block text-gray-300 mb-2 md:mb-0 md:w-1/3">Confirm Password</label>
            <input
              type="password"
              name="cpass"
              id="cpass"
              value={cpass}
              onChange={(e) => setCPass(e.target.value)} // Update confirm password state on input change
              className="form-control w-full md:w-2/3 px-3 py-2 border rounded-md bg-gray-700 bg-opacity-30 text-white"
            />
          </div>

          {/* Submit button */}
          <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup;
