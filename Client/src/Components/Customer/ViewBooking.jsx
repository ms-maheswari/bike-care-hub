import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Book from '../../Assets/5.png';

function ViewBooking() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const _id = sessionStorage.getItem("BookingID");

    // Fetching Booking Details
    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await fetch("http://localhost:5000/viewbooking", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ _id }),
                });
                const result = await response.json();
                setData(result.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchBookingDetails();
    }, [_id]);

    // Cancel the Form
    const handleConfirm = () => {
        navigate("../customerhome");
    };

    return (
        <>
            <div className="text-center mt-8 pt-10">
                <h1 className="text-4xl font-bold">Booking Details</h1>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center mt-12">
                <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-semibold">Date</label>
                            <input
                                type="text"
                                value={data.date || ''}
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold">Name</label>
                            <input
                                type="text"
                                value={data.name || ''}
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label className="block text-gray-700 font-semibold">Email</label>
                            <input
                                type="text"
                                value={data.email || ''}
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold">Phone</label>
                            <input
                                type="text"
                                value={data.phone || ''}
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label className="block text-gray-700 font-semibold">Vehicle Name</label>
                            <input
                                type="text"
                                value={data.vname || ''}
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold">Vehicle Model</label>
                            <input
                                type="text"
                                value={data.vmodel || ''}
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label className="block text-gray-700 font-semibold">Vehicle Number</label>
                            <input
                                type="text"
                                value={data.vno || ''}
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold">Address</label>
                            <input
                                type="text"
                                value={data.address || ''}
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div>
                            <label className="block text-gray-700 font-semibold">Status</label>
                            <input
                                type="text"
                                value={data.status || ''}
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                readOnly
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-semibold">Service</label>
                            <input
                                type="text"
                                value={data.service || ''}
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="mt-8 text-center">
                        <button
                            type="button"
                            onClick={handleConfirm}
                            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                        >
                            Back
                        </button>
                    </div>
                </form>
                <div className="hidden md:block ml-12">
                    <img src={Book} alt="book" className="rounded-lg shadow-lg" />
                </div>
            </div>
        </>
    );
}

export default ViewBooking;
