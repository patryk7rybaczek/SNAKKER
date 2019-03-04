import React, { Component } from 'react'

// Header Components
import HeaderLogo from './HeaderLogo/HeaderLogo'
import Profile from './Profile/Profile'
import Search from './Search/Search'

import './style.css'

export default class Header extends Component {
    render() {
      return (
        <header>
            <HeaderLogo />
            <Search />
            <Profile {...this.props}/>
        </header>
      )
    }
  }
  