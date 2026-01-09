export default function SimplifiedDebts({ debts, applyAll }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mt-4">
      <h2 className="text-lg font-semibold mb-3">
        Simplified Payments
      </h2>

      {debts.map((d, i) => (
        <p key={i} className="text-sm">
          {d.fromName} pays{" "}
          <span className="font-medium">{d.toName}</span>{" "}
          ₹{d.amount}
        </p>
      ))}

      {debts.length > 0 && (
        <button
          onClick={applyAll}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded"
        >
          Settle All
        </button>
      )}
    </div>
  );
}
