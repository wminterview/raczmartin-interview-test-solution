const { validationResult } = require('express-validator');
const response = require('../utils/response');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return response.validationError(
      res,
      errors.array().map(e => ({ field: e.param, message: e.msg })),
    );
  }
  next();
};