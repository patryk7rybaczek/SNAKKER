import React, { Component } from 'react'
import './style.css'
import Header from '../../components/Header/Header'
import { connect } from 'react-redux';
import { getPostsById } from '../../actions/postActions';
import PropTypes from 'prop-types';
import PostForm from '../../components/Feed/PostForm/PostForm'
import PostsList  from '../../components/Feed/Post/PostsList'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    this.props.getPostsById(this.props.match.params.id);
  }

  render() {
    let username;
    const { posts } = this.props.post;
    posts.map(post => username = post.author)

    let postContent
    postContent = <PostsList posts={posts} />
    return (
      <div>
        <Header />
        <div className="banner banner-margin">
          <h2>{username}</h2>
        </div>
        <div className="feed">
          { this.props.match.params.id === this.props.post.user ? (
            <PostForm />
          ):(null)}
          <div className="friends-posts">
            {postContent}
          </div>
        </div> 
      </div>
    )
  }
}

Profile.propTypes = {
  post: PropTypes.object,
  auth: PropTypes.object.isRequired,
  getPostsById: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  errors: state.error
});

export default connect(
  mapStateToProps, { getPostsById })(Profile);