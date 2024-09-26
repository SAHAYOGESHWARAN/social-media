import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import AdminPage from './components/AdminPage';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/admin" component={AdminPage} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
