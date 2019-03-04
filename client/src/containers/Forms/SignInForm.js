import React, { Component } from "react";

import "./style.css";
import Logo from "../../logo";
import { Link } from "react-router-dom";

export class SignInForm extends Component {

  handleSubmit() {}

  render() {
    return (
        <div className="SignInUpContainer">
            <div className="logo">
                <Logo /> 
            </div>
            <form className="SignInForm">
                <h2 className="Heading-SignIn">Welcome to snakker</h2>
                <p className="OfferLink">New to snakker? <a href="#">Check what we have to offer!</a></p>
                <label>E-mail</label>
                <input name="email" type="email"/>

                <label>Password </label>   
                <input name="password" type="password" className="MarginFree"/>
                <Link className="ForgotPass" to="/retrieve">Forgot your password?</Link>
                <div className="FormFooter">
                    <button>Sign In</button>
                    <p className="SignUpLink">Don't Have an Account?<Link to="/register"> Sign Up!</Link></p>
                </div>
            </form>
        </div>
    );
  }
}

export default SignInForm;