import React, { Component } from 'react'
import Avatar from '../../../Header/ProfileSettings/avatar.jpg'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './style.css'
import { deleteComment, getPostsById } from '../../../../actions/postActions';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago'

class Comment extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
  }
  
  onUsernameClick = (id) => {
    this.props.getPostsById(id)
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
            <div className="user-comment-info">
                <div className="user-info">
                  <div className="comment-content">
                    <img src={Avatar}  alt="user avatar"/>
                    <div>
                      <Link onClick={() => this.onUsernameClick(comment.user)}  to={"/profile/" + comment.user}>{comment.author}</Link>
                      <span><TimeAgo date={comment.date}/></span>
                    </div>
                  </div>
                </div>
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
    deleteComment: PropTypes.func.isRequired,
    getPostsById: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
  }
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.error
  })
  
  export default connect(mapStateToProps, {deleteComment, getPostsById})(Comment);
  