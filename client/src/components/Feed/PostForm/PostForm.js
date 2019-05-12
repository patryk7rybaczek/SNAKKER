import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { addPost } from '../../../actions/postActions';
import Avatar from '../../Header/ProfileSettings/avatar.jpg';

class PostForm extends Component {
  constructor(props) {
      super(props)
      this.state = {
          text: '',
          errors: {},
      }
  }

  onChange = (event) => {
    this.setState({text: event.target.value})
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onKeyDown = (event) => {
    if(event.keyCode === 13) {
      event.preventDefault();
      this.onSubmit(event);
    }
  }
  
  onSubmit = (event) => {
    event.preventDefault();
    let userData = {
      text: this.state.text,
      author: this.props.auth.user.name
    }
    this.props.addPost(userData);
    this.setState({ text: '' });
  }

  render() {

    const { errors } = this.state

    return (
        <div className="user-post">
            <span className="error-span">{errors.text}</span>
            <form onSubmit={this.onSubmit}>
                <div className="textarea-wrapper">
                  <img src={Avatar} alt="user avatar"/>
                  <textarea 
                    error={errors.text} 
                    onChange={this.onChange} 
                    onKeyDown={this.onKeyDown} 
                    value={this.state.text} 
                    type="text" 
                    name="Post" 
                    placeholder="What’s up, Patryk?" 
                    autoComplete="off" >
                  </textarea>
                </div>
                <div className="button-wrapper">
                  <input onSubmit={this.onSubmit} className="btn-inp" type="submit" value="Publish" />
                </div>
            </form>
        </div>
    )
  }
}

PostForm.propTypes = {
  auth: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  errors: state.error
});

export default connect(
  mapStateToProps,
  { addPost })(PostForm);