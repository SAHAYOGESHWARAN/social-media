import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const MyComponent = () => {
    const { user, loading, login, logout } = useContext(AuthContext);

    const handleLogin = async () => {
        await login('email@example.com', 'password');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {user ? (
                <div>
                    <h1>Welcome, {user.name}</h1>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <button onClick={handleLogin}>Login</button>
            )}
        </div>
    );
};

export default MyComponent;
