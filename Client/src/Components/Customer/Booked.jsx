import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Booked() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const email = sessionStorage.getItem("Email");
    try {
      fetch("http://localhost:5000/fetchbook", {
        method: "POST",
        crossDomain: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateservice = (_id) => {
    sessionStorage.setItem("BookingID", _id);
    navigate(`../viewbooking`);
  };

  return (
    <div className='p-8 pt-36 h-screen'>
      <h1 className="text-3xl font-bold mb-6 text-center">Status Checking</h1>
      <div className='box shadow-lg rounded-lg'>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-200 text-xl">
              <tr>
                <th className="py-3 px-6 font-semibold text-left">Date</th>
                <th className="py-3 px-6 font-semibold text-left">Name</th>
                <th className="py-3 px-6 font-semibold text-left">Bike Number</th>
                <th className="py-3 px-6 font-semibold text-left">Service</th>
                <th className="py-3 px-6 font-semibold text-left">Status</th>
                <th className="py-3 px-6 font-semibold text-left">Action</th>
              </tr>
            </thead>
            <tbody className='text-lg'>
              {data.map((row) => (
                <tr key={row._id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{row.date}</td>
                  <td className="py-3 px-6">{row.name}</td>
                  <td className="py-3 px-6">{row.vno}</td>
                  <td className="py-3 px-6">{row.service}</td>
                  <td className="py-3 px-6">{row.status}</td>
                  <td className="py-3 px-6">
                    <button
                      className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded w-24"
                      onClick={() => { updateservice(row._id) }}
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
