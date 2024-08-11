import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert'; // Importing SweetAlert for warnings

// AvailableServices Component
function AvailableServices() {
    // State to hold the list of services fetched from the backend
    const [services, setServices] = useState([]);
    
    // Hook for programmatic navigation between routes
    const navigate = useNavigate(); 
    
    // Retrieving the user's role from sessionStorage to determine user type
    const role = sessionStorage.getItem("role");

    // useEffect hook to fetch services from the backend when the component is mounted
    useEffect(() => {
        // Making a POST request to the server to fetch the list of services
        fetch("http://localhost:5000/service", {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // Setting the request headers
        })
            .then((res) => res.json()) // Parsing the JSON response
            .then((data) => {
                // Updating the state with fetched services data
                setServices(data.data);
            })
            .catch((error) => {
                // Logging errors to the console if the fetch operation fails
                console.error('Error fetching services:', error);
            });
    }, []); // Empty dependency array ensures this effect runs only once

    // Function to handle the "Book Now" button click
    const handleButtonClick = () => {
        // Checking the role of the user to determine the next action
        if (role === "user") {
            // If the user is a customer, navigate to the customer booking page
            navigate("/customerbooking");
        } else if (role === "admin") {
            // If the user is an admin, navigate to the admin booking page
            navigate("/admincustbooking");
        } else {
            // If no user is logged in, show a warning message to log in
            swal('Login Required!', 'Please login to continue.', 'warning');
        }
    };

    return (
        <div className="p-8 pt-24 min-h-screen bg-gray-100 ">
            {/* Page Title */}
            <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Available Services</h1>
            
            {/* Services Grid - displaying a grid of service cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 justify-items-center">
                {services.map((service) => (
                    <div
                        key={service._id} // Unique key for each service item
                        className="max-w-md w-full rounded-lg overflow-hidden shadow-xl bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                        <div className="p-6">
                            {/* Service Name */}
                            <div className="font-bold text-2xl mb-4 text-gray-900">{service.sname}</div>
                            
                            {/* Service Description */}
                            <p className="text-gray-700 text-base mb-4">
                                {service.sdesc}
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-6 flex justify-between items-center">
                            {/* Service Amount displayed with a styled label */}
                            <span className="inline-block bg-green-200 rounded-full px-4 py-2 text-lg font-semibold text-gray-800">
                                ₹{service.samount}
                            </span>
                            
                            {/* "Book Now" Button to initiate the booking process */}
                            <button
                                onClick={handleButtonClick} // Handle button click to proceed based on user role
                                className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-md shadow-md"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AvailableServices;
