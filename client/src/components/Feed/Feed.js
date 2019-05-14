import React, { Component } from 'react';

import PostsList from './Post/PostsList';
import PostForm from './PostForm/PostForm';

import './style.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts  } from '../../actions/postActions';

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      welcomeId: 0,
      welcomeVarious: [
          {
              id: 0,
              lang: 'Swedish',
              content: 'Välkommen'
          },
          {
              id: 1,
              lang: 'Danish',
              content: 'Velkommen'
          },
          {
              id: 2,
              lang: 'English',
              content: 'Welcome' 
          },
          {
              id: 3,
              lang: 'Estonian',
              content: 'Teretulemast'
          },
          {
              id: 4,
              lang: 'Finnish',
              content: 'Tervetuloa'
          },
          {
              id: 5,
              lang: 'French',
              content: 'Soyez la bienvenue'
          },
          {
              id: 6,
              lang: 'German',
              content: 'Herzlich Willkommen'
          },
          {
              id: 7,
              lang: 'Hawaiian',
              content: 'Aloha E Komo Mai'
          },
          {
              id: 8,
              lang: 'Norwegian',
              content: 'Velkommen'
          },
          {
              id: 9,
              lang: 'Persian',
              content: 'Khosh amadid'
          },
          {
              id: 10,
              lang: 'Spanish',
              content: 'Bienvenida'
          },
          {
              id: 11,
              lang: 'Slovenian',
              content: 'Dobrodosli'
          },
          {
              id: 12,
              lang: 'Russian',
              content: 'Dobro pozhalovat'
          },
          {
              id: 13,
              lang: 'Portuguese',
              content: 'Bemvindos'
          }
          ,
          {
              id: 14,
              lang: 'Polish',
              content: 'Serdecznie witamy'
          },
          {
              id: 15,
              lang: 'Tibetan',
              content: 'Tashi Delek'
          },
          {
              id: 16,
              lang: 'Ukranian',
              content: 'Laskavo prosimo'
          },
          {
              id: 17,
              lang: 'Vietnamese',
              content: 'Kinh Chao Quy Khach'
          },
          {
              id: 18,
              lang: 'Chinese',
              content: 'Huanying guanglin'
          },
          {
              id: 19,
              lang: 'Maltese',
              content: 'Merhba'
          },
          {
              id: 20,
              lang: 'Japanese',
              content: 'Irasshaimase'
          },
          {
              id: 21,
              lang: 'Welsh',
              content: 'Croeso cynne'
          },
          {
              id: 22,
              lang: 'Indonesian',
              content: 'Selamat datang'
          },
          {
              id: 23,
              lang: 'Latin',
              content: 'Gratissimum'
          },
          {
              id: 24,
              lang: 'Island',
              content: 'Velkominn'
          },
          {
              id: 25,
              lang: 'Romanian',
              content: 'Bine ati venit'
          },
          {
              id: 26,
              lang: 'Hungarian',
              content: 'Üdvözöljük'
          },
          {
              id: 27,
              lang: 'Czech',
              content: 'Vítejte'
          }
      ]
    }
  }
  
  componentDidMount() {
    this.timeout = setInterval(() => {
    let currentWelcomeId = Math.floor(Math.random() * 28)
    this.setState({ welcomeId: currentWelcomeId + 1 });
    }, 5000);
    this.props.getPosts();
  }

  componentWillUnmount(){
    this.setState = (state,callback)=>{
      return;
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  render() {
    const { posts } = this.props.post;
    const { auth } = this.props.auth;

    let postContent;
    postContent = <PostsList posts={posts} />;

    let welcomeChanges = this.state.welcomeVarious[this.state.welcomeId % this.state.welcomeVarious.length]

    return (
      <div>
        <div className="banner">
          <h2>{welcomeChanges.content} {this.state.username}</h2>
          <h3>{welcomeChanges.lang}</h3>
        </div>
        <div className="feed">
          <PostForm auth={auth}/>
          <div className="friends-posts">
            {postContent}
          </div>
        </div>
      </div>
    )
  }
}

Feed.propTypes = {
  post: PropTypes.object,
  auth: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  errors: state.error
});

export default connect(
  mapStateToProps,
  { getPosts })(Feed);