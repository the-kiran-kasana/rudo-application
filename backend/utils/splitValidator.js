const validateSplits = ({ amount, splitType, participants, splits }) => {
  if (!participants || participants.length === 0) {
    throw new Error("Participants are required");
  }

  if (splitType === "EQUAL") {
    const perPerson = +(amount / participants.length).toFixed(2);
    return participants.map(uid => ({uid, amount: perPerson,}));
  }

  if (splitType === "EXACT") {
    const total = splits.reduce((sum, s) => sum + s.amount, 0);

    if (total !== amount) {
      throw new Error("Exact splits do not sum to total amount");
    }

    return splits;
  }

  if (splitType === "PERCENT") {
    const totalPercent = splits.reduce((sum, s) => sum + s.amount, 0);

    if (totalPercent !== 100) {
      throw new Error("Percent splits must sum to 100");
    }

    return splits.map(s => ({
      uid: s.uid,
      amount: +(amount * (s.amount / 100)).toFixed(2),
    }));
  }

  throw new Error("Invalid split type");
};

module.exports = validateSplits;
