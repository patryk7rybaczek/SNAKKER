import React, { Component } from 'react'

// Header Components
import HeaderLogo from './HeaderLogo/HeaderLogo'
import ProfileSettings from './ProfileSettings/ProfileSettings'
import Search from './Search/Search'

import './style.css'

export default class Header extends Component {
    render() {
      return (
        <header>
            <HeaderLogo />
            <Search />
            <ProfileSettings {...this.props}/>
        </header>
      )
    }
  }
  