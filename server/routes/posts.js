import express from "express";
import { fetchPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";

const router = express.Router();

// Endpoint for fetching all posts
router.get("/", fetchPosts);

// Endpoint for creating a new post
router.post("/", createPost);

// Endpoint for updating an existing post
router.patch("/:id", updatePost);

// Endpoint for deleting a post
router.delete("/:id", deletePost);

// Endpoint for incrementing the like count of a post
router.patch("/:id/likePost", likePost);

export default router;
