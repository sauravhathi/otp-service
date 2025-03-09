"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../utils/logger"));
let existingConnection = null;
const connectDB = async () => {
    try {
        if (!existingConnection) {
            existingConnection = await mongoose_1.default.connect(process.env.MONGODB_URI);
            logger_1.default.info('🚀 Connected to MongoDB');
        }
        logger_1.default.info('🚀 Reusing existing MongoDB connection');
        return existingConnection;
    }
    catch (error) {
        logger_1.default.error('Failed to connect to MongoDB', error.message);
        process.exit(1);
    }
};
exports.default = connectDB;
