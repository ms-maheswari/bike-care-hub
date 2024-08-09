const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());
app.use(cors());
const moment = require('moment');

//Send In Blue Platform for Email
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = "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";
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

//MongoDB URL
const mogoDburl = "mongodb+srv://mahes7439:tLJ2nH98OFe0tnCj@bike.uypnafv.mongodb.net/?retryWrites=true&w=majority&appName=bike";

//Database Connection
mongoose.connect(mogoDburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to database");
}).catch((e) => console.log(e));

app.listen(5000, () => console.log('Server Started'));
const CustInfo = require('./src/Customer');
//Importing Modules
// require("./src/Customer");
const User = mongoose.model("CustInfo");
require("./src/Admin");
const Admin = mongoose.model("AdminInfo");
require("./src/Addservice");
const AService = mongoose.model("AddService");
require("./src/AddBooking");
const CBooking = mongoose.model("AddBooking");


//ADMIN SIDE Connectivity
//Add Service
app.post("/addservice", async (req, res) => {
    const { sname, sdesc, samount } = req.body;
    try {
        const check = await AService.findOne({ sname });
        if (check === null) {
            await AService.create({ sname, sdesc, samount, });
            res.send({ status: "ok" });
        } else {
            res.send({ status: "error1" });
        }
    } catch (error) {
        res.send({ send: "catch error" });
    }
});

