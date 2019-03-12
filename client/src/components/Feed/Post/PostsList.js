import React from 'react'
import Post from './Post';
import './style.css'

const PostList = props => (
  <div className="friends-posts">
      {
        props.posts.map((post, index) =>
          <Post post={post}  key={index}/>
        )
      }
  </div>
)
export default PostList
