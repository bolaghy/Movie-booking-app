const Joi = require('joi');

// Validation schema for creating a booking
const bookingSchema = Joi.object({
  user_id: Joi.string().hex().length(24).required(), // MongoDB ObjectId
  show_id: Joi.string().hex().length(24).required(), // MongoDB ObjectId
  number_of_tickets: Joi.number().positive().required(),
  total_price: Joi.number().positive().required(),
});

module.exports = bookingSchema;