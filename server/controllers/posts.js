import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"

// Fetch all posts
export const fetchPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// Create a new post
export const createPost = async (req, res) => {
    try {
        const post = req.body;
        const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Invalid data sent in request" });
    }
}

// Update an existing post
export const updatePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send(`Invalid post id: ${id}`);
    }

    try {
        const post = req.body;
        const newPost = { ...post, _id: id };
        const updatedPost = await PostMessage.findByIdAndUpdate(id, newPost, { new: true });

        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// Delete an existing post
export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send(`Invalid post id: ${id}`);
    }

    try {
        await PostMessage.findByIdAndRemove(id);
        res.status(200).json({ message: "Post deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// Like or dislike an existing post
export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: 'Unauthenticated' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send(`Invalid post id: ${id}`);
    }

    try {
        const post = await PostMessage.findById(id);

        const index = post.likes.findIndex((id) => id === String(req.userId));

        if (index === -1) {
            // Like the post
            post.likes.push(req.userId);
        } else {
            // Dislike the post
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(id, { $set: { likes: post.likes } }, { new: true });

        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
