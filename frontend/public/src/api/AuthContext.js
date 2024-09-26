import React, { createContext, useState, useEffect } from 'react';
import authService from '../api/auth'; // Adjust the path if necessary

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userProfile = await authService.getProfile();
                setUser(userProfile);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const register = async (name, email, password) => {
        const userData = await authService.register(name, email, password);
        setUser(userData);
    };

    const login = async (email, password) => {
        const userData = await authService.login(email, password);
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token'); // Clear the token from local storage
    };

    const resetPassword = async (newPassword) => {
        return await authService.resetPassword(newPassword);
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
};
