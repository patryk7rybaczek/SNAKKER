import React, { Component } from 'react'
import Avatar from '../../../Header/ProfileSettings/avatar.jpg'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './style.css'

class Comment extends Component {
  
    render() {
      const { comment } = this.props
  
      return (
        <div className="user-comment">
            <div className="user-info">
                <img src={Avatar}  alt="user avatar"/>
                <a href="">{comment.author}</a>
            </div>
            <p>{ comment.text }</p>
        </div>
      ) 
    }
  }
  
  Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  }
  
  const mapStateToProps = state => ({
    auth: state.auth
  })
  
  export default connect(mapStateToProps, {})(Comment);
  