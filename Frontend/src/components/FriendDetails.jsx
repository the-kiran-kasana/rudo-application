import { useEffect, useState } from "react";
import axios from "axios";
import {UserRound, Users,Handshake, Plus, HandCoins} from "lucide-react"


export default function FriendDetails({ friend }) {


  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState(0);
    const API = import.meta.env.VITE_API_URL;

  console.log(friend);

  useEffect(() => {
    fetchFriendExpenses();
  }, [friend]);

  const fetchFriendExpenses = async (friend) => {
    const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/group/friend/expenses?email=${friend}`,{
          headers: { Authorization: `Bearer ${token}`,},
        });
     console.log(res.data)
    setExpenses(res.data.expenses);
    setBalance(res.data.balance);
  };

  return (
    <main className="flex-1 p-6 bg-white">

      {/* HEADER */}
      <div className="flex justify-between items-center gap-30 border-b pb-4">
        <div>
         <h2 className="text-xl flex gap-3 flex items-center font-semibold"><UserRound size={23} className="bg-gray-400 rounded-full"/>{friend?.split("@")[0].replace(".", " ").replace(/\b\w/g, char => char.toUpperCase())} </h2>
          <p className="text-sm text-gray-500">{friend}</p>

          {balance > 0 && ( <p className="text-green-600 mt-1"> owes you ₹{balance} </p>)}
          {balance < 0 && ( <p className="text-red-600 mt-1"> you owe ₹{Math.abs(balance)} </p>)}
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


      {/* EXPENSES */}
{/*       <div className="mt-6 space-y-4"> */}
{/*         {expenses.map(exp => ( */}
{/*           <div key={exp._id} className="border-b pb-3"> */}
{/*             <p className="font-medium">{exp.description}</p> */}
{/*             <p className="text-sm text-gray-500"> */}
{/*               ₹{exp.amount} */}
{/*             </p> */}
{/*           </div> */}
{/*         ))} */}
{/*       </div> */}
    </main>
  );
}
