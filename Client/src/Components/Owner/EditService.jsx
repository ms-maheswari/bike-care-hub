import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import apiUrl from '../../api';
function EditService() {
    // State variables for service details
    const [sname, setSName] = useState(); // Service name
    const [sdesc, setSDesc] = useState(); // Service description
    const [samount, setSAmount] = useState(); // Service amount
    const navigate = useNavigate(); // Hook for programmatic navigation
    const [data, setData] = useState([]); // State to hold fetched service data
    const _id = sessionStorage.getItem("changeser"); // Retrieve service ID from session storage

    // Fetch the service details when the component mounts or _id changes
    useEffect(() => {
        try {
            fetch(`${apiUrl}/fetchservice`, {
                method: "POST", // POST method to send data
                crossDomain: true, // Allow cross-domain requests
                headers: { "Content-Type": "application/json" }, // Content type set to JSON
                body: JSON.stringify({ _id }), // Send service ID in request body
            })
                .then((res) => res.json()) // Parse JSON response
                .then((data) => {
                    setData(data.data); // Set the fetched data to state
                });
        } catch (error) {
            console.log(error); // Log any errors encountered during fetch
        }
    }, [_id]); // Dependency array ensures this effect runs whenever _id changes

    // Handle cancel button click
    const handleCancel = () => {
        sessionStorage.setItem("changeser", null); // Clear service ID from session storage
        navigate(`../adminservice`); // Navigate back to the admin service page
    };

    // Validation patterns
    const alpha = /^[A-Za-z ]+$/; // Only alphabetical characters for service name
    const alphanumeric = /^[0-9a-zA-Z ]+$/; // Alphanumeric characters for amount

    // Handle form submission
    const handleSubmit = () => {
        // Update data object with state values if they are defined
        if (sname !== undefined) {
            data.sname = sname;
        }
        if (sdesc !== undefined) {
            data.sdesc = sdesc;
        }
        if (samount !== undefined) {
            data.samount = samount;
        }

        // Validate service name
        if (!alpha.test(data.sname)) {
            Swal.fire("Invalid Input", "Please enter a valid service name (alphabets only).", "error");
            return;
        }
        
        // Validate service amount
        if (!alphanumeric.test(data.samount)) {
            Swal.fire("Invalid Input", "Please enter a valid amount (alphanumeric characters only).", "error");
            return;
        }

        // Submit updated service details
        try {
            fetch("http://localhost:5000/updateservice", {
                method: "POST", // POST method to send data
                crossDomain: true, // Allow cross-domain requests
                headers: { "Content-Type": "application/json" }, // Content type set to JSON
                body: JSON.stringify({ data }), // Send updated data in request body
            })
                .then((res) => res.json()) // Parse JSON response
                .then((response) => {
                    if (response.status === "OK") { // Check if update was successful
                        Swal.fire("Success", "Service updated successfully!", "success");
                        navigate(`../adminservice`); // Navigate back to the admin service page
                    }
                });
        } catch (error) {
            console.log(error); // Log any errors encountered during fetch
        }
    };

    return (
        <div className='flex flex-col md:flex-row justify-center items-center p-8 pt-36 h-screen'>
            {/* Form container */}
            <form className='w-full md:w-1/2 p-6 bg-white shadow-md rounded-md'>
                {/* Form title */}
                <h1 className='text-2xl font-bold mb-6'>Edit Service</h1>
                
                {/* Service Name Input */}
                <div className='mb-4'>
                    <label htmlFor='name' className='block text-gray-700 font-semibold'>Service Name</label>
                    <input 
                        type="text"
                        id="name"
                        defaultValue={data.sname} // Set default value from fetched data
                        onChange={(e) => setSName(e.target.value)} // Update state on change
                        className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                    />
                </div>
                
                {/* Service Description Input */}
                <div className='mb-4'>
                    <label htmlFor='desc' className='block text-gray-700 font-semibold'>Service Description</label>
                    <textarea 
                        id="desc"
                        defaultValue={data.sdesc} // Set default value from fetched data
                        onChange={(e) => setSDesc(e.target.value)} // Update state on change
                        className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                        rows="4"
                    />
                </div>
                
                {/* Service Amount Input */}
                <div className='mb-4'>
                    <label htmlFor='amount' className='block text-gray-700 font-semibold'>Amount</label>
                    <input 
                        type="text"
                        id="amount"
                        defaultValue={data.samount} // Set default value from fetched data
                        onChange={(e) => setSAmount(e.target.value)} // Update state on change
                        className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                    />
                </div>
                
                {/* Buttons for form submission and cancellation */}
                <div className='flex justify-between'>
                    <button 
                        type="button" 
                        onClick={handleSubmit} 
                        className='bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-md'
                    >
                        Confirm
                    </button>
                    <button 
                        type="button" 
                        onClick={handleCancel} 
                        className='bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-md'
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditService;
