const mongoose = require("mongoose");

const settlementSchema = new mongoose.Schema(
  {
    from: { type: String, required: true }, // uid
    to: { type: String, required: true },
    amount: { type: Number, required: true },
    groupId: { type: String },
    settledBy: { type: String, required: true }, // who paid
  },
  { timestamps: true }
);



const settlementModel = mongoose.model("Settlement", settlementSchema);
module.exports = settlementModel;
