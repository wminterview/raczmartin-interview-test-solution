const app = require('./app');
const dotenv = require('dotenv');
const { connectDB } = require('./config/database');

dotenv.config();

connectDB(); // <-- Connect to the database before starting the server

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});