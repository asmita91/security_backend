// const Log = require('../models/log'); // Import the Log model

// const logRequest = async (req, res, next) => {
//     if (req.user) { // Ensure req.user is populated by verifyUser middleware
//         try {
//             const newLog = new Log({
//                 username: req.user.email,  // Logging the user's email
//                 url: req.originalUrl,      // Logging the accessed URL
//                 method: req.method,        // Logging the HTTP method
//                 role: req.user.role,       // Logging the user's role
//                 status: req.user.status || 'unknown', // Log user status if available
//             });

//             await newLog.save(); // Save the log entry to the database
//             console.log(`Logged activity for user: ${req.user.email}`);
//         } catch (error) {
//             console.error('Error logging request:', error);
//         }
//     }

//     next(); // Pass the request to the next middleware/handler
// };


// module.exports = logRequest;





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
                status: 'unknown',
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
