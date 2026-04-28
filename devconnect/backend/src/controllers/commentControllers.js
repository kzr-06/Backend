const Comment = require("../models/Comment");
const Post = require("../models/Post");

const addComment = async (req, res) => {
    try {
        const { text, postId } = req.body;
        
        if (!text || !postId) {
            return res.status(400).send("Text and postId are required");
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).send("Post not found");
        }

        await Comment.create({
            text,
            post: postId,
            author: req.user.userId
        });

        res.redirect(`/posts/${postId}`);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error adding comment");
    }
};

module.exports = { addComment };
