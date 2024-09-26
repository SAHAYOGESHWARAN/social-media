import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const login = async (email, password) => {
        const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
        setUser(response.data.user);
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
    };

    const register = async (username, email, password) => {
        await axios.post('http://localhost:5000/api/users/register', { username, email, password });
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </UserContext.Provider>
    );
};
