const Balance = require("../models/Balance");

const updateBalancesAfterExpense = async ({
  groupId = null,
  paidBy,
  splits,
}) => {
  for (const split of splits) {
    const { uid, amount } = split;

    // Skip payer
    if (uid === paidBy) continue;

    const from = uid;     // debtor
    const to = paidBy;    // creditor

    // Check if reverse balance exists
    const reverseBalance = await Balance.findOne({
      groupId,
      from: to,
      to: from,
    });

    if (reverseBalance) {
      if (reverseBalance.amount > amount) {
        reverseBalance.amount -= amount;
        await reverseBalance.save();
      } else if (reverseBalance.amount < amount) {
        await reverseBalance.deleteOne();
        await Balance.create({
          groupId,
          from,
          to,
          amount: amount - reverseBalance.amount,
        });
      } else {
        await reverseBalance.deleteOne();
      }
    } else {
      const balance = await Balance.findOne({ groupId, from, to });

      if (balance) {
        balance.amount += amount;
        await balance.save();
      } else {
        await Balance.create({
          groupId,
          from,
          to,
          amount,
        });
      }
    }
  }
};

module.exports = updateBalancesAfterExpense;
