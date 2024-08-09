import React, { useState, useEffect } from 'react';

function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const email = sessionStorage.getItem("Email");
    try {
      fetch("http://localhost:5000/history", {
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

  return (
    <div className="p-8 pt-36 h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">History</h1>
      <div className="box shadow-lg rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="text-xl">
              <tr className="w-full bg-gray-200 text-left">
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold">Name</th>
                <th className="px-6 py-3 font-semibold">Bike Number</th>
                <th className="px-6 py-3 font-semibold">Service</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="text-lg">
              {data.map((row) => (
                <tr key={row._id} className="hover:bg-gray-100">
                  <td className="px-6 py-4">{row.date}</td>
                  <td className="px-6 py-4">{row.name}</td>
                  <td className="px-6 py-4">{row.vno}</td>
                  <td className="px-6 py-4">{row.service.join(', ')}</td> {/* Join services as a comma-separated string */}
                  <td className="px-6 py-4">{row.status}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                      onClick={() => { /* Add any action if needed */ }}
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

export default History;
