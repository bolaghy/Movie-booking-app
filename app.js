require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
 const userRoutes = require('./Routers/UserRoutes');
const movieRoutes = require('./Routers/MoviesRoutes');
const theaterRoutes = require('./Routers/TheaterRoutes');
const showRoutes = require('./Routers/reservationRoutes');
const bookingRoutes = require('./Routers/BookingRoutes');
const paymentRoutes = require('./Routers/PaymentRoutes');
const PORT = process.env.PORT || 3000;
const api = process.env.api;



// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    


// Routes
app.use(`${api}`, userRoutes);
app.use(`${api}`, movieRoutes);           
app.use(`${api}`, theaterRoutes);      
app.use(`${api}`, showRoutes);
app.use(`${api}`, bookingRoutes);
app.use(`${api}`, paymentRoutes);
 

// Async function to start the server and connect to the database
const start = async ()=> {
    try {          
        await mongoose.connect(process.env.dbString)
        app.listen(PORT, ()=>{ 
        console.log(`server is listening and connected to DB on port http://localhost:${PORT}${api}`) 
})
    } catch (error) {
        console.log(error);     
    }   
}          
start ();  