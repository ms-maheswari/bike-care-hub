import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import apiUrl from '../../api';
function AddService() {
  // State variables for storing service details
  const [sname, setSName] = useState(''); // Service name
  const [sdesc, setSDesc] = useState(''); // Service description
  const [samount, setSAmount] = useState(''); // Service amount
  
  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle navigation when the Cancel button is clicked
  const handleCancel = () => {
    navigate('../adminservice'); // Redirect to the admin service page
  };

  // Validation patterns for input fields
  const alpha = /^[A-Za-z ]+$/; // Pattern to allow only alphabetic characters and spaces
  const alphanumeric = /^[0-9a-zA-Z ]+$/; // Pattern to allow alphanumeric characters and spaces

  // Function to handle form submission
  const handleSubmit = () => {
    // Validate the service name
    if (sname && alpha.test(sname)) {
      // Validate the service description
      if (sdesc) {
        // Validate the service amount
        if (samount && samount > 0 && alphanumeric.test(samount)) {
          try {
            // Send service details to the server
            fetch(`${apiUrl}/addservice`, {
              method: "POST", // Use POST method to send data
              crossDomain: true, // Allow cross-domain requests
              headers: { "Content-Type": "application/json" }, // Set content type to JSON
              body: JSON.stringify({ sname, sdesc, samount }), // Send service details in the request body
            })
              .then((res) => res.json()) // Parse JSON response
              .then((data) => {
                // Check if the service was added successfully
                if (data.status === "ok") {
                  Swal.fire("Success", "Service added successfully!", "success"); // Show success alert
                  navigate('../adminservice'); // Redirect to the admin service page
                } else {
                  Swal.fire("Error", "Service already exists!", "error"); // Show error alert if service already exists
                }
              });
          } catch (error) {
            console.log(error); // Log any errors encountered during the fetch request
          }
        } else {
          Swal.fire("Invalid Input", "Please enter a valid service amount!", "error"); // Show error alert for invalid service amount
        }
      } else {
        Swal.fire("Invalid Input", "Please enter a valid service description!", "error"); // Show error alert for missing service description
      }
    } else {
      Swal.fire("Invalid Input", "Please enter a valid service name!", "error"); // Show error alert for invalid service name
    }
  };

  return (
    <div className="pt-24 flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Container for form */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Service</h1>
        {/* Form for adding a new service */}
        <form className="space-y-6">
          {/* Input field for service name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 text-lg font-semibold mb-2">Service Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) => setSName(e.target.value)} // Update state with the input value
            />
          </div>
          {/* Textarea for service description */}
          <div>
            <label htmlFor="desc" className="block text-gray-700 text-lg font-semibold mb-2">Service Description</label>
            <textarea
              id="desc"
              rows="6"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) => setSDesc(e.target.value)} // Update state with the textarea value
            />
          </div>
          {/* Input field for service amount */}
          <div>
            <label htmlFor="amount" className="block text-gray-700 text-lg font-semibold mb-2">Amount</label>
            <input
              type="text"
              id="amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) => setSAmount(e.target.value)} // Update state with the input value
            />
          </div>
          {/* Buttons for confirming or canceling the action */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleSubmit} // Handle form submission
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={handleCancel} // Handle cancel action
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
