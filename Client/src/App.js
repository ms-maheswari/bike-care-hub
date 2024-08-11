import { Routes, Route } from 'react-router-dom';
import AddService from './Components/Owner/AddService';
import Navbar from './Components/Navbar';
import AdminService from './Components/Owner/Service';
import Login from './Components/Login';
import Signup from './Components/Signup';
import CustomerHistory from './Components/Customer/History';
import CustomerBooking from './Components/Customer/Booking';
import CustomerBook from './Components/Customer/Booked';
import ViewBooking from './Components/Customer/ViewBooking';
import CustBooking from './Components/Owner/CustBooking'; // Admin component to view customer bookings
import UpdateBooking from './Components/Owner/UpdateBooking'; // Admin component to update a booking
import EditService from './Components/Owner/EditService';
import Home from './Components/Home';
import About from './Components/About';
import Footer from './Components/Footer';

function App() {
  return (
    // Flexbox container to manage the layout of the application
    <div className='flex flex-col min-h-screen'>
      
      {/* Navbar component that is displayed across all pages */}
      <Navbar />
      
      {/* Main content area that grows to fill available space */}
      <main className='flex-grow'>
        
        {/* Routes for navigating between different pages of the application */}
        <Routes>
          
          {/* Home page route */}
          <Route path="/" element={<Home />}></Route>
          
          {/* Admin route to add a new service */}
          <Route path="/addservice" element={<AddService />}></Route>
          
          {/* Admin route to view and manage services */}
          <Route path="/adminservice" element={<AdminService />}></Route>
          
          {/* Route for user login */}
          <Route path="/login" element={<Login />}></Route>
          
          {/* Route for user signup */}
          <Route path="/signup" element={<Signup />}></Route>
          
          {/* About page route */}
          <Route path="/about" element={<About />}></Route>
          
          {/* Admin home page route */}
          <Route path="/adminhome" element={<Home />}></Route>
          
          {/* Customer home page route */}
          <Route path="/customerhome" element={<Home />}></Route>
          
          {/* Route for customers to view their booking history */}
          <Route path="/customerhistory" element={<CustomerHistory />}></Route>
          
          {/* Route for customers to make a booking */}
          <Route path="/customerbooking" element={<CustomerBooking />}></Route>
          
          {/* Route for customers to view their booked services */}
          <Route path="/customerbooked" element={<CustomerBook />}></Route>
          
          {/* Route for customers to view a specific booking */}
          <Route path="/viewbooking" element={<ViewBooking />}></Route>
          
          {/* Admin route to view customer bookings */}
          <Route path="/admincustbooking" element={<CustBooking />}></Route>
          
          {/* Admin route to update a booking */}
          <Route path="/updatebooking" element={<UpdateBooking />}></Route>
          
          {/* Admin route to edit an existing service */}
          <Route path="/editservice" element={<EditService />}></Route>
        </Routes>
      </main>
      
      {/* Footer component that is always at the bottom of the page */}
      <Footer className='mt-auto' />
    </div>
  );
}

export default App;
