import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'; // makes history available in props

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userName: '',
      password: '',
      emailError: false,
      userNameError: false,
      passwordError: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  handleFocus(event) {
    // Clear the error state of the input that gets the focus
    const name = event.target.name + 'Error';

    if (this.state[name]) {
      this.setState({
        [name]: false
      });
    }
  }

  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  handleSubmit(event) {
    event.preventDefault();

    let email = this.state.email;
    let userName = this.state.userName;
    let password = this.state.password;
    let that = this;

    if (!this.validateEmail(email)) {
      this.setState({
        emailError: true
      });
      return false;
    }

    if (userName.length < 4) {
      this.setState({
        userNameError: true
      });
      return false;
    }

    if (password.length < 4) {
      this.setState({
        passwordError: true
      });
      return false;
    }

    Accounts.createUser({email, username: userName, password}, function(err){
      if (err) {
        alert('Registration error (' + err + ')');
      }
      else {
        Meteor.call( 'sendVerificationLink', (err, resp) => {
          if (err) {
            alert('sendVerificationLink error (' + err + ')');
          } else {
            Meteor.loginWithPassword(userName, password, function(err){
              if (err) {
                alert('Login error (' + err + ')');
              }
              else {
                that.props.history.push('/');
              }
            });
          }
        });
      }
    });
    return false;
  }

  render() {
    const emailClass = 'form-group ' + (this.state.emailError? 'has-error': '');
    const emailErrorTextClass = this.state.emailError? 'showErrorMessage' : 'hideErrorMessage';
    const userNameClass = 'form-group ' + (this.state.userNameError? 'has-error': '');
    const userNameErrorTextClass = this.state.userNameError? 'showErrorMessage' : 'hideErrorMessage';
    const passwordClass = 'form-group ' + (this.state.passwordError? 'has-error': '');
    const passwordErrorTextClass = this.state.passwordError? 'showErrorMessage' : 'hideErrorMessage';

    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">Create new account</div>
          <div className="panel-body">
            <form id="register-form" action="action" onSubmit={this.handleSubmit}>

                <div className={emailClass}>
                  <label>Email address</label>
                  <input className="form-control" type="text" name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    onFocus={this.handleFocus} />
                  <span className={emailErrorTextClass}>Please provide a valid email address.</span>
                </div>

                <div className={userNameClass}>
                  <label>User name</label>
                  <input className="form-control" type="text" name="userName" maxLength="40"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    onFocus={this.handleFocus} />
                  <span className={userNameErrorTextClass}>Your user name should have at least 4 characters.</span>
                </div>

                <div className={passwordClass}>
                  <label>Password</label>
                  <input className="form-control" type="password" name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    onFocus={this.handleFocus} />
                  <span className={passwordErrorTextClass}>Your password should have at least 4 characters.</span>
                </div>

                <input className="btn btn-default" type="submit" value="Register"/>

            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Register);
