const express = require("express");
const firebaseAuth = require("../middleware/firebaseAuth");
const Balance = require("../models/Balance");
const Settlement = require("../models/Settlement");

const router = express.Router();

/**
 * APPLY SETTLEMENT
 */
router.post("/pay", firebaseAuth, async (req, res) => {
  try {
    const { from, to, amount, groupId } = req.body;
    const { uid } = req.user;

    if (uid !== from)
      return res.status(403).json({ message: "Unauthorized payment" });

    if (amount <= 0)
      return res.status(400).json({ message: "Invalid amount" });

    // Find existing balance
    const balance = await Balance.findOne({ from, to, groupId });

    if (!balance)
      return res.status(400).json({ message: "No outstanding balance" });

    if (amount > balance.amount)
      return res.status(400).json({ message: "Overpayment not allowed" });

    // Reduce or remove balance
    if (amount === balance.amount) {
      await balance.deleteOne();
    } else {
      balance.amount -= amount;
      await balance.save();
    }

    // Save settlement history
    await Settlement.create({
      from,
      to,
      amount,
      groupId,
      settledBy: uid,
    });

    res.json({ message: "Payment settled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Settlement failed" });
  }
});



router.post("/bulk-pay", firebaseAuth, async (req, res) => {
  try {
    const { settlements, groupId } = req.body;
    const { uid } = req.user;

    for (const s of settlements) {
      if (s.from !== uid) continue;

      const balance = await Balance.findOne({
        from: s.from,
        to: s.to,
        groupId,
      });

      if (!balance) continue;

      const pay = Math.min(balance.amount, s.amount);

      if (pay === balance.amount) {
        await balance.deleteOne();
      } else {
        balance.amount -= pay;
        await balance.save();
      }

      await Settlement.create({
        from: s.from,
        to: s.to,
        amount: pay,
        groupId,
        settledBy: uid,
      });
    }

    res.json({ message: "Bulk settlements completed" });
  } catch (err) {
    res.status(500).json({ message: "Bulk settlement failed" });
  }
});



router.get("/history", firebaseAuth, async (req, res) => {
  try {
    const { uid } = req.user;
    const { groupId } = req.query;

    const history = await Settlement.find({
      $or: [{ from: uid }, { to: uid }],
      ...(groupId && { groupId }),
    }).sort({ createdAt: -1 });

    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch history" });
  }
});


module.exports = router;
