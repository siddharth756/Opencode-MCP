let users = [];
let nextId = 1;

function create(req, res) {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'name and email required' });
  const user = { id: nextId++, name, email };
  users.push(user);
  res.status(201).json(user);
}

function list(req, res) {
  res.json(users);
}

function getById(req, res) {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'user not found' });
  res.json(user);
}

function update(req, res) {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'user not found' });
  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  res.json(user);
}

function remove(req, res) {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'user not found' });
  users.splice(index, 1);
  res.status(204).send();
}

module.exports = { create, list, getById, update, remove };
