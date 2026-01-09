const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema({

    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group", default: null,},
    from: { type: String,  required: true, },
    to: {type: String, required: true, },
    amount: {type: Number, required: true,  min: 0, },
  },
  { timestamps: true }
);

balanceSchema.index({ groupId: 1, from: 1, to: 1 }, { unique: true });

const balanceModel = mongoose.model("Balance", balanceSchema);
module.exports = balanceModel;
