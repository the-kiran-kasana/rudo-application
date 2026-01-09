const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    uid: { type: String, default: null },
    email: { type: String, required: true },
    name: { type: String },
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },
    balance: { type: Number, default: 0 },
  },
  { _id: false }
);


const groupSchema = new mongoose.Schema(
  {
    name: { type: String,required: true, trim: true, },
    type: {type: String,enum: ["trip", "home", "couple"], required: true,},
    createdBy: { type: String,  required: true,},
    members: { type: [memberSchema], required: true,},
  },
  { timestamps: true }
);




const groupModel = mongoose.model("Group", groupSchema);
module.exports = groupModel;
