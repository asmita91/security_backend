
// const mongoose = require('mongoose');
// const userSchema = new mongoose.Schema({

//     fullName: {
//         type: String,
//         required: true,
//         minLength: [2, 'Length of full name cannot be smaller than 2']
//     },

//     role: {
//         type: String,
//         enum: ['user', 'admin'],
//         default: 'user',

//     },
//     email: {
//         type: String,
//         unique: true,
//         minLength: [6, 'Length of email cannot be smaller than 6'],
//         required: true
//     },

//     password: {
//         type: String,
//         minLength: [8, 'Length of password cannot be smaller than 8'],
//         required: true
//     },
//     picture: {
//         type: String,
//         default: 'defaultImage.jpg'

//     },
//     passwordLastChanged: {
//         type: Date,
//         default: Date.now,
//     },
//     lockUntil: Date ,


//     passwordHistory: [],

//     // Note: STATUS is disable when the users enter the wrong password for more than 3 times
//     //  , otherwise, it is active
//     status: {
//         type: String,
//         enum: ['active', 'disable'],
//         default: 'active'
//     },

// }, { timestamps: true });

// userSchema.set('toJSON', {
//     transform: (document, returnedDocument) => {
//         returnedDocument.id = document._id.toString();

//         delete returnedDocument._id;
//         delete returnedDocument.__v;
//         delete returnedDocument.password;
//     }
// });


// // method for returning bool to check whether password is need to be changed in every 90 days or not
// const isPasswordChangeRequired = function (lastPasswordChangedDate) {
//     const expirationDays = 90; // Change password every 90 days
//     const lastChanged = lastPasswordChangedDate;
//     console.log(`Last password changed date: ${lastChanged}`)
//     const today = new Date();
//     const expirationDate = new Date(lastChanged);
//     expirationDate.setDate(expirationDate.getDate() + expirationDays);
//     return today > expirationDate;
// };

// // password guidelines => must be 8 < x < 12, 1 upper case, 1 lowercase, 1 number , 1 special character

// const validatePassword = (password) => {
//     const isLengthValid = password.length >= 8 && password.length <= 12;
//     const isUppercaseValid = /[A-Z]/.test(password);
//     const isLowercaseValid = /[a-z]/.test(password);
//     const isNumberValid = /\d/.test(password);
//     const isSpecialCharValid = /[!@#$%^&*()_+[\]{};':"<>?~]/.test(password);

//     return isLengthValid && isUppercaseValid && isLowercaseValid && isNumberValid && isSpecialCharValid ? true : false;
// };


// userSchema.methods.getResetPasswordToken = function () {
//     const resetToken = crypto.randomBytes(20).toString("hex");
  
//     console.log(resetToken);
  
//     this.resetPasswordToken = crypto
//       .createHash("sha256")
//       .update(resetToken)
//       .digest("hex");
  
//     console.log(this.resetPasswordToken);
//     this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  
//     return resetToken;
//   };

// const User = new mongoose.model('User', userSchema);

// module.exports = { User, userSchema, isPasswordChangeRequired, validatePassword };




const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minLength: [2, 'Length of full name cannot be smaller than 2']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    email: {
        type: String,
        unique: true,
        minLength: [6, 'Length of email cannot be smaller than 6'],
        required: true
    },
    password: {
        type: String,
        minLength: [8, 'Length of password cannot be smaller than 8'],
        required: true
    },
    picture: {
        type: String,
        default: 'defaultImage.jpg'
    },
    passwordLastChanged: {
        type: Date,
        default: Date.now,
    },
    lockUntil: {
        type: Date
    },
    failedAttempts: {
        type: Number,
        default: 0
    },
        passwordHistory: [],
        cart: [
            {
              productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Poduct' }, // Referencing the Product model
              quantity: { type: Number, default: 1 },
            },
          ],
    status: {
        type: String,
        enum: ['active', 'disable'],
        default: 'active'
    },
}, { timestamps: true });

userSchema.set('toJSON', {
    transform: (document, returnedDocument) => {
        returnedDocument.id = document._id.toString();
        delete returnedDocument._id;
        delete returnedDocument.__v;
        delete returnedDocument.password;
    }
});

const isPasswordChangeRequired = function (lastPasswordChangedDate) {
    const expirationDays = 90; 
    const lastChanged = lastPasswordChangedDate;
    console.log(`Last password changed date: ${lastChanged}`)
    const today = new Date();
    const expirationDate = new Date(lastChanged);
    expirationDate.setDate(expirationDate.getDate() + expirationDays);
    return today > expirationDate;
};


const validatePassword = (password) => {
    const isLengthValid = password.length >= 8;
    const isUppercaseValid = /[A-Z]/.test(password);
    const isLowercaseValid = /[a-z]/.test(password);
    const isNumberValid = /\d/.test(password);
    const isSpecialCharValid = /[!@#$%^&*()_+[\]{};':"<>?~]/.test(password);

    return isLengthValid && isUppercaseValid && isLowercaseValid && isNumberValid && isSpecialCharValid ? true : false;
};
const User = mongoose.model('User', userSchema);

module.exports = { User, userSchema, isPasswordChangeRequired, validatePassword };
