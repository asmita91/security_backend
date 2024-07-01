const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userPicture: {
        type: String,
        required: true,
    },
    items: [
        {
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },

        }
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    payment: {
        type: String,
        default: 'pending',
    },
    purchaseDate: {
        type: String,
        required: true,
    }
}, { timestamps: true });

purchaseSchema.set('toJSON', {
    transform: (document, returnedDocument) => {
        returnedDocument.id = document._id.toString();

        delete returnedDocument._id;
        delete returnedDocument.__v;
    }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);
module.exports = Purchase;