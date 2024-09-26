import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
