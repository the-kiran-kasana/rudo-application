const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firebaseUID: {type: String, required: true, unique: true,index: true,},
  email: {type: String, required: true,index: true,},
  name: { type: String, trim: true,},
}, { timestamps: true });


const userModel =  mongoose.model("User" ,userSchema);
module.exports = userModel;