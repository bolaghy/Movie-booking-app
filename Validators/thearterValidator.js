const Joi = require('joi');

const theaterJoiSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Theater name is required',
    'any.required': 'Theater name is required',
  }),
  location: Joi.string().required().messages({
    'string.empty': 'Theater location is required',
    'any.required': 'Theater location is required',
  }),
  total_seats: Joi.number().required().min(1).messages({
    'number.base': 'Total seats must be a number',
    'number.min': 'Total seats must be at least 1',
    'any.required': 'Total seats is required',
  }),
});

module.exports = theaterJoiSchema;