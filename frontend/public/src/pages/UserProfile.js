import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
      } catch (error) {
        console.error('Error fetching user profile', error);
      }
    };

    fetchProfile();
  }, [token]);

  return (
    <div className="profile-container">
      <h2>{user.name}'s Profile</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default UserProfile;
