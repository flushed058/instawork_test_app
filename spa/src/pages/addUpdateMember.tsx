import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createMember, getMember, updateMember } from "../services/api";

interface FormPageProps {
  isEditMode?: boolean;
}

const FormPage: FC<FormPageProps> = ({ isEditMode = false }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Omit<Member, "id">>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    role: "regular",
  });

  useEffect(() => {
    if (!isEditMode || !id) return;

    const fetchMemberData = async () => {
      try {
        const member = await getMember(parseInt(id));
        if (member) {
          setFormData({
            first_name: member.first_name,
            last_name: member.last_name,
            email: member.email,
            phone_number: member.phone_number,
            role: member.role,
          });
        }
      } catch (error) {
        console.error("Error fetching member:", error);
      }
    };

    fetchMemberData();
  }, [id, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && id) {
        await updateMember(parseInt(id), formData);
      } else {
        await createMember(formData);
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving member:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      role: e.target.value as Role,
    });
  };

  return (
    <div className="form-container">
      <h1>{isEditMode ? "Edit" : "Add"} Team Member</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
        <label>Role:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="role"
              value="regular"
              checked={formData.role === "regular"}
              onChange={handleRoleChange}
            />
            Regular
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={formData.role === "admin"}
              onChange={handleRoleChange}
            />
            Admin
          </label>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default FormPage;
