import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function AvailableServices() {
    const [services, setServices] = useState([]);
    const navigate = useNavigate(); 
    const role = sessionStorage.getItem("role");

    useEffect(() => {
        fetch("http://localhost:5000/service", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
        .then((res) => res.json())
        .then((data) => setServices(data.data))
        .catch((error) => console.error('Error fetching services:', error));
    }, []); 

    const handleButtonClick = () => {
        if (role === "user") {
            navigate("/customerbooking");
        } else if (role === "admin") {
            navigate("/admincustbooking");
        } else {
            swal('Login Required!', 'Please login to continue.', 'warning');
        }
    };

    return (
        <div className="w-full h-auto text-gray-800 bg-gray-100 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <h1 className="text-4xl font-bold mb-12 text-center text-gray-900">Available Services</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
                    {services.map((service) => (
                        <div
                            key={service._id}
                            className="w-full max-w-xs sm:max-w-sm rounded-lg overflow-hidden bg-white shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            <div className="p-6">
                                <div className="font-bold text-xl mb-4 text-gray-900">{service.sname}</div>
                                <p className="text-gray-700 text-base mb-4">
                                    {service.sdesc}
                                </p>
                            </div>
                            <div className="px-6 py-4 flex justify-between items-center">
                                <span className="inline-block bg-green-200 rounded-full px-4 py-2 text-lg font-semibold text-gray-800">
                                    ₹{service.samount}
                                </span>
                                <button
                                    onClick={handleButtonClick}
                                    className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-md shadow-md text-base"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AvailableServices;
