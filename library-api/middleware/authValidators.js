const { body } = require('express-validator');
const { User } = require('../models');
const response = require('../utils/response');

exports.registerValidator = [
  body('email')
    .isEmail().withMessage('Valid email is required')
    .custom(async (value) => {
      const existing = await User.findOne({ where: { email: value } });
      if (existing) {
        throw new Error('Email must be unique');
      }
      return true;
    }),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name')
    .notEmpty().withMessage('Name is required'),
  body('role')
    .optional()
    .isIn(['user', 'admin']).withMessage('Role must be user or admin'),
];

exports.loginValidator = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];