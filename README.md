
# BikeCare Hub

## Project Overview

**BikeCare Hub** is a comprehensive bike service application that connects bike service station owners with customers seeking reliable bike maintenance and repair services. The platform allows users to book services, manage bookings, and receive notifications, while providing bike station owners with a streamlined way to list and manage their services.

## Features

- User registration and login
- Booking services
- Admin panel for managing services and bookings
- Email notifications for bookings
- Dashboard for viewing current bookings and stats

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **HTTP Requests**: Axios

## Installation Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB server running

### Clone the Repository
```bash
git clone https://github.com/ms-maheswari/bike-care-hub.git
cd bike-care-hub
```

### Client
```bash
cd client
npm install
```
### Server
```bash
cd ../server
npm install
```
### Configuration
1. Create a .env file in the server directory with the following environment variables:

```env
MONGODB_URI=mongodb://localhost:27017/bikecarehub
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
```
2. Replace your_email_user, and your_email_password with your actual values.

### Running the Application

Start the Backend Server
```bash
cd server
npm start
```
Start the Frontend Client
```bash
cd ../client
npm start
```
The application should now be running on http://localhost:3000 for the frontend and http://localhost:5000 for the backend.

### Database Schema

### Users Collection
```json
{
  "user_id": "ObjectId",
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string" // either "customer" or "admin"
}
```
### Services Collection
```json
{
  "service_id": "ObjectId",
  "name": "string",
  "description": "string",
  "price": "number"
}
```
### Bookings Collection
```json
{
  "booking_id": "ObjectId",
  "user_id": "ObjectId",
  "service_id": "ObjectId",
  "date": "date",
  "status": "string" // e.g., "pending", "completed"
}
```


## Screenshots

![Registration Form](Client\src\Assets\1.png)