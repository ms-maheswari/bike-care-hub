import React from 'react';
import { useNavigate } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Importing images for carousel and "Why Choose Us" section
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
  // Use navigate hook from react-router-dom for navigation
  const navigate = useNavigate();

  // Get user role from session storage
  const role = sessionStorage.getItem("role");

  // Handler for button click based on user role
  const handleButtonClick = () => {
    if (role === "user") {
      navigate("/customerbooking"); // Navigate to customer booking page
    } else if (role === "admin") {
      navigate("/admincustbooking"); // Navigate to admin booking page
    } else {
      navigate("/login"); // Navigate to login page if not logged in
    }
  };

  // Determine button text based on user role
  const buttonText = role === "user" ? "Book Now" : role === "admin" ? "View Bookings" : "Login Now";

  return (
    <div>
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row h-screen w-screen text-white bg-black p-8 lg:p-24">
        <div className="lg:w-1/2 flex flex-col justify-center text-left">
          {/* Main Heading */}
          <h1 className="text-2xl font-bold mb-4">Welcome to Bike Service</h1>
          {/* Sub Heading with highlighted text */}
          <h1 className="text-4xl lg:text-6xl xl:text-9xl">Bike <span className="text-red-500">Ser</span>vices</h1>
          {/* Description */}
          <p className="mt-4 lg:mt-8">Get your bike serviced with the best professionals in town.</p>
          {/* Inspirational Quote */}
          <p className="mt-4 lg:mt-8 text-xl italic">Life is like riding a bicycle. To keep your balance, you must keep moving.</p>
          {/* Call-to-Action Button */}
          <button 
            className="mt-4  w-1/2 lg:mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-full" 
            onClick={handleButtonClick}
          >
            {buttonText}
          </button>
        </div>
        {/* Carousel for showcasing images */}
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
      <section className="py-8 bg-gray-200 w-screen overflow-hidden">
        <div className="container mx-auto text-center">
          {/* Section Title with image */}
          <h2 className="text-left text-black mb-8">
            <img src="images/br.png" alt="" />
            &nbsp;&nbsp;WHY <span className="text-yellow-500 font-semibold">CHOOSE US</span>
          </h2>
          {/* List of Reasons */}
          <div className="flex flex-wrap justify-center items-center">
            {/* Reason 1 */}
            <div className="p-4 w-32 md:w-1/3 lg:w-1/6 mb-3">
              <img src={why1} className="p-3 img-fluid" alt="vehicle Pick and drop service" /><br />
              Pick & Drop <br /><span className="font-bold">Service</span>
            </div>
            {/* Reason 2 */}
            <div className="p-4 w-32 md:w-1/3 lg:w-1/6 mb-3">
              <img src={why2} className="p-3 img-fluid" alt="Bike/car spare parts" /><br />
              Warranted <br /><span className="font-bold">Spare Parts</span>
            </div>
            {/* Reason 3 */}
            <div className="p-4 w-32 md:w-1/3 lg:w-1/6 mb-3">
              <img src={why3} className="p-3 img-fluid" alt="Multibrand service center in chennai" /><br />
              Multi Brand <br /><span className="font-bold">Options</span>
            </div>
            {/* Reason 4 */}
            <div className="p-4 w-32 md:w-1/3 lg:w-1/6 mb-3">
              <img src={why4} className="p-3 img-fluid" alt="Live vehicle tracking" /><br />
              Realtime <br /><span className="font-bold">Tracking</span>
            </div>
            {/* Reason 5 */}
            <div className="p-4 w-32 md:w-1/3 lg:w-1/6 mb-3">
              <img src={why5} className="p-3 img-fluid" alt="Bike/Car workshop near me" /><br />
              Standardised <br /><span className="font-bold">Workshops</span>
            </div>
            {/* Reason 6 */}
            <div className="p-4 w-32 md:w-1/3 lg:w-1/6 mb-3">
              <img src={why6} className="p-3 img-fluid" alt="24/7 service and support" /><br />
              24/7 <br /><span className="font-bold">Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
