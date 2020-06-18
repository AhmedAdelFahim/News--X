const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
router.post("/users/signup", authController.signup);
router.post("/users/signin", authController.signin);
module.exports = router
