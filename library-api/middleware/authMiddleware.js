const jwt = require('jsonwebtoken');
const response = require('../utils/response');

module.exports = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return response.error(res, 401, 'No token provided. Authorization denied.');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return response.error(res, 401, 'Invalid or expired token.');

  }
};