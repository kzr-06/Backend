const express = require('express');
const router = express.Router();

const postControllers = require("../controllers/postControllers")
const auth = require("../middlewares/authMiddleware")
// const    

router.get("/",auth,postControllers.getAllPosts)
router.post("/",auth,postControllers.createPost)
router.get("/create",auth,postControllers.createPostRender)
router.get("/:id",auth,postControllers.getPostById)
router.get("/:id/edit",auth,postControllers.getEditPostRender)
router.post("/:id/edit",auth,postControllers.updatePost)
router.post("/:id/delete",auth,postControllers.deletePost)

// router.get("/:postId/comments")


// Get a post by id 

module.exports = router;