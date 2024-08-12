import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';

function Service() {
    const navigate = useNavigate();
    const [data, setData] = useState([]); // State to hold the list of services

    // Fetch services on component mount
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch("http://localhost:5000/service", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });
                const result = await res.json();
                setData(result.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchServices();
    }, []);

    // Navigate to the edit service page
    const updateservice = (_id) => {
        sessionStorage.setItem("changeser", _id);
        navigate('../editservice');
    };

    // Clear service ID from session storage
    const AddServ = () => {
        sessionStorage.setItem("changeser", null);
    };

    // Delete a service with confirmation
    const deleteservice = async (_id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete this service?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch("http://localhost:5000/deleteservice", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ _id }),
                });
                const result = await res.json();
                if (result.status === "ok") {
                    Swal.fire("Deleted!", "The service has been deleted.", "success");
                    setData(result.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="p-8 pt-24 min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">List of Services</h1>

            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-md shadow-md">
                    <Link to='../addservice' onClick={AddServ} className='text-white no-underline'>Add New Service</Link>
                </button>
            </div>

            <div className="mt-4 w-full overflow-x-auto">
                <div className="shadow-lg rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-200 text-xl ">
                            <tr>
                                <th className="py-2 px-4 text-left font-bold text-xs md:text-base">Service Name</th>
                                <th className="py-2 px-4 text-center font-bold text-xs md:text-base">Description</th>
                                <th className="py-2 px-4 text-center font-bold text-xs md:text-base">Amount</th>
                                <th className="py-2 px-4 text-center font-bold text-xs md:text-base">Edit</th>
                                <th className="py-2 px-4 text-center font-bold text-xs md:text-base">Delete</th>
                            </tr>
                        </thead>
                        <tbody className='text-lg '>
                            {data.map((row) => (
                                <tr key={row._id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4">{row.sname}</td>
                                    <td className="py-2 px-4 text-center text-sm md:text-base">{row.sdesc}</td>
                                    <td className="py-2 px-4 text-center text-sm md:text-base">{row.samount}</td>
                                    <td className="py-2 px-4 text-center text-sm md:text-base">
                                        <button
                                            onClick={() => updateservice(row._id)}
                                            className="px-4 py-2 bg-[#0000FF] text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td className="py-2 px-4 text-center">
                                        <button
                                            onClick={() => deleteservice(row._id)}
                                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        >
                                            Delete
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

export default Service;
