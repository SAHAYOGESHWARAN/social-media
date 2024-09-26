import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../api/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      if (data.token) {
        if (data.role === 'admin') {
          history.push('/admin'); // Redirect to admin page if the user is an admin
        } else {
          history.push('/profile'); // Redirect to user profile page
        }
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
