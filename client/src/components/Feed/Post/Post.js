import React, { Component } from 'react'
import Avatar from '../../Header/ProfileSettings/avatar.jpg'
import UserCommentList from './UserCommentList/UserCommentList'
import './style.css'

export default class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      comment: [],
      showComments: false
    }
  }

  onChange = (event) => {
    this.setState({term: event.target.value});
  }

  toggleComments = (event) => {
    event.preventDefault();
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
      event.stopPropagation();
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
    console.log(this.props);
    const showComments = this.state.showComments;
    return (
        <div className="post-separator">
            <div className="post">
                <div className="top-section">
                    <img src={Avatar} alt="user avatar" />
                    <p>{this.props.post.postAuthor}</p>
                </div>
                <div className="content-section">
                    <p>{this.props.post.postContent}</p>
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
        </div>
    ) 
  }
}
