// backend/src/controllers/authController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (await User.findOne({ email })) return res.status(400).json({ message: 'User already exists' });
  
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  
  const user = await User.create({ name, email, passwordHash, role: role || 'customer' });
  
  if (user) {
    res.status(201).json({ _id: user._id, name: user.name, role: user.role, token: generateToken(user._id, user.role) });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.passwordHash))) {
    res.json({ _id: user._id, name: user.name, role: user.role, token: generateToken(user._id, user.role) });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};
export { registerUser, loginUser };