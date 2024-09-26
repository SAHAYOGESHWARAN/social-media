import axios from 'axios';

export const loginUser = async (email, password) => {
  try {
    const { data } = await axios.post('/api/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
