import React, { Component } from 'react'
import "./style.css";
import Logo from "../../logo";

export class Retrieve extends Component {
  render() {
    return (
        <div className="SignInUpContainer"> 
            <div className="logo">
                <Logo /> 
            </div>
            <form className="SignInForm">
                <h2 className="Heading-SignIn">Retrieve Account</h2>
                <p className="OfferLink">Enter email is associated with your Snakker accound</p>
                <label>E-mail</label>
                <input name="email" type="email"/>
                <div className="FormFooter">
                    <button>Send Reset Instructions</button>
                </div>
            </form>
        </div>
    )
  }
}

export default Retrieve
