const mongoose = require("mongoose");

// Define a new Mongoose schema for storing booking details
const AddBookingSchema = new mongoose.Schema({
    
    // Field for storing the date of the booking
    date: String, 

    // Field for storing the name of the customer who made the booking
    name: String,

    // Field for storing the email address of the customer
    email: String,

    // Field for storing the phone number of the customer
    phone: String,

    // Field for storing the name of the vehicle
    vname: String,

    // Field for storing the vehicle number (license plate)
    vno: String,

    // Field for storing the vehicle model
    vmodel: String,

    // Field for storing the customer's address
    address: String,

    // Field for storing the status of the booking (e.g., pending, completed, etc.)
    status: String,

    // Field for storing a list of services chosen by the customer, each service is a string
    service: [String],
    
}, 
{ 
    // Specifies the collection name in the MongoDB database where these records will be stored
    collection: "AddBooking", 
});

// Register the schema as a model in Mongoose, allowing it to interact with the MongoDB database
mongoose.model("AddBooking", AddBookingSchema);


// Sample Data
/*
    date : "Oil Service",
    name : "9630124587"
    email : "abcd@gmail.com",
    phone : "7502717171",
    vname : "Royal Enfield",
    vno : "TN72AS3452",
    vmodel : "Classic 350",
    address : "Tirunelveli",
    status : "Ready", //Three Type of Status Ready, Pending and Completed
    service : ["General Check Up","Oil Change"]
    */