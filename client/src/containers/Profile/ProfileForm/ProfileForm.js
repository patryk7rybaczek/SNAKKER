import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { addPost } from '../../../actions/postActions';
import Avatar from '../../Header/ProfileSettings/avatar.jpg';

class ProfileForm extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

ProfileForm.propTypes = {
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
    { addPost })(ProfileForm);