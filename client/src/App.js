import React, { Component } from 'react';
import './App.css';

import SignInForm from './containers/SignInForm';
import SignUpForm from './containers/SignUpForm';
import Retrieve from './containers/Retrieve';
import LoggedIn from './containers/LoggedIn';

import { Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/login" component={ SignInForm } />
        <Route path="/register" component={ SignUpForm } />
        <Route path="/retrieve" component={ Retrieve } />
        <Route path="/" component={ LoggedIn } exact/>
      </div>
    );
  }
}

export default App;
