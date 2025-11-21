const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Book = sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255]
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255]
      }
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // You may want to implement custom ISBN validation here
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1900,
        max: new Date().getFullYear()
      }
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    category: {
      type: DataTypes.ENUM('Fiction', 'Science', 'History', 'Technology', 'Biography'),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    coverImage: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: true,
    tableName: 'books'
  });

  return Book;
};
