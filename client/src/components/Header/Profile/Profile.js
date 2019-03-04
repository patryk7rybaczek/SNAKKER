import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Avatar from './avatar.jpg'
import './style.css'

// CSS React Transitions import 
import { CSSTransitionGroup } from 'react-transition-group'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false,
      username: null,
    }

    this.menuOpen = this.menuOpen.bind(this)
    this.menuClose = this.menuClose.bind(this)
  }
  
  componentDidMount = () => {
    console.log(this.props)
    let username = 'Patryk';
    this.setState({ username: username });
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
      const username = this.state.username;

      return (
        <div className="profile">
            <img src={Avatar} alt="user avatar"/>
            <Link to={'/' + username}>
              <span id="username">Patryk</span>
            </Link>
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