const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_EXPIRE = "5m";
const REFRESH_EXPIRE = "30d";

exports.generateAccessToken = (user) =>
  jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: ACCESS_EXPIRE,
  });

exports.generateRefreshToken = (user) =>
  jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: REFRESH_EXPIRE });
