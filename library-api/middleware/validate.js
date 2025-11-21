const response = require('../utils/response');
const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return response.error(
      res,
      errors.array().map(e => ({ field: e.param, message: e.msg })),
	  "Validation failed",
      400
    );
  }
  next();
};