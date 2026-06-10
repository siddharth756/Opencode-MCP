const jwt = require('jsonwebtoken');
const AuthUser = require('../models/AuthUser');
const { jwtSecret, jwtExpiresIn } = require('../config/env');

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
    expiresIn: jwtExpiresIn,
  });
}

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email, and password are required' });
    }

    const user = await AuthUser.create({ name, email, password });
    if (!user) {
      return res.status(409).json({ error: 'A user with this email already exists' });
    }

    const token = signToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const user = await AuthUser.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await AuthUser.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = signToken(user);
    res.json({ user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt }, token });
  } catch (err) {
    next(err);
  }
}

async function getMe(req, res, next) {
  try {
    const user = await AuthUser.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, getMe };
