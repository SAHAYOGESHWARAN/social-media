import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../api/AuthContext'; // Adjust the path if necessary

const Navbar = () => {
    const { user, logout } = useAuth(); // Access user and logout from context

    const handleLogout = () => {
        logout(); // Call the logout function
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">SocialMedia</Link>
                <ul className="navbar-links">
                    <li>
                        <Link to="/feed">Feed</Link>
                    </li>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    {user && user.role === 'admin' && (
                        <li>
                            <Link to="/admin/dashboard">Admin Dashboard</Link>
                        </li>
                    )}
                    {user ? (
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
