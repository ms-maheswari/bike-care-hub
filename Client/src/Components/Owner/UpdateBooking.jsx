import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Book from '../../Assets/5.png'; // Image for visual appeal
import Swal from 'sweetalert2'; // For displaying alerts

function UpdateBooking() {
    const navigate = useNavigate(); // Hook for programmatic navigation
    const [data, setData] = useState([]); // State to hold booking details
    const _id = sessionStorage.getItem("UpdateBookingID"); // Retrieve booking ID from session storage

    // Fetch booking details when the component mounts or the booking ID changes
    useEffect(() => {
        try {
            fetch("http://localhost:5000/viewbooking", {
                method: "POST", // POST method to send request
                crossDomain: true, // Allow cross-domain requests
                headers: { "Content-Type": "application/json" }, // Set content type to JSON
                body: JSON.stringify({ _id }), // Send booking ID in request body
            })
                .then((res) => res.json()) // Parse JSON response
                .then((data) => {
                    setData(data.data); // Set the fetched data to state
                });
        } catch (error) {
            console.log(error); // Log any errors encountered during fetch
        }
    }, [_id]); // Dependency array ensures this effect runs when _id changes

    var status = "Ready"; // Initial status

    // Navigate back to the admin customer booking page
    const handleBack = () => {
        navigate("../admincustbooking");
    };

    // Update the booking status
    const handleUpdate = () => {
        if (data.status === "Completed") {
            Swal.fire("Already the Service is Completed"); // Show alert if service is already completed
        } else {
            if (data.status === "Ready") {
                status = "Completed"; // Update status to "Completed"
            }
            try {
                fetch("http://localhost:5000/updatebooking", {
                    method: "POST", // POST method to send request
                    crossDomain: true, // Allow cross-domain requests
                    headers: { "Content-Type": "application/json" }, // Set content type to JSON
                    body: JSON.stringify({ _id, status }), // Send booking ID and status in request body
                })
                    .then((res) => res.json()) // Parse JSON response
                    .then((data) => {
                        if (data.status === "ok") {
                            Swal.fire("Updated Successfully"); // Show success alert
                        }
                    });
            } catch (error) {
                console.log(error); // Log any errors encountered during fetch
            }
        }
        navigate("../admincustbooking"); // Navigate back to the admin customer booking page
    };

    return (
        <>
            {/* Page title */}
            <div className='text-center text-3xl font-bold text-gray-800 mt-8'>
                <h1>Update Booking</h1>
            </div>

            {/* Form for updating booking details */}
            <div className='flex flex-col md:flex-row justify-center items-center mt-10 p-6'>
                <form className='bg-white shadow-lg rounded-lg p-8 max-w-md w-full'>
                    <div className='space-y-6'>
                        {/* Booking details fields */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor='date' className='block text-gray-600'>Date</label>
                                <input type='text' id='date' value={data.date || ''} className='w-full px-3 py-2 border rounded-md bg-gray-100' readOnly />
                            </div>
                            <div>
                                <label htmlFor='name' className='block text-gray-600'>Name</label>
                                <input type='text' id='name' value={data.name || ''} className='w-full px-3 py-2 border rounded-md bg-gray-100' readOnly />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor='email' className='block text-gray-600'>Email</label>
                                <input type='text' id='email' value={data.email || ''} className='w-full px-3 py-2 border rounded-md bg-gray-100' readOnly />
                            </div>
                            <div>
                                <label htmlFor='phone' className='block text-gray-600'>Phone</label>
                                <input type='text' id='phone' value={data.phone || ''} className='w-full px-3 py-2 border rounded-md bg-gray-100' readOnly />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor='vname' className='block text-gray-600'>Vehicle Name</label>
                                <input type='text' id='vname' value={data.vname || ''} className='w-full px-3 py-2 border rounded-md bg-gray-100' readOnly />
                            </div>
                            <div>
                                <label htmlFor='vmodel' className='block text-gray-600'>Vehicle Model</label>
                                <input type='text' id='vmodel' value={data.vmodel || ''} className='w-full px-3 py-2 border rounded-md bg-gray-100' readOnly />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor='vno' className='block text-gray-600'>Vehicle Number</label>
                                <input type='text' id='vno' value={data.vno || ''} className='w-full px-3 py-2 border rounded-md bg-gray-100' readOnly />
                            </div>
                            <div>
                                <label htmlFor='addr' className='block text-gray-600'>Address</label>
                                <input type='text' id='addr' value={data.address || ''} className='w-full px-3 py-2 border rounded-md bg-gray-100' readOnly />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor='status' className='block text-gray-600'>Status</label>
                                <input type='text' id='status' value={data.status || ''} className='w-full px-3 py-2 border rounded-md bg-gray-100' readOnly />
                            </div>
                            <div>
                                <label htmlFor='service' className='block text-gray-600'>Service</label>
                                <input type='text' id='service' value={data.service || ''} className='w-full px-3 py-2 border rounded-md bg-gray-100' readOnly />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between mt-6'>
                        {/* Button to go back */}
                        <button onClick={handleBack} type='button' className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition'>Back</button>
                        
                        {/* Button to update the service status */}
                        <button onClick={handleUpdate} type='button' className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition'>Update Service</button>
                    </div>
                </form>
                
                {/* Image for visual appeal, hidden on small screens */}
                <div className='hidden md:block md:w-1/3 lg:w-1/2 p-6'>
                    <img src={Book} alt="book" className='w-full h-auto object-cover' />
                </div>
            </div>
        </>
    );
}

export default UpdateBooking;
