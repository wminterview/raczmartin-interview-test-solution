const express = require('express');
const router = express.Router();
// const { authenticate } = require('../middleware/authMiddleware');
// const userController = require('../controllers/userController');

router.get('/profile', /*authenticate,*/ (req, res) => {
  // userController.getProfile
  res.json({ message: 'User profile endpoint' });
});

module.exports = router;