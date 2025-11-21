require('dotenv').config();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../utils/response');

exports.register = async (req, res) => {
    const { email, password, name, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return response.error(res, 'Email already in use', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      role: role || 'user'
    });

    return response.success(
      res,
      { id: user.id, email: user.email, name: user.name, role: user.role },
      201
    );

};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return response.error(res, 'Invalid credentials', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response.error(res, 'Invalid credentials', 401);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    return response.success(
      res,
      {
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
        token
      }
    );
};