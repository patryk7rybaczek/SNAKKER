import React, { Component } from 'react'
import Logo from "../../../logo";
import './style.css'

export default class HeaderLogo extends Component {
    render() {
      return (
        <div className="logo-header">
            <div className="logo-container">
                <Logo /> 
            </div>
        </div>
      )
    }
  }
  