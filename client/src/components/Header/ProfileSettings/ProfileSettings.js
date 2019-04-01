import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Avatar from './avatar.jpg'
import './style.css'

// Redux 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';

class ProfileSettings extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div className="profile">
          <img src={Avatar} alt="user avatar"/>
          <Link to={'/'}>
            <span id="username">{user.name}</span>
          </Link>
            <div className="profile-menu-container">
                <i className="fas fa-angle-down" onClick={this.menuOpen}></i> 
                <ul className="profile-menu">
                    <li>Admin panel</li>
                    <li>My profile</li>
                    <li onClick={this.onLogoutClick}>Sign out</li>
                  </ul>
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
  