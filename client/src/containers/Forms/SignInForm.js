import React, { Component } from "react";

import "./style.css";
import Logo from "../../logo";
import { Link } from "react-router-dom";

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  componentDidMount() {
    // Redirect user if authenticated try access login page
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      // Redirect user to main page after login
      this.props.history.push('/');
    }
    console.log(nextProps);

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({[e.target.id]: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();
    
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    // Since we handle the redirect within our component -
    // no need to pass this.props.history as parameter
    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;

    return (
        <div className="SignInUpContainer">
            <div className="logo">
                <Logo /> 
            </div>
            <form className="SignInForm" noValidate onSubmit={this.onSubmit}>
                <h2 className="Heading-SignIn">Welcome to snakker</h2>
                <p className="OfferLink">New to snakker? <a href="#">Check what we have to offer!</a></p>
                <label>E-mail</label>
                <span className="error-span">{errors.email} {errors.emailnotfound}</span>
                <input 
                  id="email"
                  name="email" 
                  type="email"
                  autoComplete="new-password"
                  error={errors.email}
                  value={this.state.email}
                  onChange={this.onChange}
                  className={classnames('', {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label>Password </label>   
                <span className="error-span">{errors.password} {errors.passwordincorrect}</span>
                <input 
                  id="password"
                  name="password" 
                  type="password"
                  autoComplete="new-password"
                  error={errors.password}
                  onChange={this.onChange}
                  value={this.state.password} 
                  className={classnames("MarginFree", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <Link className="ForgotPass" to="/retrieve">Forgot your password?</Link>
                <div className="FormFooter">
                    <button type="submit">Sign In</button>
                    <p className="SignUpLink">Don't Have an Account?<Link to="/register"> Sign Up!</Link></p>
                </div>
            </form>
        </div>
    );
  }
}

SignInForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
  auth: state.auth,
  errors: state.error
});

export default connect(
  mapStatetoProps,
  { loginUser }
)(SignInForm)