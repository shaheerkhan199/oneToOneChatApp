const express = require('express');
const router = express.Router();
const chatController = require("../controllers/Chat")
const auth = require("../middlewares/auth")

router.get('/:id', auth, chatController.getUserChat);


module.exports = router;