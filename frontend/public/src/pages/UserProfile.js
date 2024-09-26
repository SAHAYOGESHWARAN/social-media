import React, { useEffect, useState } from 'react';
import { useAuth } from '../api/AuthContext'; // Import the authentication context
import './UserProfile.css'; // Import your CSS file for styling

const UserProfile = () => {
    const { user, updateProfile } = useAuth(); // Get the user data and updateProfile function from auth context
    const [name, setName] = useState(user.name || '');
    const [email, setEmail] = useState(user.email || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name); // Set initial state with user data
            setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await updateProfile({ name, email }); // Call the updateProfile function
            alert('Profile updated successfully!'); // Notify user of successful update
        } catch (err) {
            setError('Failed to update profile.'); // Set error message on failure
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            {error && <p className="error">{error}</p>} {/* Show error if any */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
        </div>
    );
};

export default UserProfile;
