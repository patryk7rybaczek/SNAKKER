import React, { Component } from 'react'
import Avatar from '../../../components/Header/ProfileSettings/avatar.jpg'
import UserCommentList from './UserCommentList/UserCommentList'
import './style.css'

export default class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      comment: [],
      isUsersProfile: true,
      showComments: false,
      showPostSettings: false,
      showEditPost: false,
    }
  }

  onPostEdit = (event) => {
    this.setState({newPostContent: event.target.value})
  }

  onChange = (event) => {
    this.setState({term: event.target.value});
  }

  handleSettingsClick = () => {
    if(this.state.showPostSettings === false ) {
      this.setState({showPostSettings: true})
    }
    else {
      this.setState({showPostSettings: false})
    }
  }
  handleDelete(id) {
    
  }
  handleEdit = () => {
    if(this.state.showEditPost === false) {
      this.setState({showEditPost: true})
    }
    else {
      this.setState({showEditPost: false})
    }
  }

  toggleComments = () => {
    if(this.state.showComments === false) {
        this.setState({showComments: true})
    }
    else {
        this.setState({showComments: false})
    }
  }

  onKeyDown = (event) => {
    if(event.keyCode === 13) {
      event.preventDefault();
      this.onSubmit();
    }
  }

  onSubmit = () => {
    this.setState({
      term: '',
      comment: [...this.state.comment, this.state.term]
    });
  }

  render() {
    console.log(this.props, this.state);

    const showEditPost = this.state.showEditPost;
    const showComments = this.state.showComments;
    const showPostSettings = this.state.showPostSettings;
    const isUsersProfile = this.state.isUsersProfile;

    const { post } = this.props

    return (  
      <div className="post">
          <div className="top-section top-section-edit">
            <div className="user-post-info">
              <img src={Avatar} alt="user avatar" />
              <p>{post.postAuthor}</p>
            </div>

            { isUsersProfile ?(
              <div className="user-post-settings">
                <button onClick={this.handleSettingsClick}>
                  <i className="fas fa-ellipsis-h"></i>
                </button>
                { showPostSettings? (
                  <div className="user-post-settings-popup">
                    <ul>
                      <li onClick={this.handleEdit}>Edit</li>
                      <li onClick={() => this.handleDelete(post._postId)}>Remove</li>
                    </ul>
                  </div>
                ) : ( null )}
              </div>
            ) : ( null )}

          </div>
          <div className="content-section">
              { showEditPost? (
                <textarea value={this.newPostContent} onChange={this.onPostEdit}></textarea>
              ) : (
                <p>{post.postContent}</p>
              )}
              <div className="likes-comments">
                  <p>Likes: {this.props.post.postLikes}</p>
                  <p onClick={this.toggleComments}>Comments: {this.props.post.postComments}</p>
              </div>
          </div>
          <div className="bottom-section">
              <div className="like-post">
                  <button><i className="fas fa-thumbs-up"></i>Like</button>
              </div>
              <div className="comment-post">
                  <button onClick={this.toggleComments}><i className="fas fa-comment"></i>Comment</button>
              </div>
          </div>
          { showComments ? (
              <div className="comment-section">               
                  <UserCommentList comments={this.state.comment} />
                  <div className="comment-post">
                      <img src={Avatar} alt="user avatar"/>
                      <form onSubmit={this.onSubmit}>
                          <textarea value={this.state.term} onChange={this.onChange} onKeyDown={this.onKeyDown} name="user-comment" type="text" placeholder="Write a comment..."/>
                      </form>
                  </div>
              </div>
          ) : ( null )}
      </div>
    ) 
  }
}
