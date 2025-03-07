const Joi = require('joi');

// Validation schema for adding/updating a show
const showSchema = Joi.object({
  movie_id: Joi.string().hex().length(24).required(), // MongoDB ObjectId
  theater_id: Joi.string().hex().length(24).required(), // MongoDB ObjectId
  show_time: Joi.date().required(),
  available_seats: Joi.number().positive().required(),
});

module.exports = showSchema;