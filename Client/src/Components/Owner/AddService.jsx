import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


function AddService() {
  const [sname, setSName] = useState('');
  const [sdesc, setSDesc] = useState('');
  const [samount, setSAmount] = useState('');
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('../adminservice');
  };

  // Validation patterns
  const alpha = /^[A-Za-z ]+$/; // Only Alpha
  const alphanumeric = /^[0-9a-zA-Z ]+$/; // Validate Alpha Numeric

  const handleSubmit = () => {
    if (sname && alpha.test(sname)) {
      if (sdesc) {
        if (samount && samount > 0 && alphanumeric.test(samount)) {
          try {
            fetch("http://localhost:5000/addservice", {
              method: "POST",
              crossDomain: true,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sname, sdesc, samount }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.status === "ok") {
                  Swal.fire("Success", "Service added successfully!", "success");
                  navigate('../adminservice');
                } else {
                  Swal.fire("Error", "Service already exists!", "error");
                }
              });
          } catch (error) {
            console.log(error);
          }
        } else {
          Swal.fire("Invalid Input", "Please enter a valid service amount!", "error");
        }
      } else {
        Swal.fire("Invalid Input", "Please enter a valid service description!", "error");
      }
    } else {
      Swal.fire("Invalid Input", "Please enter a valid service name!", "error");
    }
  };

  return (
    <div className="pt-24 flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Service</h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-lg font-semibold mb-2">Service Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) => setSName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="desc" className="block text-gray-700 text-lg font-semibold mb-2">Service Description</label>
            <textarea
              id="desc"
              rows="6"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) => setSDesc(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-gray-700 text-lg font-semibold mb-2">Amount</label>
            <input
              type="text"
              id="amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) => setSAmount(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddService;
