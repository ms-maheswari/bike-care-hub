import {Routes, Route} from 'react-router-dom';
import AddService from './Components/Owner/AddService';
import Navbar from './Components/Navbar';
import AdminService from './Components/Owner/Service';
import Login from './Components/Login';
import Signup from './Components/Signup';
// import AdminHome from './Components/Owner/Home/Home';
// import CustomerHome from './Components/Customer/Home/Home';
import CustomerHistory from './Components/Customer/History';
import CustomerBooking from './Components/Customer/Booking';
import CustomerBook from './Components/Customer/Booked';
import ViewBooking from './Components/Customer/ViewBooking';
import CustBooking from './Components/Owner/CustBooking'; //Admin
import UpdateBooking  from './Components/Owner/UpdateBooking'; //Admin
import EditService from './Components/Owner/EditService';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import Home from './Components/Home';
import About from './Components/About';
import Footer from './Components/Footer';
function App() {
  return (
 
     
      <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-grow'>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/addservice" element={<AddService />}></Route>
            <Route path="/adminservice" element={<AdminService />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/adminhome" element={<Home />}></Route>
            <Route path="/customerhome" element={<Home />}></Route>
            <Route path="/customerhistory" element={<CustomerHistory />}></Route>
            <Route path="/customerbooking" element={<CustomerBooking />}></Route>
            <Route path="/customerbooked" element={<CustomerBook />}></Route>
            <Route path="/viewbooking" element={<ViewBooking />}></Route>
            <Route path="/admincustbooking" element={<CustBooking />}></Route>
            <Route path="/updatebooking" element={<UpdateBooking />}></Route>
            <Route path="/editservice" element={<EditService />}></Route>
            <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          </Routes>
          </main>
          <Footer className='mt-auto' />
      </div>
  
  );
}
export default App;
