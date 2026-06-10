const express = require('express');
const cors = require('cors');
const { port } = require('./src/config/env');
const { errorHandler } = require('./src/middleware/error.middleware');
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/users', userRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server on http://localhost:${port}`));
