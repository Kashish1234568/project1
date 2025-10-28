// backend/src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// 1. JWT Verification
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log(token)
      const decoded = jwt.verify(token, "YOUR_VERY_STRONG_SECRET_KEY_HERE");
      
      req.user = await User.findById(decoded.id).select('-passwordHash');
      next();
    } catch (error) {
      console.log(error)
      res.status(401).json({ message: 'Not authorized, token failed.' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token.' });
  }
};

// 2. Role Check (RBAC)
const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Forbidden. Role (${req.user.role}) is not authorized.` 
      });
    }
    next();
  };
};
export { protect, restrictTo };