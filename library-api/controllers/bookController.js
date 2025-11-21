const response = require('../utils/response');
const { Book } = require('../models');

// List all books
exports.getBooks = async (req, res) => {
  const books = await Book.findAll();
  return response.success(res, { books });
};

// Search books
exports.searchBooks = async (req, res) => {
  // TODO: Implement advanced search logic
  res.json({ message: 'Search books (not implemented)' });
};

// Get book by ID
exports.getBookById = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return response.notFoundError(res);
  return response.success(res, { book });
};

// Create a new book
exports.createBook = async (req, res) => {
   const book = await Book.create(req.body);
   return response.success(res, { book }, 201);
};

// Update a book
exports.updateBook = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return response.notFoundError(res);
  await book.update(req.body);
  return response.success(res, { book })
};

// Delete a book
exports.deleteBook = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return response.notFoundError(res);
  await book.destroy();
  return response.success(res, { message: "Book deleted successfully" })
};