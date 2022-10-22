const mongoose = require("mongoose");
const adminListSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 30,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email Address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
});

module.exports = adminListSchema;
