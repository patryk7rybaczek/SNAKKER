import React, { Component } from 'react'
import './style.css'
import PostsList from './Post/PostsList'
import Header from '../../components/Header/Header'
import Avatar from '../../components/Header/ProfileSettings/avatar.jpg'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //isUsersProfile: true,
      //username: null,
      //temp: '',
      //posts: [ 

      //]
    }
  }

  componentDidMount = () => {
    let username = this.props.match.params.username;
    this.setState({ username: username });
    console.log();
  }

  onChange = (event) => {
    this.setState({temp: event.target.value})
  }

  onKeyDown = (event) => {
    if(event.keyCode === 13) {
      event.preventDefault();
      this.onSubmit(event);
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    let newPost = {
      postId: 1,
      postAuthor: 'Patryk Rybaczek', 
      postContent: this.state.temp,
      postLikes: 0,
      postComments: 0
    }

    this.setState({posts:[newPost, ...this.state.posts], temp: ''})
  }

  render() {
    const isUsersProfile = this.state.isUsersProfile
    return (
      <div>
        <Header />

        <div className="feed profile-feed">
          <div className="banner">
            <h2> {this.state.username} </h2>
          </div>
          {isUsersProfile ?(
          <div className="user-post">
            <form onSubmit={this.onSubmit}>
              <div className="textarea-wrapper">
                <img src={Avatar} alt="user avatar"/>
                <textarea onChange={this.onChange} onKeyDown={this.onKeyDown} value={this.state.temp} type="text" name="Post" placeholder="What’s up, Patryk?" autoComplete="off"/>
              </div>
              <div className="button-wrapper">
                <input onSubmit={this.onSubmit} className="btn-inp" type="submit" value="Publish" />
              </div>
            </form>
          </div>
          ) : (
            null
          )}

          <PostsList
            posts={this.state.posts}
          />
        </div>  
      </div>
    )
  }
}
