const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(cors());
app.use(express.json());

const {isValidEmail} = require('./app/utils/validator');
const otpRoutes = require('./app/routes/otpRoutes');
const schedulerController = require('./app/controllers/schedulerController'); 

const middleware = (req, res, next) => {
    const { email } = req.body;
    if (!isValidEmail(email)) {
        console.log('middleware');
        return res.status(400).json({ error: 'Invalid email' });
    }
    next();
};

app.use('/api', middleware, otpRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
