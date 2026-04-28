const express = require('express');
const router = express.Router();
const commentControllers = require("../controllers/commentControllers");
const auth = require("../middlewares/authMiddleware");

router.post('/', auth, commentControllers.addComment);

module.exports = router;