import React, { Component } from 'react'
import Avatar from '../../Header/ProfileSettings/avatar.jpg'
import UserCommentList from './UserCommentList/UserCommentList'
import './style.css'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePost, addPost, likePost, unlikePost, editPost } from '../../../actions/postActions';
import * as moment from 'moment';

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {},
      showError: false,
      newPostText: '',
      editPostMode: false,
      toggleComments: false,
      togglePostActions: false
    }
  }

  // Toggle Comments 
  toggleComments = () => {
    if(this.state.toggleComments === false) {
        this.setState({toggleComments: true})
    }
    else {
        this.setState({toggleComments: false})
    }
  }

  // POST ACTIONS

  deletePost = (id) => {
    this.props.deletePost(id);
  }

  likePost = (id) => {
    this.props.likePost(id);
  }

  unlikePost = (id) => {
    this.props.unlikePost(id);
  }

  onPostChange = (event) => {
    this.setState({newPostText: event.target.value});
  }

  onEditChange = (event) => {
    this.setState({newPostText: event.target.value});
  }

  editPostMode = (text) => {
    this.setState({ newPostText: text });
    console.log('Editing post with id:' + this.state.postID);
    if(this.state.editPostMode === false) {
      this.setState({editPostMode: true})
    }
    else {
        this.setState({editPostMode: false});
    }
  }

  togglePostActions = (id) => {
    this.setState({ postID: id });
    if(this.state.togglePostActions === false) {
      this.setState({togglePostActions: true});
    }
    else {
        this.setState({togglePostActions: false});
    }
  }

  onPostKeyDown = (e, id) => {
    if(e.keyCode === 13) {
      this.onPostUpdate(e, id);
    }
  }

  onPostUpdate = (e, id) => {
    e.preventDefault();
    let newText = this.state.newPostText;
    let updatedPost = {
      text: newText,
      id: this.state.postID
    }
    this.props.editPost(id, updatedPost);

  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.errors.editTextID === this.state.postID) {
      this.setState({ showError: true })
    } else {
      this.setState({ showError: false });
      this.setState({editPostMode: false});
      this.setState({togglePostActions: false});
    }
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  render() {

    const { errors } = this.state
    const { post, auth } = this.props
    const showError = this.state.showError
    const editPostMode = this.state.editPostMode
    const toggleComments = this.state.toggleComments
    const togglePostActions = this.state.togglePostActions
    
    return (
        <div className="post-separator">
          <div className="post">
            <div className="error-container">
              { showError ? (
                <span className="error-span">{errors.editText}</span>
              ) : ( null )}
            </div>
            <div className="top-section top-section-edit">
              <div className="user-post-info">
                <img src={Avatar} alt="user avatar" />
                <div className="user-info">
                  <p>{post.author}</p>
                  <span className="user-post-timestamp">{moment(post.date).format('YYYY-MM-DD H:m ')}</span>
                  
                </div>
				      </div>
              { post.user === auth.user.id ? (
                <div className="user-post-settings">
                  <button onClick={this.togglePostActions.bind(this, post._id)}><i className="fas fa-ellipsis-v"></i></button>
                </div>
              ):( 
                null
              )}
              { togglePostActions ? (
                <div className="user-post-settings-popup">
                  <ul>
                    <li onClick={this.editPostMode.bind(this, post.text)}>Edit</li>
                    <li onClick={this.deletePost.bind(this, post._id)}>Remove</li>
                  </ul>
                </div>
              ):(
                null
              )}
            </div>

            <div className="content-section">
                { editPostMode ? 
                  (
                    <form onSubmit={e => this.onPostUpdate(e, post._id)}>
                      <textarea onChange={this.onPostChange} onKeyDown={e => this.onPostKeyDown(e, post._id)} value={this.state.newPostText}>
					            </textarea>
                    </form>
                  ) : (<p>{post.text}</p>)
                }
                <div className="likes-comments">
                    <p>Likes: {post.likes.length} </p>
                    <p onClick={this.toggleComments}>Comments: {post.comments.length} </p>
                </div>
            </div>
            <div className="bottom-section">
                <div className="like-post">
                    { 
                      post.likes.filter(like => like.user === auth.user.id).length > 0 ? (
                        <button onClick={this.unlikePost.bind(this, post._id)}><i className="fas fa-thumbs-down"></i>Unlike</button>
                      ) : (
                        <button onClick={this.likePost.bind(this, post._id)}><i className="fas fa-thumbs-up"></i>Like</button>
                      )
                    }
                </div>
                <div className="comment-post">
                    <button onClick={this.toggleComments}><i className="fas fa-comment"></i>Comment</button>
                </div>
            </div>
            <div className="comment-section">
              { toggleComments ? 
              (<UserCommentList comments={post.comments} post={post} /> )
              :(null) }
            </div>
            
          </div>
      </div>
    ) 
  }
}


Post.propTypes = {
  deletePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired, 
  errors: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.error
})

export default connect(mapStateToProps, 
  {deletePost, addPost, likePost, unlikePost, editPost})(Post);