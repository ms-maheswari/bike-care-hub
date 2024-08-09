import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function CustBooking() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(null);

  const FetchAll = () => setStatus(null);
  const FetchPending = () => setStatus("Pending");
  const FetchReady = () => setStatus("Ready");
  const FetchCompleted = () => setStatus("Completed");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/custbooking", {
          method: "POST",
          crossDomain: true,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [status]);

  const updateservice = (_id) => {
    sessionStorage.setItem("UpdateBookingID", _id);
    navigate(`../updatebooking`);
  }

  return (
    <div className='mt-8 lg:mt-24 p-4 h-screen pb-24'>
      <h1 className='text-2xl md:text-3xl font-bold text-center mb-4'>Status Checking</h1>
      <div className='flex flex-wrap justify-center space-x-2 md:space-x-4 mb-4'>
        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" onClick={FetchAll}>All</button>
        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" onClick={FetchPending}>Pending</button>
        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" onClick={FetchReady}>Ready</button>
        <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" onClick={FetchCompleted}>Complete</button>
      </div>
      <div className='mt-4 w-full overflow-x-auto'>
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
                  <td className="px-4 py-2 text-sm md:text-base">{row.vno}</td>
                  <td className="px-4 py-2 text-sm md:text-base">{row.service}</td>
                  <td className="px-4 py-2">
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                      onClick={() => updateservice(row._id)}
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
