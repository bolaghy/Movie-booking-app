const Booking = require('../Models/bookingModel');
const bookingValidator = require('../Validators/bookingValidator');

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { error } = bookingValidator.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    

    const booking = new Booking(req.body);
    await booking.save();

     // Populate movie and theater details
        const populatedBooking = await Booking.findById(booking._id)
        .populate('user_id', 'name') 
    

    res.status(201).json({ success: true, message: 'Booking created successfully', data: populatedBooking });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create booking', error: err.message });
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user_id','-password').populate('show_id'); 

    res.status(200).json({ success: true, message: 'Bookings fetched successfully', data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch bookings', error: err.message });
  }
};    

// Get a single booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('user_id','-password').populate('show_id');
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.status(200).json({ success: true, message: 'Booking fetched successfully', data: booking });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch booking', error: err.message });
  }
};

// Update a booking
const updateBooking = async (req, res) => {
  try {
    const { error } = bookingValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.status(200).json({ success: true, message: 'Booking updated successfully', data: booking });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update booking', error: err.message });
  }
};

// Delete a booking
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.status(200).json({ success: true, message: 'Booking deleted successfully', data: booking });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete booking', error: err.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};