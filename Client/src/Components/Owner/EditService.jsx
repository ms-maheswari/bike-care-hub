import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


function EditService() {
    const [sname, setSName] = useState();
    const [sdesc, setSDesc] = useState();
    const [samount, setSAmount] = useState();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const _id = sessionStorage.getItem("changeser");

    useEffect(() => {
        try {
            fetch("http://localhost:5000/fetchservice", {
                method: "POST", 
                crossDomain: true,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setData(data.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, [_id]);

    const handleCancel = () => {
        sessionStorage.setItem("changeser", null);
        navigate(`../adminservice`);
    };

    //Validation patterns
    const alpha = /^[A-Za-z ]+$/; //Only Alphabetical characters
    const alphanumeric = /^[0-9a-zA-Z ]+$/; //Validate Alphanumeric

    const handleSubmit = () => {
        if (sname !== undefined) {
            data.sname = sname;
        }
        if (sdesc !== undefined) {
            data.sdesc = sdesc;
        }
        if (samount !== undefined) {
            data.samount = samount;
        }

        if (!alpha.test(data.sname)) {
            Swal.fire("Invalid Input", "Please enter a valid service name (alphabets only).", "error");
            return;
        }
        
        if (!alphanumeric.test(data.samount)) {
            Swal.fire("Invalid Input", "Please enter a valid amount (alphanumeric characters only).", "error");
            return;
        }

        try {
            fetch("http://localhost:5000/updateservice", {
                method: "POST",
                crossDomain: true,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data }),
            })
                .then((res) => res.json())
                .then((response) => {
                    if (response.status === "OK") {
                        Swal.fire("Success", "Service updated successfully!", "success");
                        navigate(`../adminservice`);
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex flex-col md:flex-row justify-center items-center p-8 pt-36 h-screen'>
            <form className='w-full md:w-1/2 p-6 bg-white shadow-md rounded-md'>
                <h1 className='text-2xl font-bold mb-6'>Edit Service</h1>
                <div className='mb-4'>
                    <label htmlFor='name' className='block text-gray-700 font-semibold'>Service Name</label>
                    <input 
                        type="text"
                        id="name"
                        defaultValue={data.sname}
                        onChange={(e) => setSName(e.target.value)}
                        className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='desc' className='block text-gray-700 font-semibold'>Service Description</label>
                    <textarea 
                        id="desc"
                        defaultValue={data.sdesc}
                        onChange={(e) => setSDesc(e.target.value)}
                        className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                        rows="4"
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='amount' className='block text-gray-700 font-semibold'>Amount</label>
                    <input 
                        type="text"
                        id="amount"
                        defaultValue={data.samount}
                        onChange={(e) => setSAmount(e.target.value)}
                        className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                    />
                </div>
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
