import React, { Component } from 'react'
import Avatar from '../../../Header/ProfileSettings/avatar.jpg'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './style.css'
import { deleteComment } from '../../../../actions/postActions';

class Comment extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	deleteComment = (id) => {
    let postID = this.props.post._id;
    let commentID = this.props.comment._id;
		this.props.deleteComment(postID, commentID);
  }

    render() {
      const { auth } = this.props
      const { comment } = this.props

      return (
        <div className="user-comment">
            <div className="user-info">
              <img src={Avatar}  alt="user avatar"/>
              <a href="">{comment.author}</a>
                { comment.user === auth.user.id ? (
                  <div className="user-post-settings">
                    <span onClick={this.deleteComment.bind(this, comment._id)}>Remove</span>
                  </div>
                ):(null)}
            </div>
            <p>{ comment.text }</p>
        </div>
      ) 
    }
  }
  
  Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
  }
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.error
  })
  
  export default connect(mapStateToProps, {deleteComment})(Comment);
  