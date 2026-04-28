const express = require('express');
const router = express.Router();

const userControllers = require("../controllers/userControllers")
const postControllers = require("../controllers/postControllers");
const auth = require("../middlewares/authMiddleware")


router.get("/:userId/posts",auth,postControllers.getUserPosts)



module.exports = router;
