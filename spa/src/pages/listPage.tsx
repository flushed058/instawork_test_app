import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMembers } from "../services/api";

export default function ListPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMembers();
        setMembers(data);
      } catch (err) {
        setError("Failed to load members");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

//     <div className="list-container">
//       <div className="header">
//         <h1>Team Members ({members.length})</h1>
//         <button onClick={() => navigate(`/add`)}>+</button>
//       </div>

//       <div className="member-list">
//         {members.map((member) => (
//           <div
//             key={member.id}
//             className="member-item"
//             onClick={() => navigate(`/edit/${member.id}`)}
//           >
//             <span>
//               {member.first_name} {member.last_name}
//               {member.phone_number}
//               {member.email}
//               {member.role === "admin" ? "(Admin)" : "(Regular)"}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
 return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Team Members ({members.length})
        </h1>
        <button 
          onClick={() => navigate('/add')}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-md transition-colors"
        >
        Add new member
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {members.map(member => (
          <div 
            key={member.id} 
            onClick={() => navigate(`/edit/${member.id}`)}
            className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors last:border-b-0"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800">
                {member.first_name} {member.last_name}
              </span>
              {member.role === 'admin' && (
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  Admin
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {member.email} | {member.phone_number}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
