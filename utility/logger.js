// logger.js
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

// Custom log format
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),  // Logs to the console
    new transports.File({ filename: 'logs/combined.log' }),  // Logs all messages to a file
    new transports.File({ filename: 'logs/error.log', level: 'error' })  // Logs only errors to a separate file
  ]
});

module.exports = logger;
