// import { useState } from "react";
// import axios from "axios";
//
// export default function ExpenseForm({ showExpense, setShowExpense, group }) {
//   const userEmail = localStorage.getItem("email"); // store after login
//   const token = localStorage.getItem("token");
//
//   const [description, setDescription] = useState("");
//   const [amount, setAmount] = useState("");
//   const [paidBy, setPaidBy] = useState(userEmail);
//   const [splitType, setSplitType] = useState("EQUAL");
//   const [participants, setParticipants] = useState(
//     group.members.map((m) => m.email)
//   );
//
//   if (!showExpense) return null;
//
//   // ✅ toggle participants
//   const toggleParticipant = (email) => {
//     setParticipants((prev) =>
//       prev.includes(email)
//         ? prev.filter((e) => e !== email)
//         : [...prev, email]
//     );
//   };
//
//   // ✅ build splits automatically (EQUAL)
//   const buildSplits = () => {
//     const perPerson = amount / participants.length;
//     return participants.map((email) => ({
//       uid: email,
//       amount: Number(perPerson.toFixed(2)),
//     }));
//   };
//
//   const saveExpense = async () => {
//     try {
//       const payload = {
//         description,
//         amount: Number(amount),
//         groupId: group._id,
//         paidBy,
//         participants,
//         splitType,
//         splits: buildSplits(),
//         createdBy: paidBy,
//       };
//
//       await axios.post("http://localhost:8000/expense/add", payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//
//       setShowExpense(false);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add expense");
//     }
//   };
//
//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//       <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-4">
//         <h2 className="text-xl font-semibold">Add an expense</h2>
//
//         {/* Description */}
//         <input
//           placeholder="Enter a description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full border px-3 py-2 rounded"
//         />
//
//         {/* Amount */}
//         <input
//           type="number"
//           placeholder="$0.00"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="w-full border px-3 py-2 rounded"
//         />
//
//         {/* Paid by */}
//         <select
//           value={paidBy}
//           onChange={(e) => setPaidBy(e.target.value)}
//           className="w-full border px-3 py-2 rounded"
//         >
//           {group.members.map((m) => (
//             <option key={m.email} value={m.email}>
//               Paid by {m.email}
//             </option>
//           ))}
//         </select>
//
//         {/* Participants */}
//         <div>
//           <p className="text-sm font-medium mb-1">Split between</p>
//           {group.members.map((m) => (
//             <label key={m.email} className="flex gap-2 text-sm">
//               <input
//                 type="checkbox"
//                 checked={participants.includes(m.email)}
//                 onChange={() => toggleParticipant(m.email)}
//               />
//               {m.email}
//             </label>
//           ))}
//         </div>
//
//         {/* Split Type */}
//         <select
//           value={splitType}
//           onChange={(e) => setSplitType(e.target.value)}
//           className="w-full border px-3 py-2 rounded"
//         >
//           <option value="EQUAL">Split equally</option>
//           <option value="EXACT">Split exact</option>
//           <option value="PERCENT">Split percent</option>
//         </select>
//
//         <p className="text-sm text-gray-500">
//           (${participants.length ? (amount / participants.length).toFixed(2) : 0}
//           /person)
//         </p>
//
//         {/* Actions */}
//         <div className="flex justify-end gap-3 pt-2">
//           <button
//             onClick={() => setShowExpense(false)}
//             className="px-4 py-2 bg-gray-200 rounded"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={saveExpense}
//             className="px-4 py-2 bg-green-600 text-white rounded"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


export default function ExpenseList({ showExpense , setShowExpense }) {

return (
          <div className="flex justify-between items-center border-b py-3">

          </div>
  )
}
