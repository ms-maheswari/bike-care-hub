import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import apiUrl from '../../api';
function CustBooking() {
  // Hook for programmatic navigation
  const navigate = useNavigate();
  
  // State variables to store booking data and filter status
  const [data, setData] = useState([]); // Array to hold booking data
  const [status, setStatus] = useState(null); // Status filter for fetching bookings

  // Functions to set different status filters
  const FetchAll = () => setStatus(null); // Fetch all bookings
  const FetchPending = () => setStatus("Pending"); // Fetch only pending bookings
  const FetchReady = () => setStatus("Ready"); // Fetch only ready bookings
  const FetchCompleted = () => setStatus("Completed"); // Fetch only completed bookings

  // Fetch booking data whenever the status changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send a POST request to fetch bookings based on status
        const response = await fetch(`${apiUrl}/custbooking`, {
          method: "POST", // POST method to send data
          crossDomain: true, // Allow cross-domain requests
          headers: { "Content-Type": "application/json" }, // Content type set to JSON
          body: JSON.stringify({ status }), // Send status in request body
        });
        const result = await response.json(); // Parse JSON response
        setData(result.data); // Update state with fetched data
      } catch (error) {
        console.log(error); // Log any errors encountered during fetch
      }
    };
    fetchData(); // Call fetchData whenever status changes
  }, [status]);

  // Function to handle navigation to the update booking page
  const updateservice = (_id) => {
    sessionStorage.setItem("UpdateBookingID", _id); // Store booking ID in sessionStorage
    navigate(`../updatebooking`); // Navigate to update booking page
  }

  return (
    <div className='mt-8 lg:mt-24 p-4 h-screen pb-24'>
      {/* Page title */}
      <h1 className='text-2xl md:text-3xl font-bold text-center mb-4'>Status Checking</h1>
      
      {/* Filter buttons to fetch bookings by status */}
      <div className='flex flex-wrap justify-center space-x-2 md:space-x-4 mb-4'>
        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" onClick={FetchAll}>All</button>
        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" onClick={FetchPending}>Pending</button>
        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" onClick={FetchReady}>Ready</button>
        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" onClick={FetchCompleted}>Complete</button>
      </div>

      {/* Table to display bookings */}
      <div className='mt-4 w-full overflow-x-auto overflow-y-auto max-h-[400px]'>
        <div className="shadow-lg rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200 text-xl">
              <tr>
                <th className="px-4 py-2 text-left font-bold text-xs md:text-base">Register ID</th>
                <th className="px-4 py-2 text-left font-bold text-xs md:text-base">Date</th>
                <th className="px-4 py-2 text-left font-bold text-xs md:text-base">Name</th>
                <th className="px-4 py-2 text-left font-bold text-xs md:text-base">Service</th>
                <th className="px-4 py-2 text-left font-bold text-xs md:text-base">Status</th>
                <th className="px-4 py-2 text-left font-bold text-xs md:text-base">Action</th>
              </tr>
            </thead>
            <tbody className="text-lg">
              {data.map((row) => (
                <tr key={row._id} className="hover:bg-gray-100">
                  <td className='px-4 py-2 text-sm md:text-base'>{row._id}</td>
                  <td className="px-4 py-2 text-sm md:text-base">{row.date}</td>
                  <td className="px-4 py-2 text-sm md:text-base">{row.name}</td>
                  <td className="px-4 py-2 text-sm md:text-base">{row.service}</td>
                  <td className="px-4 py-2 text-sm md:text-base">{row.status}</td>
                  <td className="px-4 py-2">
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                      onClick={() => updateservice(row._id)} // Navigate to update booking page with booking ID
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

export default CustBooking;
