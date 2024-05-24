const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    match:/^[a-zA-Z\s]+$/
  },
  password: {
    type: String,
    recuired: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  list: [{
    id: String,
    title: String,
    description: String,
    status: Boolean,
    date:String
  }],
  email: {
    type: String,
    unique: true,
    trim: true
  },
});

const userModel = mongoose.model("user", schema);
module.exports = userModel