import { useState } from "react";
import axios from "axios";

export default function GroupSection({ showForm, setShowForm }) {
  const [groupName, setGroupName] = useState("");
  const [groupType, setGroupType] = useState("");
  const [members, setMembers] = useState([{ email: "" }]);
  const [loading, setLoading] = useState(false);
    const API = import.meta.env.VITE_API_URL;
  const addMember = () => {
    setMembers([...members, {email: "" }]);
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleMemberChange = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const saveGroup = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Not authenticated");
        return;
      }

      // ✅ Convert [{email}] → ["email1", "email2"]
      const memberEmails = members
        .map((m) => m.email.trim())
        .filter(Boolean); // remove empty values

      const res = await axios.post(
        "http://localhost:8000/group/add-group",
        {
          name: groupName,
          type: groupType,
          members: memberEmails,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Group created:", res.data);

      // Reset
      setGroupName("");
      setGroupType("");
      setMembers([{ email: "" }]);
      setShowForm(false);
    } catch (err) {
      console.error("Create group error:", err.response?.data || err.message);
      alert("Failed to create group");
    } finally {
      setLoading(false);
    }
  };

  if (!showForm) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-xl font-bold">Create New Group</h2>

      {/* Group Name */}
      <input
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Group name"
        className="w-full px-4 py-2 border rounded-lg"
      />

      {/* Members */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Group Members</h3>

        {members.map((member, index) => (
          <div key={index} className="flex gap-2 mb-3">


            <input
              placeholder="Email"
              value={member.email}
              onChange={(e) =>
                handleMemberChange(index, "email", e.target.value)
              }
              className="flex-1 px-3 py-2 border rounded-lg"
            />

            {members.length > 1 && (
              <button
                onClick={() => removeMember(index)}
                className="text-red-500 font-bold"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addMember}
          className="text-indigo-600 font-medium hover:underline"
        >
          + Add another member
        </button>
      </div>

      {/* Group Type */}
      <select
        value={groupType}
        onChange={(e) => setGroupType(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg"
      >
        <option value="">Select group type</option>
        <option value="trip">Trip</option>
        <option value="home">Home</option>
        <option value="couple">Couple</option>
      </select>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowForm(false)}
          className="px-4 py-2 bg-gray-100 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={saveGroup}
          disabled={loading}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
        >
          {loading ? "Saving..." : "Save Group"}
        </button>
      </div>
    </div>
  );
}
