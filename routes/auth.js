const express = require('express');
const router = express.Router();
const authController = require("../controllers/Auth")




router.post('/signup', authController.signUp);

router.post('/login', authController.login);

module.exports = router;