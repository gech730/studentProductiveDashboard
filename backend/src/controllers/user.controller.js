import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(str) {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '').trim();
}

const register = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    name = sanitize(name);
    email = sanitize(email);

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (name.length < 2 || name.length > 50) {
      return res.status(400).json({ message: 'Name must be 2-50 characters' });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashed });

    res.status(201).json({
      message: 'Registration successful. Please login.',
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = sanitize(email);

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const updates = {};
    let { name, email, password, avatar } = req.body;

    if (name !== undefined) {
      name = sanitize(name);
      if (!name || name.length < 2 || name.length > 50) {
        return res.status(400).json({ message: 'Name must be 2-50 characters' });
      }
      updates.name = name;
    }

    if (email !== undefined) {
      email = sanitize(email);
      if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      const existing = await User.findOne({ email, _id: { $ne: req.user.id } });
      if (existing) {
        return res.status(409).json({ message: 'Email already in use' });
      }
      updates.email = email;
    }

    if (password !== undefined) {
      if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters' });
      }
      updates.password = await bcrypt.hash(password, 12);
    }

    if (avatar !== undefined) {
      if (avatar && avatar.length > 5 * 1024 * 1024) {
        return res.status(400).json({ message: 'Image too large (max 5MB)' });
      }
      updates.avatar = avatar || '';
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No data provided for update' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { register, login, getProfile, updateProfile };
