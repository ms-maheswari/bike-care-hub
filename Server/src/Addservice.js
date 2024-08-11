const mongoose = require("mongoose");

// Define a new Mongoose schema for storing service details
const AddServiceSchema = new mongoose.Schema({

    // Field for storing the name of the service
    sname: String,

    // Field for storing the description of the service
    sdesc: String,

    // Field for storing the amount or price of the service as a string
    samount: String,

}, 
{ 
    // Specifies the collection name in the MongoDB database where these records will be stored
    collection: "AddService", 
});

// Register the schema as a model in Mongoose, allowing it to interact with the MongoDB database
mongoose.model("AddService", AddServiceSchema);


//Samlpe Data 
/*
const AddService = [{
    sname : "Oil Service",
    sdesc : "Oil service to all vehicles",
    samount : "1700" 
}]
*/ 