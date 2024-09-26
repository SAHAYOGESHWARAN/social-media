import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import your Auth context provider
import Navbar from './components/Navbar'; // Import Navbar component
import Home from './pages/Home'; // Import Home page
import Login from './pages/Login'; // Import Login page
import Register from './pages/Register'; // Import Register page
import UserProfile from './pages/UserProfile'; // Import User Profile page
import AdminDashboard from './pages/AdminDashboard'; // Import Admin Dashboard
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute component

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <PrivateRoute path="/profile" component={UserProfile} />
                    <PrivateRoute path="/admin" component={AdminDashboard} />
                    {/* Add other routes as necessary */}
                </Switch>
            </Router>
        </AuthProvider>
    );
};

export default App;
