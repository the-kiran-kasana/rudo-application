const express = require("express");
const Expense = require("../models/Expense");
const Group = require("../models/Group");
const firebaseAuth = require("../middleware/firebaseAuth");
const validateSplits = require("../utils/splitValidator");

const ExpenseRouter = express.Router();


ExpenseRouter.post("/addExpense", firebaseAuth, async (req, res) => {
  try {
        const { description,amount, groupId, paidBy, participants, splitType, splits = [],} = req.body;
        const { uid } = req.user;

        console.log(description,amount, groupId, paidBy, participants, splitType)


        if (groupId) {

          const group = await Group.findById(groupId);

         if (!group)  return res.status(404).json({ message: "Group not found" });

          const memberEmails = group.members.map(m => m.email);

          const invalid = participants.some(p => !memberEmails.includes(p));


          console.log("invalid email is this ", invalid);

         if (invalid)  {
           return res.status(401).json({ message: "All participants must be group members" });
         }

        }

    const finalSplits = validateSplits({ amount, splitType,participants, splits, });

    const expense = await Expense.create({
      description,
      amount,
      groupId,
      paidBy,
      participants,
      splitType,
      splits: finalSplits,
      createdBy: uid,
    });
    res.status(201).json({ message: "Expense created",expense});
  } catch (err) {
//    console.log(err.message)
    res.status(402).json({ message: "failed" });
  }
});














ExpenseRouter.get("/getGroup", firebaseAuth, async (req, res) => {
  try {
    const { groupId } = req.query;
    const uid = req.user.uid;

    const query = { participants: uid };
    if (groupId) query.groupId = groupId;

    const expenses = await Expense.find(query).sort({ createdAt: -1 });

    res.status(202).json({ mess: "print the expenses", expenses });
  } catch (err) {
    res.status(500).json({ message: "Fetch expenses failed" });
  }
});


/**
 * UPDATE EXPENSE
 */
ExpenseRouter.put("/:expenseId", firebaseAuth, async (req, res) => {
  try {
    const { expenseId } = req.params;
    const uid = req.user.uid;

    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.createdBy !== uid && expense.paidBy !== uid) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(expense, req.body);
    await expense.save();

    res.json({ message: "Expense updated", expense });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});


/**
 * DELETE EXPENSE
 */
ExpenseRouter.delete("/:expenseId", firebaseAuth, async (req, res) => {
  try {
    const { expenseId } = req.params;
    const uid = req.user.uid;

    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.createdBy !== uid && expense.paidBy !== uid) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await expense.deleteOne();
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});


module.exports = ExpenseRouter;