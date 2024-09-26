import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../axiosConfig'; // Adjust the path if necessary

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/auth/profile'); // Fetch user profile
                setUser(response.data); // Assume the response data contains user information
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setUser(null); // Reset user state on error
            } finally {
                setLoading(false); // Set loading to false after attempting to fetch user
            }
        };

        fetchUser();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('/auth/login', { email, password });
            setUser(response.data); // Set user data upon successful login
            localStorage.setItem('user', JSON.stringify(response.data)); // Store user info in localStorage
        } catch (error) {
            console.error('Login failed:', error);
            throw error; // Propagate error to the caller
        }
    };

    const logout = () => {
        setUser(null); // Clear user state
        localStorage.removeItem('user'); // Remove user data from localStorage
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {!loading && children} {/* Render children if not loading */}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext); // Custom hook to access auth context
};
