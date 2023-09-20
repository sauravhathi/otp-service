const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./db/config');
const { isValidEmail } = require('./utils/validator');
const otpRoutes = require('./routes/otpRoutes');
const logger = require('./utils/logger');
require('./controllers/schedulerController');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const middleware = (req, res, next) => {
  const { email } = req.body;
  if (!isValidEmail(email)) {
    logger.error('Invalid email');
    return res.status(400).json({ error: 'Invalid email' });
  }
  next();
};

connectDB();

app.use('/api', middleware, otpRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});