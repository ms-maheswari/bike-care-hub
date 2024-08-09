import { useState } from 'react';
import validator from 'validator';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.isEmail(email) || email === null) {
      swal('Invalid Email!', 'Please enter a valid email address.', 'error');
      return;
    }
    if (phone.length !== 10) {
      swal('Invalid Phone Number!', 'Please enter a valid phone number.', 'error');
      return;
    }
    if (pass !== cpass || pass === null || cpass === null) {
      swal('Password Mismatch!', 'Passwords do not match.', 'error');
      return;
    }
    if (!validator.isStrongPassword(pass, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      swal('Weak Password!', 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol.', 'error');
      return;
    }
    try {
      fetch("http://localhost:5000/signup", {
        method: "POST",
        crossDomain: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, pass }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            swal('Registration Successful!', 'You have registered successfully.', 'success')
              .then(() => {
                navigate('../login');
              });
          } else {
            swal('Registration Failed!', 'User email or phone number already exists.', 'error');
          }
        });
    } catch (error) {
      console.log(error);
      swal('Error!', 'An error occurred during registration. Please try again.', 'error');
    }
  }

  return (
    <div className="p-10 flex items-center justify-center min-h-screen bg-black">
      <div className="container max-w-lg mx-auto p-6 bg-black bg-opacity-10 rounded-lg mt-12 shadow-lg shadow-red-500 backdrop-filter backdrop-blur-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4 flex flex-col md:flex-row md:items-center">
            <label htmlFor="email" className="block text-gray-300 mb-2 md:mb-0 md:w-1/3">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control w-full md:w-2/3 px-3 py-2 border rounded-md bg-gray-700 bg-opacity-30 text-white"
            />
          </div>
          <div className="form-group mb-4 flex flex-col md:flex-row md:items-center">
            <label htmlFor="phone" className="block text-gray-300 mb-2 md:mb-0 md:w-1/3">Phone</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control w-full md:w-2/3 px-3 py-2 border rounded-md bg-gray-700 bg-opacity-30 text-white"
            />
          </div>
          <div className="form-group mb-4 flex flex-col md:flex-row md:items-center">
            <label htmlFor="password" className="block text-gray-300 mb-2 md:mb-0 md:w-1/3">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="form-control w-full md:w-2/3 px-3 py-2 border rounded-md bg-gray-700 bg-opacity-30 text-white"
            />
          </div>
          <div className="form-group mb-4 flex flex-col md:flex-row md:items-center">
            <label htmlFor="cpass" className="block text-gray-300 mb-2 md:mb-0 md:w-1/3">Confirm Password</label>
            <input
              type="password"
              name="cpass"
              id="cpass"
              value={cpass}
              onChange={(e) => setCPass(e.target.value)}
              className="form-control w-full md:w-2/3 px-3 py-2 border rounded-md bg-gray-700 bg-opacity-30 text-white"
            />
          </div>
          <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Signup;
