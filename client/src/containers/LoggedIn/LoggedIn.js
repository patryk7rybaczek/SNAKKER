import React, { Component } from 'react'

// Components User Logged in
import Feed from '../../components/Feed/Feed'
import Header from '../../components/Header/Header'

// Style
import './loggedin.css'

export default class LoggedIn extends Component {
  render() {
    return (
      <div className="root">
        <Header/>
        <Feed />
      </div>
    )
  }
}