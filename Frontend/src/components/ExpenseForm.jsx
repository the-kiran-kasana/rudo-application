import { useState,useEffect } from "react";
import axios from "axios";
import { Users, Plus, HandCoins } from "lucide-react";
import { jwtDecode } from "jwt-decode";

export default function ExpenseForm({ showExpenseForm, setShowExpenseForm, group }) {
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_URL;


    const decoded = jwtDecode(token);
    console.log("user email is", decoded.email);



  console.log("aga,b bagdam",group)

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(decoded.email);
  const [splitType, setSplitType] = useState("EQUAL");

    if (!group?._id) {
      return <p>Loading group...</p>;
    }


  const [participants, setParticipants] = useState([]);




  useEffect(() => {
    if (group?.members?.length) {
      setParticipants(group.members.map(m => m.email));
      setPaidBy(group.members[0]?.email); // default paidBy
    }
  }, [group]);


  if (!showExpenseForm) return null;

  // ✅ toggle participants
  const toggleParticipant = (email) => {
    setParticipants((prev) =>
      prev.includes(email)
        ? prev.filter((e) => e !== email)
        : [...prev, email]
    );
  };

 const buildSplits = () => {
   if (!amount || participants.length === 0) return [];

   const perPerson = Number(amount) / participants.length;

   return participants.map((email) => ({
     uid: email,
     amount: Number(perPerson.toFixed(2)),
   }));
 };


  const saveExpense = async () => {
    if (!description || !amount || !paidBy || participants.length === 0) {
      alert("Please fill all required fields");
      return;
    }



    const payload = {
      description,
      amount: Number(amount),
      groupId: group._id,
      paidBy,
      participants,
      splitType,
      splits: buildSplits(),
      createdBy: paidBy,
    };

    console.log("SENDING PAYLOAD", payload);

    try {
      await axios.post(`https://rudo-application.onrender.com/api/expenses/addExpense`, payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setShowExpenseForm(false);
    } catch (err) {
      console.error("API ERROR:", err.response?.data || err.message);
      alert("Failed to add expense");
    }
  };


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-4">
       <h2 className="text-xl text-blue-700 text-center font-semibold">Add An Expense</h2>
       <hr className="text-blue-700"/>
       <h3 className="text font-semibold">Group is : {group.name?.split("@")[0].replace(".", " ").replace(/\b\w/g, char => char.toUpperCase())}</h3>



        <input  placeholder="Enter a description"  value={description}  onChange={(e) => setDescription(e.target.value)}  className="w-full border px-3 py-2 rounded"/>
        <input type="number" placeholder="$0.00" value={amount} onChange={(e) => setAmount(e.target.value)}className="w-full border px-3 py-2 rounded"/>

        <spam>Paid by : </spam>
        <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)} className="w-full border px-3 py-2 rounded">
          {group.members.map((m) => (
            <option key={m.email} value={m.email}>  {m.email}</option>
          ))}
        </select>

        <div>
          <p className="text-sm font-medium mb-1">Split between</p>
            {group.members.map((m) => (
             <label key={m.email} className="flex gap-2 text-sm">
               <input  type="checkbox" checked={participants.includes(m.email)} onChange={() => toggleParticipant(m.email)}/> {m.email}
             </label>
         ))}
        </div>

        Split Type
        <select
          value={splitType}
          onChange={(e) => setSplitType(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="EQUAL">Split equally</option>
          <option value="EXACT">Split exact</option>
          <option value="PERCENT">Split percent</option>
        </select>

        <p className="text-sm text-gray-500">
          (${participants.length ? (amount / participants.length).toFixed(2) : 0}
          /person)
        </p>


        <div className="flex justify-end gap-3 pt-2">
          <button onClick={() => setShowExpense(false)} className="px-4 py-2 bg-gray-200 rounded"> Cancel </button>
          <button onClick={saveExpense} className="px-4 py-2 bg-green-600 text-white rounded"> Save </button>
        </div>

      </div>
    </div>
  );
}



