const mongoose = require("mongoose");

// Define the schema
const CustDetailsSchema = new mongoose.Schema({
    email: { type: String, required: true },
    phone: { type: String, required: true },
    pass: { type: String, required: true },
    role: { type: String, required: true },
}, { collection: "CustInfo" });

// Create and export the model
const CustInfo = mongoose.model("CustInfo", CustDetailsSchema);
module.exports = CustInfo;

