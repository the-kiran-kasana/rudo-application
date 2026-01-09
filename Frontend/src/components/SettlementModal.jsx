import { useState } from "react";
import api from "../api/axiosInstance";

export default function SettlementModal({ balance, onClose, refresh }) {
  const [amount, setAmount] = useState(balance.amount);
  const [loading, setLoading] = useState(false);
    const API = import.meta.env.VITE_API_URL;

  const payNow = async () => {
    setLoading(true);
    await api.post("/settlements/pay", {
      from: balance.from,
      to: balance.to,
      amount,
      groupId: balance.groupId,
    });
    setLoading(false);
    refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-80">
        <h3 className="font-semibold mb-2">
          Pay {balance.toName}
        </h3>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={payNow}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}
