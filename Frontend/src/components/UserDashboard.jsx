import { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import GroupSection from "../components/GroupSection";
import GroupDetails from "../components/GroupDetails";
import FriendDetails from "../components/FriendDetails";
import { Users, Plus, HandCoins } from "lucide-react"

export default function UserDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [showExpense, setShowExpense] = useState(false);



  return (
    <main className="flex-1 bg-white p-6">

      <div className="flex justify-between gap-30 items-center border-b pb-4">

        <div className="flex items-center ">
          <div>
            <h1 className="font-semibold">Dashboard</h1>
            <p className="text-sm text-gray-500"> Select a group or friend </p>
          </div>
        </div>

        <div className="flex gap-3">
           <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg"> <Plus size={16} /> Add expense </button>
           <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg"> <HandCoins size={16} /> Settle up</button>
           <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"> + Create Group </button>
        </div>
      </div>

      <GroupSection showForm={showForm} setShowForm={setShowForm} />


    </main>
  );
}
