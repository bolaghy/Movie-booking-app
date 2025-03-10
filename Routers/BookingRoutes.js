const express = require('express');
const router = express.Router();
const {  createBooking, getAllBookings,  getBookingById,
    updateBooking, deleteBooking,} = require('../Controllers/bookingController');

router.post('/create-booking', createBooking);
router.get('/all-booking', getAllBookings);
router.get('/booking/:id', getBookingById);
router.put('/update-booking/:id', updateBooking);
router.delete('/delete-booking/:id', deleteBooking);

module.exports = router;