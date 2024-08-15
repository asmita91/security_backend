

// middlewares/logRequest.js
const logger = require('../utility/logger');
const Log = require('../models/log');

const logRequest = async (req, res, next) => {
    if (req.user) {
        try {
            // Log to the database using Mongoose
            const logEntry = new Log({
                username: req.user.email,
                url: req.originalUrl,
                method: req.method,
                role: req.user.role,
                time: new Date()
            });
            await logEntry.save();

            // Log to Winston (console, file, etc.)
            logger.info(`User: ${req.user.email}, Role: ${req.user.role}, URL: ${req.originalUrl}, Method: ${req.method}`);
        } catch (error) {
            logger.error(`Logging error: ${error.message}`); // Log errors to Winston
        }
    }
    next();
};

module.exports = logRequest;
