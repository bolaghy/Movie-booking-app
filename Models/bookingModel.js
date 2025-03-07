const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  show_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
  number_of_tickets: { type: Number, required: true },
  total_price: { type: Number, required: true },
  booking_time: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);