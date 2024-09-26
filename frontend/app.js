import React from 'react';
import { UserProvider } from './context/UserContext';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';

const App = () => {
    return (
        <UserProvider>
            <div>
                <h1>Social Media Platform</h1>
                <Register />
                <Login />
                <Profile />
            </div>
        </UserProvider>
    );
};

export default App;
