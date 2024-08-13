// const mongoose = require('mongoose');

// const logSchema = new mongoose.Schema({
//     time: { type: Date, default: Date.now },
//     username: { type: String, required: true },
//     url: { type: String, required: true },
//     method: { type: String, required: true },
//     role: { type: String, required: true },
//     status: { type: String, required: true },
// }, { timestamps: true });

// const Log = mongoose.model('Log', logSchema);

// module.exports = Log;



const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    username: String,
    url: String,
    method: String,
    role: String,
    status: String,
    time: Date
}, { timestamps: true });

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
