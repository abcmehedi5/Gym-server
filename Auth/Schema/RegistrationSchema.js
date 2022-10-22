const mongoose = require('mongoose');

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};
const registrationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 30
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email Address is required',
        validate: [validateEmail, "Please fill a valid email address"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    phone: {
        type: Number,
        required: 'Phone Number is required',
        maxLength: [11, 'Invalid phone number'],
        minLength: [11, 'Invalid phone number']
    },
    password: {
        type: String,
        required: 'Password  is required',
    },
    create: {
        type: Date,
        required: 'Phone Number is required',
    },
    img: {
        type: String,
        require: true
    }
})


module.exports = registrationSchema