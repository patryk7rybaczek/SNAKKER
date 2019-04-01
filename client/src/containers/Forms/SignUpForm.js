import React, { Component } from "react";

import "./style.css";
import Logo from "../../logo";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { registerUser } from '../../actions/authActions';

export class SignUpForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      errors: {}
    }
  }

  componentDidMount() {
    // If user is logged in redirect to main route
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  onChange = e => {
    this.setState({[e.target.id]: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
       name: this.state.name,
       email: this.state.email,
       password: this.state.password
    };
    console.log(this.props)

    this.props.registerUser(newUser, this.props.history);
  }



  render() {
    const { errors } = this.state

    return (
        <div className="SignInUpContainer">
            <div className="logo">
                <Logo /> 
            </div>
            <form className="SignUpForm" noValidate onSubmit={this.onSubmit}>
                <h2 className="Heading">Create Account</h2>
                <label>E-mail</label>
                <span className="error-span">{errors.email}</span>
                <input 
                    id="email"
                    name="email" 
                    type="email"
                    error={errors.email}
                    onChange={this.onChange}
                    value={this.state.email}
                    className={classnames('', {
                      invalid: errors.email
                    })}
                />
                <label>Username</label>
                <span className="error-span">{errors.name}</span>
                <input 
                    id="name"
                    name="name" 
                    type="text"
                    error={errors.name}
                    onChange={this.onChange}
                    value={this.state.name}
                    className={classnames('', {
                      invalid: errors.name
                    })}
                />
                <label>Password </label>   
                <span className="error-span">{errors.password}</span>
                <input 
                    id="password"
                    name="password" 
                    type="password"
                    error={errors.password}
                    onChange={this.onChange}
                    value={this.state.password}
                    className={classnames('', {
                      invalid: errors.password
                    })}
                />
                <div className="FormFooter">
                    <button className="SignUpButton" type="submit">Sign Up</button>
                    <Link to="/login">Already have a account ?</Link>
                </div>
            </form>
        </div>
    );
  }
}

SignUpForm.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.error
})

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(SignUpForm));