import { useEffect, useState } from "react";
import axios from "axios";
import ExpenseList from "../components/ExpenseList";
import { Users, Plus, HandCoins } from "lucide-react";

export default function GroupDetails({ group }) {

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showExpense, setShowExpense] = useState(false);
    const API = import.meta.env.VITE_API_URL;


  const fetchGroupExpenses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get( `${API}/group/${group._id}`, {
          headers: { Authorization: `Bearer ${token}`, },
        } );

      setExpenses(res.data.expenses || []);
    } catch (err) {
      console.error("Failed to fetch group expenses", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (group?._id) {
      fetchGroupExpenses();
    }
  }, []);

  return (
    <main className="flex-1 bg-white p-6">

      <div className="flex justify-between gap-30 items-center border-b pb-4">
        <div className="flex items-center gap-3">
          <Users size={34} className="bg-gray-200 p-2 rounded-lg" />
          <div>
            <h2 className="text-2xl font-semibold capitalize"> {group?.name} </h2>
            <p className="text-sm text-gray-500 capitalize">  group for {group?.type}</p>
          </div>
        </div>


        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg">
            <Plus size={16} /> Add expense
          </button>

          <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg">
            <HandCoins size={16} /> Settle up
          </button>
        </div>
      </div>


      <div className="mt-6">
        <h3 className="font-semibold text-gray-700 mb-2">Members</h3>

        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          {group?.members.map((m, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b last:border-none pb-2"
            >
              <p className="font-medium">
                {(m.name || m.email.split("@")[0])
                  .replace(/\./g, " ")
                  .replace(/\b\w/g, c => c.toUpperCase())}
              </p>

              <p className="text-sm text-gray-600">
                Balance: ₹{m.balance}
              </p>
            </div>
          ))}
        </div>
      </div>


      <div className="mt-6">
        <h3 className="font-semibold text-gray-700 mb-2">Expenses</h3>

        {loading ? (
          <p className="text-sm text-gray-400">Loading expenses...</p>
        ) : expenses.length === 0 ? (
          <p className="text-sm text-gray-400">No expenses yet</p>
        ) : (
          expenses.map(exp => (
            <ExpenseList key={exp._id} {...exp} />
          ))
        )}
      </div>
    </main>
  );
}
