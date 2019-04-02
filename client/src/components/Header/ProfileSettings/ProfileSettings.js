import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Avatar from './avatar.jpg'
import './style.css'

// Redux 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';

class ProfileSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  toggleMenu = e => {
    e.preventDefault();
    if (!this.state.isOpen) {
      this.setState({ isOpen: true });
    } else {
      this.setState({ isOpen: false });
    }
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { user } = this.props.auth;
    const isOpen = this.state.isOpen;
    
    return (
      <div className="profile">
        <img src={Avatar} alt="user avatar"/>
        <Link to={'/'}>
          <span id="username">{user.name}</span>
        </Link>
        <div className="profile-menu-container">
          { isOpen ? 
            (<i className="fas fa-angle-up" onClick={this.toggleMenu}></i> )
              :
            (<i className="fas fa-angle-down" onClick={this.toggleMenu}></i>)} 
          { isOpen ? (
            <ul className="profile-menu">
              <li>Admin panel</li>
              <li>My profile</li>
              <li onClick={this.onLogoutClick}>Sign out</li>
            </ul>
          ) : ( null )}
        </div>
      </div>
    )
  }
}

ProfileSettings.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(ProfileSettings)
  