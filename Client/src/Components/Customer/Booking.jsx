import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

function Booking() {
    const [name, setName] = useState("");
    const [vname, setVName] = useState("");
    const [vno, setVNo] = useState("");
    const [vmodel, setVModel] = useState("");
    const [address, setAddress] = useState("");
    const [date, setDate] = useState("");
    const [service, setService] = useState([]);
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const currDate = new Date();
    const currYear = currDate.getFullYear();
    const currMonth = String(currDate.getMonth() + 1).padStart(2, '0');
    const currDay = String(currDate.getDate() + 1).padStart(2, '0');

    const sdate = `${currYear}-${currMonth}-${currDay}`;
    const edate = `${currYear + 1}-${currMonth}-${currDay}`;

    const alpha = /^[A-Za-z ]+$/;
    const VNO = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
    const alphanumeric = /^[0-9a-zA-Z ]+$/;

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch("http://localhost:5000/service", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(),
                });
                const result = await response.json();
                setData(result.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchServices();
    }, []);
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setService((prevServices) => [...prevServices, value]);
        } else {
            setService((prevServices) => prevServices.filter((s) => s !== value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = sessionStorage.getItem("Email");
        const phone = sessionStorage.getItem("Phone");

        if (date !== "") {
            if (name !== "" && alpha.test(name)) {
                if (vname !== "" && alpha.test(vname)) {
                    if (vno !== "" && VNO.test(vno)) {
                        if (vmodel !== "" && alphanumeric.test(vmodel)) {
                            if (address !== "") {
                                if (service.length > 0) {
                                    try {
                                        const response = await fetch("http://localhost:5000/addbooking", {
                                            method: "POST",
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ date, name, email, phone, vname, vno, vmodel, address, service }),
                                        });
                                        const result = await response.json();

                                        if (result.status === "ok") {
                                            swal('Success!', 'Service Booked Successfully', 'success');
                                            navigate("../customerhome");
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

    const handleCancel = () => {
        navigate("../customerhome");
    };

    return (
        <div className='pt-14 flex justify-center items-center min-h-screen bg-gray-100'>
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className='w-full'>
                    <h1 className="text-3xl font-bold mb-6 text-center">Book a Service</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                        <div className='mb-2'>
                            <label className='block text-gray-700'>Date</label>
                            <input
                                type="date"
                                className='mt-2 p-1.5 border border-gray-300 rounded-md w-full'
                                min={sdate}
                                max={edate}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label className='block text-gray-700'>Owner Name</label>
                            <input
                                type="text"
                                className='mt-2 p-1.5 border border-gray-300 rounded-md w-full'
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label className='block text-gray-700'>Vehicle Name</label>
                            <input
                                type="text"
                                className='mt-2 p-1.5 border border-gray-300 rounded-md w-full'
                                onChange={(e) => setVName(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label className='block text-gray-700'>Vehicle Number</label>
                            <input
                                type="text"
                                className='mt-2 p-1.5 border border-gray-300 rounded-md w-full'
                                onChange={(e) => setVNo(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label className='block text-gray-700'>Vehicle Model</label>
                            <input
                                type="text"
                                className='mt-2 p-1.5 border border-gray-300 rounded-md w-full'
                                onChange={(e) => setVModel(e.target.value)}
                            />
                        </div>
                        <div className='mb-2'>
                            <label className='block text-gray-700'>Address</label>
                            <textarea
                                rows={1}
                                className='mt-2 p-1.5 border border-gray-300 rounded-md w-full'
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className='mb-2 col-span-2'>
                            <label className='block text-gray-700'>Service</label>
                            <div className='mt-2 p-2 gap-6 flex'>
                                {data.map((i) => (
                                    <div key={i.sname} className="flex items-center mb-2">
                                        <input
                                            type="checkbox"
                                            value={i.sname}
                                            onChange={handleCheckboxChange}
                                            className="peer h-5 w-5 text-green-500 focus:ring-0 focus:ring-offset-0 rounded"
                                        />
                                        <label className="peer-checked:text-green-500 peer-checked:font-bold text-gray-700 ml-2">{i.sname}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between mt-6'>
                        <button
                            className='bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-8 rounded-lg'
                            type="submit"
                        >
                            Confirm
                        </button>
                        <button
                            className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-8 rounded-lg'
                            onClick={handleCancel}
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
