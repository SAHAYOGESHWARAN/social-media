import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig'; // Adjust the path if necessary
import { useAuth } from '../context/AuthContext'; // Import the authentication context


const AdminPage = () => {
    const { user } = useAuth(); // Get the user info from the auth context
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/admin/users'); // Fetch all users
                setUsers(response.data); // Set the users in state
            } catch (error) {
                setError('Failed to fetch users.'); // Set error message
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`/admin/users/${userId}`); // Delete user by ID
                setUsers(users.filter(user => user._id !== userId)); // Update users state
            } catch (error) {
                setError('Failed to delete user.'); // Set error message
            }
        }
    };

    if (loading) return <div>Loading...</div>; // Show loading state

    return (
        <div className="admin-page">
            <h1>Admin Dashboard</h1>
            {error && <p className="error">{error}</p>} {/* Show error if any */}
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
