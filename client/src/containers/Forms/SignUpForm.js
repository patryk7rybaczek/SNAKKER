import React, { Component } from "react";

import "./style.css";
import Logo from "../../logo";
import { Link } from "react-router-dom";

export class SignUpForm extends Component {

  handleSubmit() {}

  render() {
    return (
        <div className="SignInUpContainer">
            <div className="logo">
                <Logo /> 
            </div>
            <form className="SignUpForm">
                <h2 className="Heading">Create Account</h2>
                <label>E-mail</label>
                <input name="email" type="email"/>

                <label>Username</label>
                <input name="username" type="text"/>

                <label>Password </label>   
                <input name="password" type="password"/>
                <div className="FormFooter">
                    <button className="SignUpButton">Sign Up</button>
                    <Link to="/login">Already have a account ?</Link>
                </div>
            </form>
        </div>
    );
  }
}

export default SignUpForm;