const mongoose = require("mongoose")



const splitSchema = new mongoose.Schema({

    uid: { type: String, required: true,},
    amount: { type: Number, required: true, min: 0,},
  },
  { _id: false }
);

const expenseSchema = new mongoose.Schema({

      description: {type: String, required: true,  trim: true, },
      amount: {type: Number, required: true,min: 0,},
      groupId: { type: mongoose.Schema.Types.ObjectId,ref: "Group", default: null, },

      paidBy: { type: String,  required: true,},

      participants: { type: [String], required: true, },

      splitType: { type: String, enum: ["EQUAL", "EXACT", "PERCENT"], required: true,},

      splits: { type: [splitSchema], required: true,},

      createdBy: {type: String,  required: true,},
},{ timestamps: true })

const expenseModel = mongoose.model("Expense" , expenseSchema);
module.exports = expenseModel;