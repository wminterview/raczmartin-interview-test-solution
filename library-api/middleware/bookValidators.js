const { body } = require('express-validator');

exports.createBookValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('isbn').notEmpty().withMessage('ISBN is required'),
  body('year').isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Year must be valid'),
  body('category').isIn(['Fiction', 'Science', 'History', 'Technology', 'Biography']).withMessage('Invalid category'),
];