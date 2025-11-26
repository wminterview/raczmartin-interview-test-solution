const { faker } = require("@faker-js/faker");
const defineBook = require("../models/book");
const { connectDB, sequelize } = require("../config/database");

const Book = defineBook(sequelize);

async function seedBooks() {
  try {
    await connectDB(); // ensures DB is connected and synced
    console.log("Seeding books...");

    const categories = [
      "Fiction",
      "Science",
      "History",
      "Technology",
      "Biography",
    ];

    const books = [];
    for (let i = 0; i < 30; i++) {
      books.push({
        title: faker.lorem.words(3),
        author: faker.person.fullName(),
        isbn: faker.datatype.uuid(),
        year: faker.datatype.number({
          min: 1900,
          max: new Date().getFullYear(),
        }),
        available: faker.datatype.boolean(),
        category: faker.helpers.arrayElement(categories),
        description: faker.lorem.paragraph(),
        coverImage: faker.image.imageUrl(200, 300, "books", true),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await Book.bulkCreate(books, { ignoreDuplicates: true });
    console.log("Successfully seeded 30 books!");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    await sequelize.close();
    console.log("Database connection closed");
  }
}

seedBooks();
