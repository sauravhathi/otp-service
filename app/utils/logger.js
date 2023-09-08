const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../../app.log');

function logMessage(level, message) {
  const logEntry = `${new Date().toISOString()} [${level}] ${message}\n`;

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
}

module.exports = {
  info: (message) => logMessage('INFO', message),
  error: (message) => logMessage('ERROR', message),
};