require('dotenv').config();
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  // Get the token from the request header
  const token = req.header('Authorization');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};


const roleMiddleware = (allowedRoles) => (req, res, next) => {
  // Check if the user's role is allowed
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied. You do not have permission to perform this action.' });
  }
  next();
};

module.exports = {authMiddleware, roleMiddleware};      