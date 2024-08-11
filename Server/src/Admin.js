const mongoose = require("mongoose");

// Define a new Mongoose schema for storing admin details
const AdminDetailsSchema = new mongoose.Schema({

    // Field for storing the email address of the admin
    email: String,

    // Field for storing the phone number of the admin
    phone: Number,

    // Field for storing the number of bookings managed by the admin
    noofbook: Number,

    // Field for storing the admin's password
    pass: String,

    // Field for storing the role of the user (e.g., admin, superadmin)
    role: String,

}, 
{ 
    // Specifies the collection name in the MongoDB database where admin details will be stored
    collection: "AdminInfo", 
});

// Register the schema as a model in Mongoose, allowing interaction with the MongoDB database
mongoose.model("AdminInfo", AdminDetailsSchema);


//Samlpe Data 
/*
const AdminInfo = [{
    email : "mahes7439@gmail.com",
    phone : "9632014782",
    pass : "@Mahes123" ,
    role : "Admin"
}]
*/ 