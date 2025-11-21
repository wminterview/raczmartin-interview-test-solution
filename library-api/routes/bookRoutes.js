const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const bookController = require('../controllers/bookController');
const validate = require('../middleware/validate');
const { createBookValidator } = require('../middleware/bookValidators');
const asyncHandler = require('../utils/asyncHandler');

// Public routes
router.get('/', asyncHandler(bookController.getBooks));
router.get('/search', asyncHandler(bookController.searchBooks));
router.get('/:id', asyncHandler(bookController.getBookById));

// Protected routes 
router.post('/', authenticate, createBookValidator, validate, asyncHandler(bookController.createBook));
router.put('/:id', authenticate, asyncHandler(bookController.updateBook));
router.delete('/:id', authenticate, asyncHandler(bookController.deleteBook));

module.exports = router;