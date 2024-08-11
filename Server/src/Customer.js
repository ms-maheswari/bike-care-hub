const mongoose = require("mongoose");

// Define the schema for storing customer details
// This schema outlines the structure of the data related to customers that will be stored in the database
const CustDetailsSchema = new mongoose.Schema({

    // Field to store the customer's email address
    // The email is required for customer registration and login
    email: { 
        type: String,        // Data type is a string
        required: true       // This field is mandatory
    },

    // Field to store the customer's phone number
    // The phone number is required for contact and verification purposes
    phone: { 
        type: String,        // Data type is a string (could include country code)
        required: true       // This field is mandatory
    },

    // Field to store the customer's password
    // The password is required for authentication and is usually stored in a hashed format for security
    pass: { 
        type: String,        // Data type is a string
        required: true       // This field is mandatory
    },

    // Field to store the customer's role
    // The role defines the level of access the user has within the application (e.g., customer, admin)
    role: { 
        type: String,        // Data type is a string
        required: true       // This field is mandatory
    },

}, { 
    // Specifies the collection name in the MongoDB database where customer details will be stored
    collection: "CustInfo" 
});

// Create and export the model
// By defining the model, we enable interaction with the MongoDB collection using Mongoose methods
const CustInfo = mongoose.model("CustInfo", CustDetailsSchema);

// Export the model to make it available for import in other parts of the application
module.exports = CustInfo;

//Samlpe Data
/*
const CustInfo = [{
    email : "abcd@gmail.com",
    phone : "7502717171"
    pass : "@Abc123" // Data will convert into hashed value and stored in the Database
    role : "User"
}]
*/ 