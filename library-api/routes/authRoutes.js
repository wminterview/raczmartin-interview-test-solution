const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const asyncHandler = require("../utils/asyncHandler");

router.post("/login", asyncHandler(authController.login));
router.post("/register", asyncHandler(authController.register));
router.get("/validate", asyncHandler(authController.validate));
router.post("/logout", asyncHandler(authController.logout));

module.exports = router;
