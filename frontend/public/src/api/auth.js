import axios from 'axios';

// Set the base URL for the API
const API_URL = 'http://localhost:5000/api/auth/';

// Register a new user
const register = async (name, email, password) => {
    const response = await axios.post(`${API_URL}register`, {
        name,
        email,
        password,
    });
    
    if (response.data) {
        // Save user data or token to local storage if needed
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

// Login user
const login = async (email, password) => {
    const response = await axios.post(`${API_URL}login`, {
        email,
        password,
    });
    
    if (response.data.token) {
        // Save token to local storage for later use
        localStorage.setItem('token', response.data.token);
    }

    return response.data;
};

// Get user profile
const getProfile = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('No token found');
    }

    const response = await axios.get(`${API_URL}profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

// Reset password
const resetPassword = async (newPassword) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('No token found');
    }

    const response = await axios.post(`${API_URL}reset-password`, 
    { newPassword }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

// Export the functions to use in components
export default {
    register,
    login,
    getProfile,
    resetPassword,
};
