const Joi = require('joi');

const movieJoiSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required',
    'any.required': 'Title is required',
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required',
    'any.required': 'Description is required',
  }),
  duration: Joi.number().required().messages({
    'number.base': 'Duration must be a number',
    'any.required': 'Duration is required',
  }),
  genre: Joi.string().required().messages({
    'string.empty': 'Genre is required',
    'any.required': 'Genre is required',
  }),
  release_date: Joi.date().required().messages({
    'date.base': 'Release date must be a valid date',
    'any.required': 'Release date is required',
  }),
  poster_url: Joi.string().uri().messages({
    'string.uri': 'Poster URL must be a valid URL',
  }),
});

module.exports = movieJoiSchema;