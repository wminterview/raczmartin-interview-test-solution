require("dotenv").config();
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const response = require("../utils/response");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { email, password, name, role } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return response.error(res, "Email already in use", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashedPassword,
    name,
    role: role || "user",
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    sameSite: "Lax",
    secure: true,
    path: "/",
  });

  return response.success(
    res,
    {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token: accessToken,
    },
    201
  );
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return response.error(res, "Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return response.error(res, "Invalid credentials", 401);
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    sameSite: "Lax",
    secure: true,
    path: "/",
  });

  return response.success(res, {
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    token: accessToken,
  });
};

exports.validate = async (req, res) => {
  try {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;

    if (!accessToken && !refreshToken) {
      return response.error(res, "Not authenticated", 401);
    }

    // Try access token first
    if (accessToken) {
      try {
        const payload = jwt.verify(accessToken, JWT_SECRET);
        const user = await User.findByPk(payload.id);

        if (!user) return response.error(res, "User not found", 404);

        return response.success(res, {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
          token: accessToken,
        });
      } catch {
        // Access token expired, fallback to refresh token
      }
    }

    if (!refreshToken) return response.error(res, "Not authenticated", 401);

    try {
      const payload = jwt.verify(refreshToken, JWT_SECRET);
      const user = await User.findByPk(payload.id);
      if (!user) return response.error(res, "User not found", 404);

      // Generate new access token
      const newAccessToken = generateAccessToken(user);

      return response.success(res, {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token: newAccessToken,
      });
    } catch {
      return response.error(res, "Invalid refresh token", 401);
    }
  } catch (err) {
    console.error(err);
    return response.error(res, "Validation failed", 500);
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      path: "/",
    });

    return response.success(res, { success: true });
  } catch (err) {
    console.error(err);
    return response.error(res, "Logout failed", 500);
  }
};
