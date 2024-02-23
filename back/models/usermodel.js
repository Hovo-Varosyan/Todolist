const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: { type: String, recuired: true },
  password: { type: String, recuired: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  list: [{
    id:String,
    title:String,
    description:String,
    status:Boolean
  }],
  email: {
    type: String,
    unique: true,
  },
});
const userModel = mongoose.model("user", schema);
module.exports=userModel