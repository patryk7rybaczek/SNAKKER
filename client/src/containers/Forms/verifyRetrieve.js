import React, { Component } from 'react'
import "./style.css";
import Logo from "../../logo";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { resetPass } from '../../actions/authActions';
import classnames from 'classnames';

export class verifyRetrieve extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      errors: {},
      success: {}
    }
  }

  componentDidMount() {
    // Redirect user if authenticated try access login page
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
    if(nextProps.success) {
      this.setState({
        success: nextProps.success
      })
    }
  }

  onChange = e => {
    this.setState({[e.target.id]: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();

    let url =  window.location.href;
    let retrieveToken = url.substr(29);

    const userData = {
      password: this.state.password
    }

    this.props.resetPass(retrieveToken, userData);
  }

  render() {
    const { errors } = this.state;
    const { success } = this.state

    return (
        <div className="SignInUpContainer"> 
            <div className="logo">
                <Logo /> 
            </div>
            <form className="SignInForm" onSubmit={this.onSubmit}>
                <h2 className="Heading-SignIn">Retrieve Account</h2>
                <p className="OfferLink">Enter your new password</p>
                <label>Password</label>
                <span className="success-span">{success.message}</span>
                <span className="error-span">{errors.password} {errors.passwordincorrect}</span>
                <input 
                  id="password"
                  name="password" 
                  type="password"
                  error={errors.password} 
                  onChange={this.onChange}
                  className={classnames('', {
                    invalid: errors.password || errors.passwordincorrect,
                    valid: success.message
                  })}
                />
                <div className="FormFooter">
                    <button>Change Password</button>
                </div>
            </form>
        </div>
    )
  }
}

verifyRetrieve.propTypes = {
    resetPass: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.error,
    success: state.success
});

export default connect(mapStateToProps, { resetPass })(withRouter(verifyRetrieve));
