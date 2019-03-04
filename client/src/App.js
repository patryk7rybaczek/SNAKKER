import React, { Component } from 'react';
import './App.css';

import SignInForm from './containers/Forms/SignInForm';
import SignUpForm from './containers/Forms/SignUpForm';
import Profile from './containers/Profile/Profile';
import Retrieve from './containers/Forms/Retrieve';
import LoggedIn from './containers/LoggedIn/LoggedIn';

import { Route } from "react-router-dom";

class Root extends Component {
  render() {
    return (
      <div className="Root">
        <Route path="/login" component={ SignInForm } />
        <Route path="/register" component={ SignUpForm } />
        <Route path="/retrieve" component={ Retrieve } />
        <Route path="/:username" component={ Profile } />
        <Route path="/" component={ LoggedIn } exact/>
      </div>
    );
  }
}

export default Root;
