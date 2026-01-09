const express = require("express");
const firebaseAuth = require("../middleware/firebaseAuth");
const simplifyDebts = require("../utils/debtSimplifier");

const router = express.Router();

/**
 * SIMPLIFY DEBTS
 * groupId optional
 */
router.get("/simplify", firebaseAuth, async (req, res) => {
  try {
    const { groupId } = req.query;

    const settlements = await simplifyDebts(groupId || null);

    res.json({
      message: "Debt simplified successfully",
      settlements,
    });
  } catch (err) {
    res.status(500).json({ message: "Debt simplification failed" });
  }
});

module.exports = router;
