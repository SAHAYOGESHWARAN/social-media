import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import the authentication context
import './Login.css'; // Import your CSS file for styling
import { useHistory } from 'react-router-dom'; // For redirecting after login

const Login = () => {
    const { login } = useAuth(); // Get the login function from auth context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory(); // Initialize useHistory for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login(email, password); // Attempt to log in
            history.push('/'); // Redirect to home page on success
        } catch (err) {
            setError('Failed to log in. Please check your credentials.'); // Set error message
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>} {/* Show error if any */}
            <form onSubmit={handleSubmit}>
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
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;
