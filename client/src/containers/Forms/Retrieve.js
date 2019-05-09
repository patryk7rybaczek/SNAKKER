import React, { Component } from 'react'
import "./style.css";
import Logo from "../../logo";

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { SendRetrieveLink } from '../../actions/authActions';
import classnames from 'classnames';

export class Retrieve extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      errors: {},
      success: false
    }
  }

  componentDidMount() {
    // If user is logged in redirect to main route
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
    if(nextProps.success) {
      this.setState({
        success: nextProps.success,
      })
    }
  }

  onChange = e => {
    this.setState({[e.target.id]: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();

    const email = {
      email: this.state.email
    };

    this.props.SendRetrieveLink(email)

  }

  render() {

    const { errors } = this.state
    const { success } = this.state

    return (
        <div className="SignInUpContainer"> 
            <div className="logo">
                <Logo /> 
            </div>
            <form className="SignInForm" noValidate onSubmit={this.onSubmit}>
                <h2 className="Heading-SignIn">Retrieve Account</h2>
                <p className="OfferLink">Enter email associated with your Snakker accound</p>
                <span className="error-span">{errors.email} {errors.emailnotfound}</span>
                <span className="success-span">{success.message}</span>
                <label>E-mail</label>
                <input 
                  id="email" 
                  name="email"
                  type="email"
                  error={errors.email} 
                  onChange={this.onChange} 
                  className={classnames('', {
                    invalid: errors.email || errors.emailnotfound,
                    valid: success.message
                  })}
                />
                <div className="FormFooter">
                    <button type="submit">Send Reset Instructions</button>
                </div>
            </form>
        </div>
    )
  }
}

Retrieve.propTypes = {
  SendRetrieveLink: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.error,
  success: state.success
});

export default connect(
  mapStateToProps, 
  { SendRetrieveLink }
)(withRouter(Retrieve));