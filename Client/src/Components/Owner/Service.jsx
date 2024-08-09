import React from 'react';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Service() {
    const navigate = useNavigate();
    const [noofbook, setNoofBook] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            fetch("http://localhost:5000/service", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => res.json())
                .then((data) => {
                    setData(data.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const UpdateNoofBook = () => {
        if (noofbook > 0) {
            try {
                fetch("http://localhost:5000/updatenoofbook", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ noofbook }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.status === "ok") {
                            Swal.fire("Success", "Updated Successfully!", "success");
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        } else {
            Swal.fire("Invalid Input", "Please enter a valid number of bookings per day.", "error");
        }
    };

    const updateservice = (_id) => {
        sessionStorage.setItem("changeser", _id);
        navigate(`../editservice`);
    };

    const AddServ = () => {
        sessionStorage.setItem("changeser", null);
    };

    const deleteservice = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete this service?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    fetch("http://localhost:5000/deleteservice", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ _id }),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.status === "ok") {
                                Swal.fire("Deleted!", "The service has been deleted.", "success");
                                setData(data.data);
                            }
                        });
                } catch (error) {
                    console.log(error);
                }
            }
        });
    };

    return (
        <div className="p-8 pt-24 min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">List of Services</h1>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-md shadow-md">
                    <Link to='../addservice' onClick={AddServ} className='text-white no-underline'>Add New Service</Link>
                </button>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <input
                        type="text"
                        placeholder="No of Booking Per Day"
                        className="w-full md:w-72 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={(e) => setNoofBook(e.target.value)}
                    />
                    <button
                        onClick={UpdateNoofBook}
                        className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-md shadow-md"
                    >
                        Update
                    </button>
                </div>
            </div>
            <div className="mt-4 w-full overflow-x-auto">
            <div className="shadow-lg rounded-lg">
                <table className="min-w-full  bg-white">
                    <thead className="bg-gray-200 text-xl ">
                        <tr>
                            <th className="py-2 px-4 text-left">Service Name</th>
                            <th className="py-2 px-4 text-center">Description</th>
                            <th className="py-2 px-4 text-center">Amount</th>
                            <th className="py-2 px-4 text-center">Edit</th>
                            <th className="py-2 px-4 text-center">Delete</th>
                        </tr>
                    </thead>
                    <tbody className='text-lg '>
                        {data.map((row) => (
                            <tr key={row._id} className="hover:bg-gray-100">
                                <td className="py-2 px-4">{row.sname}</td>
                                <td className="py-2 px-4 text-center">{row.sdesc}</td>
                                <td className="py-2 px-4 text-center">{row.samount}</td>
                                <td className="py-2 px-4 text-center">
                                    <button
                                        onClick={() => updateservice(row._id)}
                                        className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-md"
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="py-2 px-4 text-center">
                                    <button
                                        onClick={() => deleteservice(row._id)}
                                        className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-md"
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
