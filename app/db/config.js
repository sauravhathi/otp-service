const mongoose = require('mongoose');
const logger = require('../utils/logger');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        logger.info('🚀 Connected to MongoDB');
    } catch (error) {
        console.error(error);
        logger.error(error);
    }
};

module.exports = connectDB;