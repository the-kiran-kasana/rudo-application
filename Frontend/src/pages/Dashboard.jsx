import { useState } from "react";
// src/pages/Dashboard.jsx
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";
import BalancePanel from "../components/BalancePanel";
import ExpenseForm from "../components/ExpenseForm";



export default function Dashboard() {

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);



 return (
   <div className="min-h-screen bg-gray-100 flex justify-center p-8">

   <div className="min-h-screen flex bg-gray-100">
     <Sidebar
             onGroupSelect={(group) => {
             console.log("Clicked group:", group);
               setSelectedGroup(group);
               setSelectedFriend(null);
             }}
             onFriendSelect={(friend) => {
               setSelectedFriend(friend);
               setSelectedGroup(null);
             }}
           />

      <MainContent
             selectedGroup={selectedGroup}
             selectedFriend={selectedFriend}
           />
     <BalancePanel />
   </div>

   </div>
 );

}
