const Payment = require('../Models/paymentModel'); 
const paymentValidator = require('../Validators/paymentValidator');

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const { error } = paymentValidator.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json({ success: true, message: 'Payment created successfully', data: payment });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create payment', error: err.message });
  }
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('booking_id');
    res.status(200).json({ success: true, message: 'Payments fetched successfully', data: payments });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch payments', error: err.message });
  }
};

// Get a single payment by ID
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('booking_id');
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }
    res.status(200).json({ success: true, message: 'Payment fetched successfully', data: payment });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch payment', error: err.message });
  }
};

// Update a payment
const updatePayment = async (req, res) => {
  try {
    const { error } = paymentValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }
    res.status(200).json({ success: true, message: 'Payment updated successfully', data: payment });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update payment', error: err.message });
  }
};

// Delete a payment
const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }
    res.status(200).json({ success: true, message: 'Payment deleted successfully', data: payment });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete payment', error: err.message });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};