"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logFilePath = path_1.default.join(__dirname, '../../app.log');
const isProd = process.env.NODE_ENV === 'production';
function logMessage(level, message, args) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} [${level}] ${message} ${args ? JSON.stringify(args) : ''}`;
    if (!isProd) {
        fs_1.default.appendFile(logFilePath, logEntry + '\n', (err) => {
            if (err)
                console.error('Error writing to log file:', err);
        });
    }
    else {
        console.log(logEntry);
    }
}
exports.default = {
    info: (message, ...args) => logMessage('INFO', message, args),
    error: (message, ...args) => logMessage('ERROR', message, args),
    warn: (message, ...args) => logMessage('WARN', message, args),
    debug: (message, ...args) => {
        if (!isProd)
            logMessage('DEBUG', message, args);
    },
};
