const { sequelize } = require('../config/database');
const Book = require('./book')(sequelize);
const User = require('./user')(sequelize);

// Define associations here if needed
// e.g., User.hasMany(Book);

module.exports = {
  Book,
  User,
  sequelize,
};