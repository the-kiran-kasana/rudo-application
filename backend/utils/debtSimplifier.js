const Balance = require("../models/Balance");

const simplifyDebts = async (groupId = null) => {
  const balances = await Balance.find({ groupId });

  const net = {};

  // Step 1: Calculate net balance per user
  for (const { from, to, amount } of balances) {
    net[from] = (net[from] || 0) - amount;
    net[to] = (net[to] || 0) + amount;
  }

  // Step 2: Separate creditors & debtors
  const creditors = [];
  const debtors = [];

  for (const uid in net) {
    if (net[uid] > 0) {
      creditors.push({ uid, amount: net[uid] });
    } else if (net[uid] < 0) {
      debtors.push({ uid, amount: -net[uid] });
    }
  }

  // Step 3: Match debtors with creditors
  const settlements = [];

  let i = 0,
    j = 0;

  while (i < debtors.length && j < creditors.length) {
    const payAmount = Math.min(
      debtors[i].amount,
      creditors[j].amount
    );

    settlements.push({
      from: debtors[i].uid,
      to: creditors[j].uid,
      amount: +payAmount.toFixed(2),
    });

    debtors[i].amount -= payAmount;
    creditors[j].amount -= payAmount;

    if (debtors[i].amount === 0) i++;
    if (creditors[j].amount === 0) j++;
  }

  return settlements;
};

module.exports = simplifyDebts;
