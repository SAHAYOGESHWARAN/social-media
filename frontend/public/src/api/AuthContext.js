import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { data } = await axios.get('/api/users/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(data);
        } catch (error) {
          console.error('Failed to fetch user profile', error);
        }
      }
    };
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
