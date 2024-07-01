const mongoose = require('mongoose');


const passwordHistorySchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    oldPassword: {
        type: String,
        required: true
    }
});

passwordHistorySchema.set('toJSON', {
    transform: (document, returnedDocument) => {
        returnedDocument.id = document._id.toString();

        delete returnedDocument._id;
        delete returnedDocument.__v;
    }
});
const PasswordHistory = mongoose.model('PasswordHistory', passwordHistorySchema);
module.exports = PasswordHistory;
