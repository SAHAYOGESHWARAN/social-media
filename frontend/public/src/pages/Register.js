import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import the authentication context
import './Register.css'; // Import your CSS file for styling
import { useHistory } from 'react-router-dom'; // For redirecting after registration

const Register = () => {
    const { register } = useAuth(); // Get the register function from auth context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory(); // Initialize useHistory for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.'); // Check if passwords match
            setLoading(false);
            return;
        }

        try {
            await register(email, password); // Attempt to register the user
            history.push('/login'); // Redirect to login page on success
        } catch (err) {
            setError('Failed to create an account.'); // Set error message
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="register">
            <h2>Register</h2>
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
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating account...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default Register;
