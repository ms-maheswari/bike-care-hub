const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const bcrypt = require('bcrypt');4
const bcrypt = require('bcryptjs');
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Middleware to handle Cross-Origin Resource Sharing
const moment = require('moment');
const nodemailer = require('nodemailer');

// Set up Nodemailer transporter to send emails
const transporter = nodemailer.createTransport({
    service: 'gmail', // Email service provider
    auth: {
        user: 'mahes7439@gmail.com', // Replace with your email address
        pass: 'nzccprumcbcmzxzh'   // Replace with your email password
    }
});

// MongoDB connection string
const mogoDburl = "mongodb+srv://mahes7439:tLJ2nH98OFe0tnCj@bike.uypnafv.mongodb.net/?retryWrites=true&w=majority&appName=bike";

// Connect to MongoDB
mongoose.connect(mogoDburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to database"); // Success message
}).catch((e) => console.log(e)); // Error handling

app.listen(5000, () => console.log('Server Started')); // Start the server on port 5000

// Import Mongoose models
const CustInfo = require('./src/Customer');
const User = mongoose.model("CustInfo"); // Model for customer information
require("./src/Admin");
const Admin = mongoose.model("AdminInfo"); // Model for admin information
require("./src/Addservice");
const AService = mongoose.model("AddService"); // Model for services
require("./src/AddBooking");
const CBooking = mongoose.model("AddBooking"); // Model for customer bookings

// ADMIN SIDE Connectivity

// Add a new service
app.post("/addservice", async (req, res) => {
    const { sname, sdesc, samount } = req.body;
    try {
        // Check if service already exists
        const check = await AService.findOne({ sname });
        if (check === null) {
            // Create a new service if it doesn't exist
            await AService.create({ sname, sdesc, samount });
            res.send({ status: "ok" });
        } else {
            res.send({ status: "error1" }); // Service already exists
        }
    } catch (error) {
        res.send({ send: "catch error" }); // Error handling
    }
});

// View all services
app.post("/service", async (req, res) => {
    try {
        // Fetch all services from the database
        const data = await AService.find();
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error); // Error handling
    }
});

// Fetch a specific service by ID
app.post("/fetchservice", async (req, res) => {
    const { _id } = req.body;
    try {
        // Fetch service details by ID
        const data = await AService.findOne({ _id: _id });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error); // Error handling
    }
});

// Update an existing service
app.post("/updateservice", async (req, res) => {
    var { data } = req.body;
    try {
        // Update service details
        data = await AService.updateOne({ _id: data._id }, { $set: { sname: data.sname, sdesc: data.sdesc, samount: data.samount } });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error); // Error handling
    }
});

// Delete a service
app.post("/deleteservice", async (req, res) => {
    const { _id } = req.body;
    try {
        // Delete service by ID
        const data = await AService.deleteOne({ _id: _id });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error); // Error handling
    }
});

// Fetch all bookings or filter by status
app.post("/custbooking", async (req, res) => {
    const { status } = req.body;
    try {
        if (status == null) {
            // Fetch all bookings if no status is provided
            const data = await CBooking.find();
            res.send({ status: "OK", data: data });
        } else {
            // Fetch bookings by status
            const data = await CBooking.find({ status });
            res.send({ status: "OK", data: data });
        }
    } catch (error) {
        console.log(error); // Error handling
    }
});

// Update booking status and send email if status is "Ready"
app.post("/updatebooking", async (req, res) => {
    const { _id, status } = req.body;
    try {
        // Update the booking status
        let booking = await CBooking.updateOne({ _id: _id }, { $set: { status: status } });
        booking = await CBooking.findOne({ _id: _id });

        // Check if the status is "Ready" and send an email if it is
        if (status === "Ready") {
            const customerEmail = booking.email;
            const adminEmail = 'mahes7439@gmail.com'; // Replace with actual admin email
            const subject = 'Booking Status Update';
            const htmlContent = `
                <html>
                <body>
                    <h1>Booking Status Update</h1>
                    <p>Dear ${booking.name},</p>
                    <p>Your booking with the following details has been updated:</p>
                    <p><strong>Date:</strong> ${booking.date}</p>
                    <p><strong>Make:</strong> ${booking.vname}</p>
                    <p><strong>Model:</strong> ${booking.vmodel}</p>
                    <p><strong>Number:</strong> ${booking.vno}</p>
                    <p><strong>Service:</strong> ${booking.service}</p>
                    <p>Your booking status is now: <strong>${status}</strong></p>
                    <p>Thank you for choosing our service.</p>
                    <p>Best regards,<br>BikeCare Hub Service Team</p>
                </body>
                </html>
            `;

            // Send the email to customer
            await sendEmail(adminEmail, customerEmail, subject, htmlContent);

            console.log("Booking update email sent to customer");
        }

        res.send({ status: "ok", data: booking });
    } catch (error) {
        console.error("Error updating booking:", error); // Error handling
        res.send({ status: "error", message: "An error occurred while updating the booking" });
    }
});


