import React, { Component } from 'react';
import './App.css';

import SignInForm from './containers/SignInForm';
import SignUpForm from './containers/SignUpForm';
import Retrieve from './containers/Retrieve';
import Feed from './containers/Feed';

import { Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/login" component={ SignInForm } />
        <Route path="/register" component={ SignUpForm } />
        <Route path="/retrieve" component={ Retrieve } />
        <Route path="/feed" component={ Feed } />
      </div>
    );
  }
}

export default App;
