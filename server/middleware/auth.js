import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

const auth = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      // If no token found, return a 401 Unauthorized error
      return res.status(401).json({ message: 'No authentication token found' });
    }

    // Verify the token using the JWT_SECRET and extract the userId from it
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.userId = decodedToken?.id ?? decodedToken?.sub;

    // Call the next middleware function in the pipeline
    next();
  } catch (error) {
    // If there's an error, return a 401 Unauthorized error
    //console.error(error);
    return res.status(401).json({ message: 'Invalid authentication token' });
  }
};

export default auth;
