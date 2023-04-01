import express from "express";
import { loginUser, createUser } from "../controllers/users.js";

const router = express.Router();

// Endpoint for loggin as a user
router.post("/login", loginUser);

// Endpoint for creating a user
router.post("/create-user", createUser);

export default router;
