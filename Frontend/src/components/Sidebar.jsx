import { useEffect, useState } from "react";
import axios from "axios";
import {UserRound, Users,Handshake} from "lucide-react"

export default function Sidebar({ onGroupSelect, onFriendSelect }) {
    const [groups, setGroups] = useState([]);
    const [friends, setFriends] = useState([]);
      const API = import.meta.env.VITE_API_URL;

    useEffect(() => {
      fetchGroups();
    }, []);

    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get( `${API}/group/getGroup`,{
            headers: { Authorization: `Bearer ${token}`,},
          });

        const groupsData = res.data.groups;
        setGroups(groupsData);

        const allFriends = groupsData.flatMap(group =>
          group.members.map(member => member.name || member.email)
        );

        const uniqueFriends = [...new Set(allFriends)];
        setFriends(uniqueFriends);


      } catch (err) {
        console.error("Sidebar fetch error:", err);
      }
    };
  return (
    <aside className="w-64 bg-white border-r p-4 space-y-6">
      <h1 className="text-xl font-bold text-green-600">Splitwise</h1>

      <nav className="space-y-2 text-sm">
        <p className="font-semibold text-gray-500 cursor-pointer hover:text-green-600">Dashboard</p>
        <p className="text-gray-600">Recent activity</p>
        <p className="text-gray-600">All expenses</p>
      </nav>

      <hr />

            {/* GROUPS */}
            <div>
            <h3 className="text-xs flex gap-1 font-semibold text-gray-400"><Users size={15}/>GROUPS</h3>
            <ul>
              {groups.map(group => (
                <li  key={group._id} onClick={() => onGroupSelect(group)} className="cursor-pointer hover:text-green-600" >
                  {group.name?.split("@")[0].replace(".", " ").replace(/\b\w/g, char => char.toUpperCase())}
                </li>
              ))}
            </ul>
           </div>

           <hr />

           {/* FRIENDS */}
           <div>
             <h3 className="text-xs font-semibold flex gap-1 text-gray-400 mt-10"><Handshake size={15}/>FRIENDS</h3>
            <ul>
              {friends.map((friend, index) => (
                <li key={index} onClick={() => onFriendSelect(friend)} className="cursor-pointer gap-4 hover:text-green-600 flex" >
                   {friend?.charAt(0).toUpperCase() + friend?.slice(1)}
                    <hr />
                </li>
              ))}

            </ul>
           </div>



      <div className="pt-4">
        <input placeholder="Enter email" className="w-full px-2 py-1 border rounded text-sm"/>
        <button className="mt-2 w-full bg-green-500 text-white py-1 rounded text-sm"> Invite friend  </button>
      </div>


    </aside>
  );
}
