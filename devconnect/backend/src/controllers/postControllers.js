const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const getAllPosts = async (req,res) => {
    try {
        const posts = await Post.find().populate("author", "name");
        res.render("pages/dashboard", { posts });
    } catch (err) {
        console.log(err);
        res.send("Error loading dashboard");
    }
};

const getPostById = async (req,res) =>{
    try {
        const id = req.params.id;
        const post = await Post.findById(id).populate("author", "name");
        if (!post) {
            return res.status(404).send("Post not found");
        }
        
        const comments = await Comment.find({ post: id }).populate("author", "name").sort({ createdAt: -1 });
        res.render("pages/post", { post, comments });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error loading post");
    }
}

const createPost = async(req,res)=>{
    const { title, content } = req.body;
    await Post.create({title, content, author: req.user.userId});
    res.redirect('/dashboard');
}

const getEditPostRender = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send("Post not found");
        
        // Ensure only author can edit
        if (post.author.toString() !== req.user.userId) {
            return res.status(403).send("Unauthorized");
        }
        
        res.render("pages/editPost", { post });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error loading edit page");
    }
}

const updatePost = async (req,res) =>{
    try {
        const { title, content } = req.body;
        const post = await Post.findById(req.params.id);
        
        if (!post) return res.status(404).send("Post not found");
        if (post.author.toString() !== req.user.userId) return res.status(403).send("Unauthorized");
        
        post.title = title;
        post.content = content;
        await post.save();
        
        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating post");
    }
}

const deletePost = async (req,res) =>{
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        
        if (post.author.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        
        await Post.findByIdAndDelete(req.params.id);
        // Also delete associated comments
        await Comment.deleteMany({ post: req.params.id });
        
        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting post");
    }
}

const getUserPosts = (req,res)=>{
    const id = req.params.id; 
    res.send(`Posts of user ${id}`);
}

const createPostRender = (req,res)=>{
    res.render("pages/createPost");
}

module.exports = {getUserPosts,createPost,getPostById,getAllPosts,deletePost,updatePost,createPostRender,getEditPostRender}