import React, { Component } from 'react';

// REDUX IMPORTS
import store from './store';
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import './App.css';

import SignInForm from './containers/Forms/SignInForm';
import SignUpForm from './containers/Forms/SignUpForm';
import Profile from './containers/Profile/Profile';
import Retrieve from './containers/Forms/Retrieve';
import LoggedIn from './containers/LoggedIn/LoggedIn';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info and expirationDate
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated to true
  store.dispatch(setCurrentUser(decoded));

  // Check if token expired
  const currentTime = Date.now() / 1000; // Get time in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = './login';
  }
}

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="Root">
            <Route path="/login" component={ SignInForm } />
            <Route path="/retrieve" component={ Retrieve } />
            <Route path="/register" component={ SignUpForm } />
            <Switch>
              <PrivateRoute exact path="/" component={ LoggedIn } />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default Root;
