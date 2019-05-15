import React, { Component } from 'react'
import Avatar from '../../../Header/ProfileSettings/avatar.jpg'
import './style.css'
import { connect } from 'react-redux';
import { getPostsById } from '../../../../actions/postActions';
import { Link } from 'react-router-dom';

class Suggestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
        errors: {},
    }
  }

  onUsernameClick = (id) => {
    this.props.getPostsById(id)
  }

  render() {
    console.log(this.props.user)
    const { user } = this.props

    return (
        <Link onClick={() => this.onUsernameClick(user.id)}  to={"/profile/" + user.id}>
            <li>
                <img src={Avatar} alt="profile avatar"/>
                <p>{user.name}</p>
            </li>
        </Link>
    ) 
  }
}


Suggestion.propTypes = {

}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.error
})

export default connect(mapStateToProps, 
  { getPostsById })(Suggestion);