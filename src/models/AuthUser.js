const bcrypt = require('bcryptjs');

const users = [];
let nextId = 1;

const SALT_ROUNDS = 10;

async function create({ name, email, password }) {
  const existing = users.find(u => u.email === email);
  if (existing) return null;

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = { id: nextId++, name, email, password: hashedPassword, createdAt: new Date() };
  users.push(user);
  return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
}

async function findByEmail(email) {
  return users.find(u => u.email === email) || null;
}

async function findById(id) {
  const user = users.find(u => u.id === id);
  if (!user) return null;
  return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
}

async function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = { create, findByEmail, findById, comparePassword };
