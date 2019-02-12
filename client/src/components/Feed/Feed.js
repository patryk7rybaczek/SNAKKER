import React, { Component } from 'react'

import './style.css'
import PostsList from './Post/PostsList'
import Avatar from '../Header/Profile/avatar.jpg'

export default class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      temp: '',
      posts: [ 

      ]
    }
  }

  onChange = (event) => {
    this.setState({temp: event.target.value})
  }

  onSubmit = (event) => {
    event.preventDefault();
    const newPost = {
      postAuthor: 'Patryk Rybaczek', 
      postContent: this.state.temp,
      postLikes: 0,
      postComments: 0
    }

    this.setState({posts:[newPost, ...this.state.posts], temp: ''})
  }

  render() {
    return (
      <div className="feed">

        <div className="user-post">
            <form onSubmit={this.onSubmit}>
              <div className="input-wrapper">
                <img src={Avatar} alt="user avatar"/>
                <input onChange={this.onChange} value={this.state.temp} type="text" name="Post" placeholder="What’s up, Patryk?" autoComplete="off"/>
              </div>
              <div className="button-wrapper">
                <input onSubmit={this.onSubmit} className="btn-inp" type="submit" value="Publish" />
              </div>
            </form>
        </div>
        
        <PostsList
          posts={this.state.posts}
        />

      </div>
    )
  }
}
