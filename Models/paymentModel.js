const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  amount: { type: Number, required: true },
  payment_method: { type: String, required: true },
  payment_status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  payment_time: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', paymentSchema);