// USER SIDE Connectivity

// User login
app.post("/login", async (req, res) => {
    const { uname, password } = req.body;
    try {
        let user = null;
        // Check if the username is an admin or a regular user
        if (uname === "mahes7439@gmail.com") {
            user = await Admin.findOne({}, { pass: 1 });
        } else {
            user = await User.findOne({ $or: [{ email: uname }, { phone: uname }] });
        }

        if (!user) {
            return res.json({ error: "User Not Found" }); // User not found
        }

        // Check if the password is correct
        const valid = await bcrypt.compare(password, user.pass);
        if (valid) {
            return res.json({ status: "ok", data: user });
        }

        res.json({ status: "error", error: "Invalid Password" }); // Invalid password
    } catch (error) {
        console.log(error); // Error handling
        res.json({ status: "error", error: "An error occurred" });
    }
});

// User registration
app.post("/signup", async (req, res) => {
    var { email, phone, pass } = req.body;
    console.log(`Registering user with email: ${email}, phone: ${phone}`);
    
    let role = null;
    // Determine role based on email and password
    if (email === "mahes7439@gmail.com" && pass === "@Mahes123") {
        role = "admin";
        pass = await bcrypt.hash(pass, 13);
        
        try {
        // Check if user already exists
        const check = await User.findOne({ email });
        if (!check) {
            // Create a new user if they don't already exist
            await Admin.create({
                email,
                phone,
                pass,
                role,
            });
            res.send({ status: "ok" });
        } else {
            res.send({ status: "error",message:"Admin already exists" }); // User already exists
        }
    } catch (error) {
        console.log("Error during signup:", error); // Error handling
        res.send({status: "error", message: "An error occurred during signup" });
    }
}else{
    role = "user";
    pass = await bcrypt.hash(pass, 13);
    try {
        // Check if user already exists
        const check = await User.findOne({ email });
        if (!check) {
            // Create a new user if they don't already exist
            await User.create({
                email,
                phone,
                pass,
                role,
            });
            res.send({ status: "ok" });
        } else {
            res.send({ status: "error",message:"User already exists" }); // User already exists
        }
    } catch (error) {
        console.log("Error during signup:", error); // Error handling
        res.send({status: "error", message: "An error occurred during signup" });
    }
}
});

// Function to send email using Nodemailer
const sendEmail = async (fromEmail, toEmail, subject, htmlContent) => {
    try {
        await transporter.sendMail({
            from: fromEmail,
            to: toEmail,
            subject: subject,
            html: htmlContent,
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error); // Error handling
    }
}

// Add a new booking and send email notification
app.post("/addbooking", async (req, res) => {
    const { date, name, email, phone, vname, vno, vmodel, address, service } = req.body;
    const status = "Pending";
    const normalizedDate = moment(date).startOf('day').toDate(); // Normalize date

    try {
        // Check if a booking already exists for the given date and vehicle number
        const existingBooking = await CBooking.findOne({ date: normalizedDate, vno: vno });

        if (existingBooking) {
            return res.json({ status: "error", message: "Booking already exists for the specified date and vehicle number" });
        }

        // Create a new booking
        await CBooking.create({
            date,
            name,
            email,
            phone,
            vname,
            vno,
            vmodel,
            address,
            service,
            status,
        });

        // Send email notification to admin
        const adminEmail = 'mahes7439@gmail.com'; // Replace with actual admin email
        const subject = 'New Booking Notification';
        const htmlContent = `
            <html>
            <body>
                <h1>New Booking Notification</h1>
                <p>Dear Admin,</p>
                <p>A new booking has been made with the following details:</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Vehicle Name:</strong> ${vname}</p>
                <p><strong>Vehicle Model:</strong> ${vmodel}</p>
                <p><strong>Vehicle Number:</strong> ${vno}</p>
                <p><strong>Service:</strong> ${service}</p>
                <p>Please check the details and take the necessary action.</p>
                <p>Best regards,<br>BikeCare Hub Service Team</p>
            </body>
            </html>
        `;

        await sendEmail(email, adminEmail, subject, htmlContent); // Send email to admin
        res.json({ status: "ok", message: "Booking added and email sent successfully" });
    } catch (error) {
        console.error("Error during booking creation:", error); // Error handling
        res.json({ status: "error", message: "An error occurred while creating the booking" });
    }
});

// Fetch all completed bookings for a user
app.post("/history", async (req, res) => {
    const { email } = req.body;
    try {
        const data = await CBooking.find({ email: email, status: "Completed" });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error); // Error handling
    }
});

// Fetch all bookings for a user, excluding completed ones
app.post("/fetchbook", async (req, res) => {
    const { email } = req.body;
    try {
        const data = await CBooking.find({ email: email, status: { $nin: ["Completed"] } });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error); // Error handling
    }
});

// View details of a specific booking
app.post("/viewbooking", async (req, res) => {
    const { _id } = req.body;
    try {
        const data = await CBooking.findOne({ _id });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error); // Error handling
    }
});
