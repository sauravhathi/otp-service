const mongoose = require('mongoose');
const logger = require('../utils/logger');
const dotenv = require('dotenv');

dotenv.config();

let existingConnection;

const connectDB = async () => {
    try {
        if (!existingConnection) {
            existingConnection = await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
            logger.info('🚀 Connected to MongoDB');
        }
        return existingConnection;
    } catch (error) {
        console.error(error);
        logger.error(error);
    }
};

module.exports = connectDB;