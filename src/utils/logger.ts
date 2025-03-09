import fs from 'fs';
import path from 'path';

const logFilePath = path.join(__dirname, '../../app.log');
const isProd = process.env.NODE_ENV === 'production';

function logMessage(level: string, message: string, args?: any[]) {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} [${level}] ${message} ${args ? JSON.stringify(args) : ''}`;

  if (!isProd) {
    fs.appendFile(logFilePath, logEntry + '\n', (err) => {
      if (err) console.error('Error writing to log file:', err);
    });
  } else {
    console.log(logEntry);
  }
}

export default {
  info: (message: string, ...args: any[]) => logMessage('INFO', message, args),
  error: (message: string, ...args: any[]) => logMessage('ERROR', message, args),
  warn: (message: string, ...args: any[]) => logMessage('WARN', message, args),
  debug: (message: string, ...args: any[]) => {
    if (!isProd) logMessage('DEBUG', message, args);
  },
};