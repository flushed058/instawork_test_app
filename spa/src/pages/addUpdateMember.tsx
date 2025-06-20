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
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditMode ? "Edit" : "Add"} Team Member
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            First Name
          </label>
          <input
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Last Name
          </label>
          <input
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number
          </label>
          <input
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Role
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="regular"
                checked={formData.role === "regular"}
                onChange={handleRoleChange}
                className="text-blue-500 focus:ring-blue-500"
              />
              <span>Regular</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={formData.role === "admin"}
                onChange={handleRoleChange}
                className="text-blue-500 focus:ring-blue-500"
              />
              <span>Admin</span>
            </label>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;
