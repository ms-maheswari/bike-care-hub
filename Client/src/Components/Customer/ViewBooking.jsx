import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Book from '../../Assets/5.png'; // Importing image asset for visual enhancement

function ViewBooking() {
    // Hook for navigation between routes
    const navigate = useNavigate();
    
    // State to hold the booking data
    const [data, setData] = useState([]);
    
    // Retrieve booking ID from sessionStorage
    const _id = sessionStorage.getItem("BookingID");

    // Fetching booking details based on the booking ID
    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                // Fetch booking details from the server using the booking ID
                const response = await fetch("http://localhost:5000/viewbooking", {
                    method: "POST", // POST method to send data to the server
                    headers: { "Content-Type": "application/json" }, // Set content type to JSON
                    body: JSON.stringify({ _id }), // Send the booking ID in the request body
                });
                
                // Parse the JSON response
                const result = await response.json();
                
                // Update the state with the booking data
                setData(result.data);
            } catch (error) {
                // Log any errors encountered during the fetch request
                console.log(error);
            }
        };

        fetchBookingDetails(); // Call the function to fetch booking details
    }, [_id]); // Dependency array with booking ID ensures the effect runs when _id changes

    // Function to handle the confirm action, navigating back to the customer home page
    const handleConfirm = () => {
        navigate("../customerhome"); // Redirect to the customer home page
    };

    return (
        <>
            <div className="text-center mt-8 pt-10">
                {/* Page title */}
                <h1 className="text-4xl font-bold">Booking Details</h1>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center mt-12">
                {/* Form to display booking details */}
                <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                    {/* Grid layout for form fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Input fields for Date and Name */}
                        <div>
                            <label className="block text-gray-700 font-semibold">Date</label>
                            <input
                                type="text"
                                value={data.date || ''} // Display date or empty if not available
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                readOnly // Make input field read-only
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold">Name</label>
                            <input
                                type="text"
                                value={data.name || ''} // Display name or empty if not available
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* Input fields for Email and Phone */}
                        <div>
                            <label className="block text-gray-700 font-semibold">Email</label>
                            <input
                                type="text"
                                value={data.email || ''} // Display email or empty if not available
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold">Phone</label>
                            <input
                                type="text"
                                value={data.phone || ''} // Display phone or empty if not available
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* Input fields for Vehicle details */}
                        <div>
                            <label className="block text-gray-700 font-semibold">Vehicle Name</label>
                            <input
                                type="text"
                                value={data.vname || ''} // Display vehicle name or empty if not available
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold">Vehicle Model</label>
                            <input
                                type="text"
                                value={data.vmodel || ''} // Display vehicle model or empty if not available
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* Input fields for Vehicle Number and Address */}
                        <div>
                            <label className="block text-gray-700 font-semibold">Vehicle Number</label>
                            <input
                                type="text"
                                value={data.vno || ''} // Display vehicle number or empty if not available
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold">Address</label>
                            <input
                                type="text"
                                value={data.address || ''} // Display address or empty if not available
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* Input fields for Status and Service */}
                        <div>
                            <label className="block text-gray-700 font-semibold">Status</label>
                            <input
                                type="text"
                                value={data.status || ''} // Display status or empty if not available
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold">Service</label>
                            <input
                                type="text"
                                value={data.service || ''} // Display service or empty if not available
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="mt-8 text-center">
                        {/* Button to navigate back to the customer home page */}
                        <button
                            type="button"
                            onClick={handleConfirm}
                            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                        >
                            Back
                        </button>
                    </div>
                </form>
                
            </div>
        </>
    );
}

export default ViewBooking;
