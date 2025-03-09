import mongoose from "mongoose";
import logger from "../utils/logger";

let existingConnection: typeof mongoose | null = null;

const connectDB = async () => {
    try {
        if (!existingConnection) {
            existingConnection = await mongoose.connect(process.env.MONGODB_URI as string)
            logger.info('🚀 Connected to MongoDB');
        }

        logger.info('🚀 Reusing existing MongoDB connection');
        return existingConnection;
    } catch (error: any) {
        logger.error('Failed to connect to MongoDB', error.message);
        process.exit(1);
    }
};

export default connectDB;