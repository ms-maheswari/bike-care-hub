import React, { useState, useEffect } from 'react';

function History() {
  // State to store the history data fetched from the server
  const [data, setData] = useState([]);

  // useEffect hook to fetch the history data when the component mounts
  useEffect(() => {
    // Retrieve the user's email from sessionStorage
    const email = sessionStorage.getItem("Email");

    try {
      // Make a POST request to the server to fetch the user's history
      fetch("http://localhost:5000/history", {
        method: "POST", // Use POST method to send data to the server
        crossDomain: true, // Allow requests to be made across different domains
        headers: { "Content-Type": "application/json" }, // Specify the request payload format as JSON
        body: JSON.stringify({ email }), // Send the user's email in the request body as JSON
      })
        .then((res) => res.json()) // Parse the server response as JSON
        .then((data) => {
          // Update the state with the fetched history data
          setData(data.data);
        });
    } catch (error) {
      // Log any errors that occur during the fetch request
      console.log(error);
    }
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className="p-8 pt-36 h-screen">
      {/* Page title */}
      <h1 className="text-3xl font-bold mb-6 text-center">History</h1>
      
      {/* Container for the history data table */}
      <div className="box shadow-lg rounded-lg">
        <div className="overflow-x-auto">
          {/* Table to display the history data */}
          <table className="min-w-full bg-white">
            <thead className="text-xl">
              <tr className="w-full bg-gray-200 text-left">
                {/* Table headers */}
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold">Name</th>
                <th className="px-6 py-3 font-semibold">Bike Number</th>
                <th className="px-6 py-3 font-semibold">Service</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="text-lg">
              {/* Map through the fetched data and display each row in the table */}
              {data.map((row) => (
                <tr key={row._id} className="hover:bg-gray-100">
                  {/* Table cells displaying the data */}
                  <td className="px-6 py-4">{row.date}</td>
                  <td className="px-6 py-4">{row.name}</td>
                  <td className="px-6 py-4">{row.vno}</td>
                  <td className="px-6 py-4">{row.service.join(', ')}</td> {/* Join services as a comma-separated string */}
                  <td className="px-6 py-4">{row.status}</td>
                  <td className="px-6 py-4">
                    {/* Button to perform an action, such as viewing detailed information (action implementation not provided) */}
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
