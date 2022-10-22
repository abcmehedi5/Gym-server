const mongoose = require('mongoose');
const addClassSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        uppercase: true,
        maxLength: 20
        
    },

    description: {
        type: String,
        required: true,

    },

    img: {
        type: String,
        require: true
    }

})

module.exports = addClassSchema;
