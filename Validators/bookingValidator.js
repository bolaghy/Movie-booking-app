const Joi = require('joi');

const bookingValidator = Joi.object({
  user_id: Joi.string().hex().length(24).required(), // MongoDB ObjectId is 24-character hex string
  show_id: Joi.string().hex().length(24).required(),
  number_of_tickets: Joi.number().integer().min(1).required(),
  total_price: Joi.number().min(0).required(),
  status: Joi.string().valid('confirmed', 'cancelled').default('confirmed'),
});

module.exports = bookingValidator;