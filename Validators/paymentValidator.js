const Joi = require('joi');

// Validation schema for processing a payment
const paymentSchema = Joi.object({
  booking_id: Joi.string().hex().length(24).required(), // MongoDB ObjectId
  amount: Joi.number().positive().required(),
  payment_method: Joi.string().valid('Credit Card', 'UPI', 'PayPal').required(),
  payment_status: Joi.string().valid('Pending', 'Completed', 'Failed').default('Pending'),
});

module.exports = paymentSchema;