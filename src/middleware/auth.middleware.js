const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

function protect(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Not authorized, no token provided' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Not authorized, token invalid' });
  }
}

module.exports = { protect };
