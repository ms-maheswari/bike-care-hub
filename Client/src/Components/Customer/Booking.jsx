import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import apiUrl from '../../api';
// Booking Component
function Booking() {
    // State variables to store form inputs
    const [name, setName] = useState("");
    const [vname, setVName] = useState("");
    const [vno, setVNo] = useState("");
    const [vmodel, setVModel] = useState("");
    const [address, setAddress] = useState("");
    const [date, setDate] = useState("");
    const [service, setService] = useState([]); // Stores selected services
    const [data, setData] = useState([]); // Stores available services fetched from the server

    const navigate = useNavigate(); // Hook for navigation

    // Current date calculation to set the minimum and maximum booking dates
    const currDate = new Date();
    const currYear = currDate.getFullYear();
    const currMonth = String(currDate.getMonth() + 1).padStart(2, '0');
    const currDay = String(currDate.getDate() + 1).padStart(2, '0');

    const sdate = `${currYear}-${currMonth}-${currDay}`; // Start date (current date)
    const edate = `${currYear + 1}-${currMonth}-${currDay}`; // End date (one year from now)

    // Regular expressions for form validation
    const alpha = /^[A-Za-z ]+$/; // Allows only alphabets and spaces for names
    const VNO = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/; // Validates vehicle numbers (e.g., AB12CD3456)
    const alphanumeric = /^[0-9a-zA-Z ]+$/; // Allows alphanumeric characters and spaces

    // useEffect hook to fetch available services when the component mounts
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${apiUrl}/service`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(), // Empty body since we're only fetching data
                });
                const result = await response.json(); // Parse the JSON response
                setData(result.data); // Store the fetched services in state
            } catch (error) {
                console.log(error); // Log any errors during the fetch operation
            }
        };

        fetchServices(); // Call the function to fetch services
    }, []); // Empty dependency array ensures this runs only once

    // Handle checkbox changes for services
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            // Add service to state if checked
            setService((prevServices) => [...prevServices, value]);
        } else {
            // Remove service from state if unchecked
            setService((prevServices) => prevServices.filter((s) => s !== value));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const email = sessionStorage.getItem("Email"); // Get user's email from session storage
        const phone = sessionStorage.getItem("Phone"); // Get user's phone number from session storage

        // Form validation checks
        if (date !== "") {
            if (name !== "" && alpha.test(name)) {
                if (vname !== "" && alphanumeric.test(vname)) {
                    if (vno !== "" && VNO.test(vno)) {
                        if (vmodel !== "" && alphanumeric.test(vmodel)) {
                            if (address !== "") {
                                if (service.length > 0) {
                                    try {
                                        // Send booking data to the server
                                        const response = await fetch("http://localhost:5000/addbooking", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ date, name, email, phone, vname, vno, vmodel, address, service }),
                                        });
                                        const result = await response.json(); // Parse the JSON response

                                        // Handle server response
                                        if (result.status === "ok") {
                                            swal('Success!', 'Service Booked Successfully', 'success');
                                            navigate("../customerhome"); // Redirect to customer home page
                                        } else if (result.status === "Bookfilles") {
                                            swal('Invalid Email!', 'Today\'s booking is filled', 'error');
                                        } else if (result.status === "NotCompleted") {
                                            swal('Warning', 'The Bike is Not Completed', 'warning');
                                        } else {
                                            alert("Booking Already Registered on the Same Date");
                                        }
                                    } catch (error) {
                                        console.error("Error during booking:", error);
                                        swal('Error!', 'An error occurred during booking.', 'error');
                                    }
                                } else {
                                    swal('Warning!...', 'Pick at least one Service', 'warning');
                                }
                            } else {
                                swal('Warning!...', 'Invalid Address', 'warning');
                            }
                        } else {
                            swal('Warning!...', 'Invalid Vehicle Model', 'warning');
                        }
                    } else {
                        swal('Warning!...', 'Invalid Vehicle Number', 'warning');
                    }
                } else {
                    swal('Warning!...', 'Enter valid Vehicle name', 'warning');
                }
            } else {
                swal('Warning!...', 'Enter valid name', 'warning');
            }
        } else {
            swal('Warning!...', 'Pick a date', 'warning');
        }
    };

    // Handle cancellation by navigating back to the customer home page
    const handleCancel = () => {
        navigate("../customerhome");
    };

    return (
        // Main container for the booking form
        <div className='pt-14 flex justify-center items-center min-h-screen bg-gray-100'>
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className='w-full'>
                    <h1 className="text-3xl font-bold mb-6 text-center">Book a Service</h1>
                    {/* Form inputs for booking details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                        <div className='mb-2'>
                            <label className='block text-gray-700'>Date</label>
                            <input
                                type="date"
                                className='mt-2 p-1.5 border border-gray-300 rounded-md w-full'
                                min={sdate} // Minimum allowed date
                                max={edate} // Maximum allowed date
                                onChange={(e) => setDate(e.target.value)} // Update date state
                            />
                        </div>
                        <div className='mb-2'>
                            <label className='block text-gray-700'>Owner Name</label>
                            <input
                                type="text"
                                className='mt-2 p-1.5 border border-gray-300 rounded-md w-full'
                                onChange={(e) => setName(e.target.value)} // Update owner name state
                            />
                        </div>
                        <div className='mb-2'>
                            <label className='block text-gray-700'>Vehicle Name</label>
                            <input
                                type="text"
                                className='mt-2 p-1.5 border border-gray-300 rounded-md w-full'
                                onChange={(e) => setVName(e.target.value)} // Update vehicle name state
                            />
                        </div>
                        <div className='mb-2'>
                            <label className='block text-gray-700'>Vehicle Number</label>
                            <input
                                type="text"
                                className='mt-2 p-1.5 border border-gray-300 rounded-md w-full'
                                onChange={(e) => setVNo(e.target.value)} // Update vehicle number state
                            />
                        </div>
                        <div className='mb-2'>
                            <label className='block text-gray-700'>Vehicle Model</label>
                            <input
                                type="text"
                                className='mt-2 p-1.5 border border-gray-300 rounded-md w-full'
                                onChange={(e) => setVModel(e.target.value)} // Update vehicle model state
                            />
                        </div>
                        <div className='mb-2'>
                            <label className='block text-gray-700'>Address</label>
                            <textarea
                                rows={1}
                                className='mt-2 p-1.5 border border-gray-300 rounded-md w-full'
                                onChange={(e) => setAddress(e.target.value)} // Update address state
                            />
                        </div>
                        {/* Checkbox inputs for selecting services */}
                        <div className='mb-2 col-span-2'>
                            <label className='block text-gray-700'>Service</label>
                            <div className='mt-2 grid grid-cols-2 gap-4'>
                                {data.map((i) => (
                                    <div key={i.sname} className="flex items-center mb-2">
                                        <input
                                            type="checkbox"
                                            value={i.sname}
                                            onChange={handleCheckboxChange} // Handle checkbox change
                                            className="peer h-5 w-5 text-green-500 focus:ring-0 focus:ring-offset-0 rounded"
                                        />
                                        <label className="peer-checked:text-green-500 ml-2">{i.sname}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Action buttons for form submission and cancellation */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md focus:outline-none"
                        >
                            Book Now
                        </button>
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md focus:outline-none"
                            onClick={handleCancel} // Handle cancel button click
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Booking;
