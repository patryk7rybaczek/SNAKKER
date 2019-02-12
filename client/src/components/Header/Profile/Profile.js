import React, { Component } from 'react'
import Avatar from './avatar.jpg'
import './style.css'

// CSS React Transitions import 
import { CSSTransitionGroup } from 'react-transition-group'

export default class Header extends Component {
  constructor() {
    super()
    this.state = {
      menuOpen: false,
    }

    this.menuOpen = this.menuOpen.bind(this)
    this.menuClose = this.menuClose.bind(this)
  }

  menuOpen(event) {
    event.preventDefault()
    this.setState({ menuOpen: true }, () => {
      document.addEventListener('click', this.menuClose)
    })
  }
  menuClose(event) {
    if(!this.dropdownMenu.contains(event.target)) {
      this.setState({ menuOpen: false }, () => {
        document.removeEventListener('click', this.menuClose)
      })
    }
  }
    render() {
      return (
        <div className="profile">
            <img src={Avatar} alt="user avatar"/>
            <span id="username">Patryk</span>
              <div className="profile-menu-container">
                <CSSTransitionGroup
                  transitionName="slideToggle"
                  transitionEnterTimeout={400}
                  transitionLeaveTimeout={400}
                >
                { !this.state.menuOpen ? 
                  ( <i className="fas fa-angle-down" onClick={this.menuOpen}></i> ) : 
                  ( <i className="fas fa-angle-up" onClick={this.menuOpen}></i> ) }
                { this.state.menuOpen ? 
                  ( <ul className="profile-menu" ref={(element) => {this.dropdownMenu = element}}>
                      <li>Admin panel</li>
                      <li>My profile</li>
                      <li>Sign out</li>
                    </ul>) :( null ) } 
                </CSSTransitionGroup>
              </div>
        </div>
      )
    }
  }