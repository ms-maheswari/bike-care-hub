import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// Booked Component
function Booked() {
  // Hook to navigate between routes
  const navigate = useNavigate();
  
  // State to hold the fetched booking data
  const [data, setData] = useState([]);

  // useEffect hook to fetch booking data when the component is mounted
  useEffect(() => {
    // Retrieve the user's email from sessionStorage
    const email = sessionStorage.getItem("Email");

    try {
      // Fetch booking data for the logged-in user
      fetch("http://localhost:5000/fetchbook", {
        method: "POST", // HTTP method for sending data to the server
        crossDomain: true, // Allows requests across different domains
        headers: { "Content-Type": "application/json" }, // Setting the request headers
        body: JSON.stringify({ email }), // Sending the user's email in the request body
      })
        .then((res) => res.json()) // Parsing the JSON response from the server
        .then((data) => {
          // Update the state with the fetched booking data
          setData(data.data);
        });
    } catch (error) {
      // Log any errors that occur during the fetch operation
      console.log(error);
    }
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Function to handle the "View" button click for updating service details
  const updateservice = (_id) => {
    // Store the booking ID in sessionStorage for later use
    sessionStorage.setItem("BookingID", _id);
    
    // Navigate to the view booking page for the selected booking
    navigate(`../viewbooking`);
  };

  return (
    <div className='p-8 pt-36 h-screen'>
      {/* Page title */}
      <h1 className="text-3xl font-bold mb-6 text-center">Status Checking</h1>
      
      {/* Container for the booking data table */}
      <div className='box shadow-lg rounded-lg'>
        <div className="overflow-x-auto">
          {/* Table to display the booking data */}
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200 text-xl">
              <tr>
                {/* Table headers */}
                <th className="py-3 px-6 font-semibold text-left">Date</th>
                <th className="py-3 px-6 font-semibold text-left">Name</th>
                <th className="py-3 px-6 font-semibold text-left">Bike Number</th>
                <th className="py-3 px-6 font-semibold text-left">Service</th>
                <th className="py-3 px-6 font-semibold text-left">Status</th>
                <th className="py-3 px-6 font-semibold text-left">Action</th>
              </tr>
            </thead>
            <tbody className='text-lg'>
              {/* Mapping over the fetched booking data and rendering rows */}
              {data.map((row) => (
                <tr key={row._id} className="border-b hover:bg-gray-100">
                  {/* Table rows displaying booking data */}
                  <td className="py-3 px-6">{row.date}</td>
                  <td className="py-3 px-6">{row.name}</td>
                  <td className="py-3 px-6">{row.vno}</td>
                  <td className="py-3 px-6">{row.service}</td>
                  <td className="py-3 px-6">{row.status}</td>
                  <td className="py-3 px-6">
                    {/* Button to view and update booking details */}
                    <button
                      className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded w-24"
                      onClick={() => { updateservice(row._id) }} // Handle the click event for viewing booking details
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Booked;
