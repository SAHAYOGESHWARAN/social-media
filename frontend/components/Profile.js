import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';

const Profile = () => {
    const { token } = useUserContext();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile', error);
            }
        };

        if (token) fetchProfile();
    }, [token]);

    if (!userProfile) return <div>Loading...</div>;

    return (
        <div>
            <h2>User Profile</h2>
            <p>Username: {userProfile.username}</p>
            <p>Email: {userProfile.email}</p>
        </div>
    );
};

export default Profile;
