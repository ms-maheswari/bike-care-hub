import React from 'react';
import { useNavigate } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bike from '../Assets/bike.jpg';
import bike2 from '../Assets/bike2.jpg';
import bike3 from '../Assets/bike3.jpg';
import why1 from '../Assets/why1.png';
import why2 from '../Assets/why2.png';
import why3 from '../Assets/why3.png';
import why4 from '../Assets/why4.png';
import why5 from '../Assets/why5.png';
import why6 from '../Assets/why6.png';
import AvailableService from './Customer/AvailableService';

function Home() {
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");

  const handleButtonClick = () => {
    if (role === "user") {
      navigate("/customerbooking");
    } else if (role === "admin") {
      navigate("/admincustbooking");
    } else {
      navigate("/login");
    }
  };

  const buttonText = role === "user" ? "Book Now" : role === "admin" ? "View Bookings" : "Login Now";

  return (
    <div className='pt-12 bg-black'>
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row h-screen w-screen text-white bg-black p-8 lg:p-24">
        <div className="lg:w-1/2 flex flex-col justify-center text-left">
          <h1 className="text-2xl font-bold mb-4">Welcome to Bike Service</h1>
          <h1 className="text-4xl lg:text-6xl xl:text-9xl">Bike <span className="text-red-500">Care</span><i>Hub</i></h1>
          <p className="mt-4 lg:mt-8">Get your bike serviced with the best professionals in town.</p>
          <p className="mt-4 lg:mt-8 text-xl italic">Life is like riding a bicycle. To keep your balance, you must keep moving.</p>
          <button 
            className="mt-4 w-3/4 lg:w-1/2 lg:mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-full" 
            onClick={handleButtonClick}
          >
            {buttonText}
          </button>
        </div>
        <div className="lg:w-1/2 flex items-center justify-center">
          <Carousel showThumbs={false} showStatus={false} infiniteLoop useKeyboardArrows autoPlay>
            <div>
              <img className="w-full shadow-xl shadow-red-500/50" src={bike} alt="Bike service 1" />
            </div>
            <div>
              <img className="w-full shadow-xl shadow-red-500/50" src={bike2} alt="Bike service 2" />
            </div>
            <div>
              <img className="w-full shadow-xl shadow-red-500/50" src={bike3} alt="Bike service 3" />
            </div>
          </Carousel>
        </div>
      </div>

      {/* Available Services Section */}
      <AvailableService />

      {/* Why Choose Us Section */}
      <section className="flex items-center justify-center h-auto py-16 lg:py-24 bg-gray-100 overflow-hidden">
        <div className="container mx-auto">
          <h2 className="text-black flex flex-col items-center justify-center text-2xl sm:text-4xl font-bold mb-6 sm:mb-10 text-center">
            <img src="images/br.png" alt="" className="mb-2" />
            WHY <span className="text-yellow-500 font-semibold">CHOOSE US</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6 justify-center items-center">
            <div className="p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-800">
              <img src={why1} className="p-3 mx-auto" alt="vehicle Pick and drop service" />
              <p className="mt-4 text-center">Pick & Drop <br /><span className="font-bold">Service</span></p>
            </div>
            <div className="p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-800">
              <img src={why2} className="p-3 mx-auto" alt="Bike/car spare parts" />
              <p className="mt-4 text-center">Warranted <br /><span className="font-bold">Spare Parts</span></p>
            </div>
            <div className="p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-800">
              <img src={why3} className="p-3 mx-auto" alt="Multibrand service center in chennai" />
              <p className="mt-4 text-center">Multi Brand <br /><span className="font-bold">Options</span></p>
            </div>
            <div className="p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-800">
              <img src={why4} className="p-3 mx-auto" alt="Live vehicle tracking" />
              <p className="mt-4 text-center">Realtime <br /><span className="font-bold">Tracking</span></p>
            </div>
            <div className="p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-800">
              <img src={why5} className="p-3 mx-auto" alt="Bike/Car workshop near me" />
              <p className="mt-4 text-center">Standardised <br /><span className="font-bold">Workshops</span></p>
            </div>
            <div className="p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-800">
              <img src={why6} className="p-3 mx-auto" alt="24/7 service and support" />
              <p className="mt-4 text-center">24/7 <br /><span className="font-bold">Support</span></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
