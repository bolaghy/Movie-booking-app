const Joi = require('joi');

const showJoiSchema = Joi.object({
  movie_id: Joi.string().required().messages({
    'string.empty': 'Movie ID is required',
    'any.required': 'Movie ID is required',
  }),
  theater_id: Joi.string().required().messages({
    'string.empty': 'Theater ID is required',
    'any.required': 'Theater ID is required',
  }),
  show_time: Joi.date().required().messages({
    'date.base': 'Show time must be a valid date',
    'any.required': 'Show time is required',
  }),
  available_seats: Joi.array().items(Joi.string()).required().min(0).messages({
    'number.base': 'Available seats must be a number',
    'number.min': 'Available seats cannot be negative',
    'any.required': 'Available seats is required',
  }),
});

module.exports = showJoiSchema;