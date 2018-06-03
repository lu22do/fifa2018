import React, { Component } from 'react';

export default class VerifyEmail extends Component {

  componentDidMount() {
    var token = this.props.match.params.token;

    Accounts.verifyEmail(token, (error) => {
      if (error) {
        alert(error);
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="alert alert-success" role="alert">
          Thanks, your email is now verified!
        </div>
      </div>
    )
  }
}
