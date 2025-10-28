// backend/src/utils/generateToken.js
import jwt from 'jsonwebtoken';

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role }, 
    "YOUR_VERY_STRONG_SECRET_KEY_HERE",
    { expiresIn: process.env.JWT_ACCESS_TOKEN_EXP || '1h' } 
  );
};
export default generateToken;