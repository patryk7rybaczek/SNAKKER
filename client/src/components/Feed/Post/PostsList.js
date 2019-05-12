import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Post from './Post';

import './style.css'
class PostList extends Component {
  render () {
    const { posts, loading } = this.props;
    let postcontent;

    if(posts === null || loading || Object.keys(posts).length === 0) {

    }

    return ( 
      <div>
        { posts.map(post => <Post key={post._id} post={post} />) }
      </div>
    )
  }
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired
}

export default PostList
