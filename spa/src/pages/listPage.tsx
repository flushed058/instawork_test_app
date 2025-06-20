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

  return (
    <div className="list-container">
      <div className="header">
        <h1>Team Members ({members.length})</h1>
        <button onClick={() => navigate(`/add`)}>+</button>
      </div>

      <div className="member-list">
        {members.map((member) => (
          <div
            key={member.id}
            className="member-item"
            onClick={() => navigate(`/edit/${member.id}`)}
          >
            <span>
              {member.first_name} {member.last_name}
              {member.phone_number}
              {member.email}
              {member.role === "admin" ? "(Admin)" : "(Regular)"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
