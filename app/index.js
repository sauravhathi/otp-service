const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/config');
const { isValidEmail } = require('./utils/validator');
const otpRoutes = require('./routes/otpRoutes');
const logger = require('./utils/logger');
const scheduledTask = require('./controllers/schedulerController');

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

app.get('/', (req, res) => {
  res.send('Welcome to OTP service');
});

app.use('/api', middleware, otpRoutes);

app.get('/api/cron', (req, res) => {
  try {
    const secret = req.query.secret;

    if (secret !== process.env.CRON_SECRET) {
      return res.status(401).end('Unauthorized');
    }

    scheduledTask.start();
    res.send({ message: 'Cron job started', status: 200 });
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});