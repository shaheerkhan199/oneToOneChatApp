const express = require('express');
const router = express.Router();
const userController = require("../controllers/User")
const auth = require("../middlewares/auth")

router.get('/', auth, userController.getAllUsers);


module.exports = router;