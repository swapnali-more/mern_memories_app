import express from "express";
import { fetchPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Endpoint for fetching all posts
router.get("/", fetchPosts);

// Endpoint for creating a new post
router.post("/", auth, createPost);

// Endpoint for updating an existing post
router.patch("/:id", auth, updatePost);

// Endpoint for deleting a post
router.delete("/:id", auth, deletePost);

// Endpoint for incrementing the like count of a post
router.patch("/:id/likePost", auth, likePost);

export default router;
