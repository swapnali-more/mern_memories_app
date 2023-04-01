// Import necessary modules
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserMessage from '../models/UserMessage.js';

// Set JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// Login user controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if the user exists in the database
    const existingUser = await UserMessage.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the entered password matches the hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create a JWT token with user's email and ID
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send a response with the user object and token
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

// Create user controller
export const createUser = async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  try {
    // Check if all fields are provided
    if (!email || !password || !firstname || !lastname) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists in the database
    const existingUser = await UserMessage.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password before storing it in the database
    const hashPassword = await bcrypt.hash(password, 12);

    // Create a new user object
    const result = await UserMessage.create({
      email,
      password: hashPassword,
      name: `${firstname} ${lastname}`,
    });

    // Create a JWT token with user's email and ID
    const token = jwt.sign({ email: result.email, id: result._id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send a response with the created user object and token
    res.status(201).json({ result, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong!' });
  }
};