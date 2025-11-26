const express = require("express");
const cors = require("cors");

const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

const response = require("./utils/response");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  return response.error(
    res,
    err.message || "Internal Server Error",
    err.status || 500
  );
});

module.exports = app;
