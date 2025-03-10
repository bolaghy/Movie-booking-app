const Joi = require('joi');

// Validation schema for user registration
const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name cannot be empty',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email cannot be empty',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Password is required',
    'string.min': 'Password must be at least 6 characters long',
    'string.empty': 'Password cannot be empty',
  }),
  confirm_password: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
  }),
  phone_number: Joi.string()
    .pattern(/^[0-9]{11}$/)
    .messages({
      'string.pattern.base': 'Phone number must be a 11-digit number',
    }),
    profile_pic: Joi.string().uri().messages({
    'string.uri': 'Profile picture must be a valid URL', 
  }),
  cover_photo: Joi.string().uri().messages({
    'string.uri': 'Cover photo must be a valid URL',
  }),
  role: Joi.string().valid('user', 'admin').default('user').messages({
    'any.only': 'Role must be either "user" or "admin"',
  }),
});

// Validation schema for user login
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email cannot be empty',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Password is required',
    'string.min': 'Password must be at least 6 characters long',
    'string.empty': 'Password cannot be empty',
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
}; 