//View All Service
app.post("/service", async (req, res) => {
    try {
        const data = await AService.find();
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
});

//Fetch A Service
app.post("/fetchservice", async (req, res) => {
    const { _id } = req.body;
    try {
        const data = await AService.findOne({ _id: _id });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
});

//Update A Service
app.post("/updateservice", async (req, res) => {
    var { data } = req.body;
    try {
        data = await AService.updateOne({ _id: data._id }, { $set: { sname: data.sname, sdesc: data.sdesc, samount: data.samount } });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
});

//Delete A Service
app.post("/deleteservice", async (req, res) => {
    const { _id } = req.body;
    try {
        const data = await AService.deleteOne({ _id: _id });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
});

//Fetch All Booking
app.post("/custbooking", async (req, res) => {
    const { status } = req.body;
    try {
        if (status == null) {
            const data = await CBooking.find();
            res.send({ status: "OK", data: data });
        } else {
            const data = await CBooking.find({ status });
            res.send({ status: "OK", data: data });
        }

    } catch (error) {
        console.log(error);
    }
});

//Update Service

// app.post("/updatebooking", async (req, res) => {
//     const { _id, status } = req.body;
//     try {
//         var data = await CBooking.updateOne({ _id: _id }, { $set: { status: status } });
//         data = await CBooking.findOne({ _id: _id });
//         if (status === "Ready") {
//             const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
//             const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
//             sendSmtpEmail.to = [{ "email": data.email }];
//             sendSmtpEmail.templateId = 2;
//             sendSmtpEmail.params = {
//                 "Date": data.date,
//                 "Name": data.name,
//                 "Make": data.vname,
//                 "Model": data.vmodel,
//                 "Number": data.vno,
//                 "Service": data.service,
//             };
//             apiInstance.sendTransacEmail(sendSmtpEmail).then(() => {
//                 console.log("Ready for Delivery email sent");
//             }).catch((err) => {
//                 console.log(err);
//             });
//         }
//         res.send({ status: "ok", data: data });
//     } catch (error) {
//         console.log(error);
//     }
// });



// Update Booking
app.post("/updatebooking", async (req, res) => {
    const { _id, status } = req.body;
    try {
        // Update the booking status
        let booking = await CBooking.updateOne({ _id: _id }, { $set: { status: status } });
        booking = await CBooking.findOne({ _id: _id });

        // Check if the status is "Ready" and send an email if it is
        if (status === "Ready") {
            // Get the customer email
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
                    <p>Best regards,<br>Your Service Team</p>
                </body>
                </html>
            `;

            // Send the email
            await sendEmail(adminEmail, customerEmail, subject, htmlContent);
            
            console.log("Booking update email sent to customer");
        }

        res.send({ status: "ok", data: booking });
    } catch (error) {
        console.error("Error updating booking:", error);
        res.send({ status: "error", message: "An error occurred while updating the booking" });
    }
});

//Update Number of Book per day
app.post("/updatenoofbook", async (req, res) => {
    var { noofbook } = req.body;
    try {
        const data = await Admin.updateOne({}, { $set: { noofbook: noofbook } });
        res.send({ status: "ok"});
    } catch (error) {
        console.log(error);
    }
});


//User Service
//User Login
app.post("/login", async (req, res) => {
    const { uname, password } = req.body;
    try {
        let user = null;
        if (uname === "mahes7439@gmail.com" || uname === "7123789456") {
            user = await Admin.findOne({}, { pass: 1 });
        } else {
            user = await User.findOne({ $or: [{ email: uname }, { phone: uname }] });
        }

        if (!user) {
            return res.json({ error: "User Not Found" });
        }

        const valid = await bcrypt.compare(password, user.pass);
        if (valid) {
            return res.json({ status: "ok", data: user });
        }
        
        res.json({ status: "error", error: "Invalid Password" });
    } catch (error) {
        console.log(error);
        res.json({ status: "error", error: "An error occurred" });
    }
});

//User Register
app.post("/signup", async (req, res) => {
    var { email, phone, pass } = req.body;
    console.log(`Registering user with email: ${email}, phone: ${phone}`);
    
    let role = null;
    // Check the plain password before hashing
    if (email === "mahes7439@gmail.com" && pass === "Service@2023") {
        role = "admin";
    } else {
        role = "user";
    }

    // Hash the password after assigning the role
    pass = await bcrypt.hash(pass, 13);

    try {
        const check = await User.findOne(({ $or: [{ email }, { phone }] }));
        if (check === null) {
            await User.create({
                email,
                phone,
                pass,
                role,
            });
            res.send({ status: "ok" });
        } else {
            res.send({ status: "error" });
        }
    } catch (error) {
        console.log("Error during signup:", error);
        res.send({ send: "catch error" });
    }
});


// Function to send email
const sendEmail = async (fromEmail, toEmail, subject, htmlContent) => {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.sender = { email: fromEmail }; // Set the sender's email to the fetched email
    sendSmtpEmail.to = [{ email: toEmail }];
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = htmlContent;

    try {
        await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};


//ADD Booking and Send Email
app.post("/addbooking", async (req, res) => {
    const { date, name, email, phone, vname, vno, vmodel, address, service } = req.body;
    const status = "Pending";
    const normalizedDate = moment(date).startOf('day').toDate();

    try {
        // Check for existing booking
        const existingBooking = await CBooking.findOne({ date: normalizedDate, vno: vno });
        const ongoingBooking = await CBooking.findOne({ vno: vno, status: { $in: ["Pending", "Ready"] } });
        let bookingLimit = 10;
        const adminData = await Admin.findOne({}, { noofbook: 10 });
        if (adminData) {
            bookingLimit = adminData.noofbook;
        }

        const bookingCount = await CBooking.countDocuments({ date: normalizedDate });

        if (existingBooking) {
            res.send({ status: "exist" });
        } else if (ongoingBooking) {
            res.send({ status: "NotCompleted" });
        } else if (bookingCount >= bookingLimit) {
            res.send({ status: "Bookfilles" });
        } else {
            // Save the new booking
            const newBooking = new CBooking({
                date: normalizedDate,
                name,
                email,
                phone,
                vname,
                vno,
                vmodel,
                address,
                service,
                status
            });

            await newBooking.save();

            // Send email notification
            const adminUser = await CustInfo.findOne({ role: 'admin' });
            const adminEmail = adminUser ? adminUser.email : 'default-sender@example.com';
            const htmlContent = `
                <html>
                <body>
                    <h1>New Booking Received</h1>
                    <p><strong>Date:</strong> ${normalizedDate}</p>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Make:</strong> ${vname}</p>
                    <p><strong>Model:</strong> ${vmodel}</p>
                    <p><strong>Number:</strong> ${vno}</p>
                    <p><strong>Address:</strong> ${address}</p>
                    <p><strong>Service:</strong> ${service.join(", ")}</p>
                </body>
                </html>
            `;

            await sendEmail(email, adminEmail, 'New Booking Notification', htmlContent);

            res.send({ status: "ok" });
        }
    } catch (error) {
        console.error("Error during booking:", error);
        res.status(500).send({ status: "error", message: "An error occurred during booking" });
    }
});


//Fetch All Completed Booking
app.post("/history", async (req, res) => {
    const { email } = req.body;
    try {
        const data = await CBooking.find({ email: email, status: "Completed" });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
});

//Fetch All Booking without Status Completed
app.post("/fetchbook", async (req, res) => {
    const { email } = req.body;
    try {
        const data = await CBooking.find({ email: email, status: { $nin: ["Completed"] } });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
});

//Details of  Booking
app.post("/viewbooking", async (req, res) => {
    const { _id } = req.body;
    try {
        const data = await CBooking.findOne({ _id });
        res.send({ status: "OK", data: data });
    } catch (error) {
        console.log(error);
    }
});

//Admin and User Forgot Password
app.post("/forgotpasswordotp", async (req, res) => {
    var { email, otp } = req.body;
    try {
        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.to = [{ "email": email }];
        sendSmtpEmail.templateId = 3;
        sendSmtpEmail.params = {
            "Otp": otp
        };
        apiInstance.sendTransacEmail(sendSmtpEmail).then(() => {
            console.log("Password reset email sent");
        }).catch((err) => {
            console.log(err);
        });
        res.send({ status: "ok" });
    } catch (error) {
        console.log(error);
    }
});

//Update Password
app.post("/forgotpasswordupdate", async (req, res) => {
    var { email, pass } = req.body;
    pass = await bcrypt.hash(pass, 13);
    try {
        if (email === "mahes7439@gmail.com" || email === "7123789456") {
            data = await Admin.updateOne({ email: email }, { $set: { pass: pass } });
        } else {
            data = await User.updateOne({ email: email }, { $set: { pass: pass } });
        }
        res.send({ status: "ok", data: data });
    } catch (error) {
        console.log(error);
    }
});
