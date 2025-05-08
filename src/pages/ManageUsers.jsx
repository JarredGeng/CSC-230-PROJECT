import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ManageUsers.css"

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    role: "student",
    is_active: true,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  const handleAddUser = async () => {
    if (!newUser.email || !newUser.password) {
      alert("Email and password are required.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/users", newUser);
      setNewUser({ email: "", password: "", role: "student", is_active: true });
      fetchUsers();
    } catch (err) {
      alert("Failed to add user.");
      console.error(err);
    }
  };

  const updateRole = async (id, role) => {
    await axios.patch(`http://localhost:5000/api/users/${id}/role`, { role });
    fetchUsers();
  };

  const toggleActive = async (id) => {
    await axios.patch(`http://localhost:5000/api/users/${id}/toggle`);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    }
  };

  return (
    <div className="manage-users">
      <h2>Manage Users</h2>

      <div style={{ marginBottom: "2rem" }}>
        <h3>Add New User</h3>
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={newUser.is_active}
            onChange={(e) => setNewUser({ ...newUser, is_active: e.target.checked })}
          />
          Active
        </label>
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => updateRole(user.id, e.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <button onClick={() => toggleActive(user.id)}>
                  {user.is_active ? "Deactivate" : "Active"}
                </button>
              </td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              <td>
                <button onClick={() => deleteUser(user.id)} style={{ color: "white" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
