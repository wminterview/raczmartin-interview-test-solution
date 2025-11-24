const response = require("../utils/response");
const { Book, sequelize } = require("../models");
const { Op } = require("sequelize");

// List all books
exports.getBooks = async (req, res) => {
  try {
    const { page, limit, offset } = req.pagination;
    const { search, available } = req.query;

    // Build where clause
    const where = {};

    if (search?.toString().trim()) {
      const term = search
        .toString()
        .trim()
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = `(^|\\s)${term}`;
      where[Op.or] = [
        { title: { [Op.iRegexp]: pattern } },
        { author: { [Op.iRegexp]: pattern } },
      ];
    }

    if (available !== undefined) {
      const val = available.toString().toLowerCase();
      if (val === "1" || val === "true") where.available = true;
      if (val === "0" || val === "false") where.available = false;
    }

    const { rows: books, count: total } = await Book.findAndCountAll({
      where,
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });

    const pagination = {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };

    return response.paginated(res, books, pagination, 200);
  } catch (error) {
    return response.error(res, error, 500);
  }
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
  return response.success(res, { book });
};

// Delete a book
exports.deleteBook = async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return response.notFoundError(res);
  await book.destroy();
  return response.success(res, { message: "Book deleted successfully" });
};
