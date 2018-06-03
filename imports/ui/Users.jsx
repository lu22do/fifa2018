import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

class Users extends Component {
  handleDelete(e) {
    e.preventDefault();
    let id = e.target.getAttribute('data-id');
    Meteor.users.remove({_id: id}, function(err) {
      if (err) {
        alert('Could not delete');
      }
    });
  }

  sendTestEmail(e) {
    e.preventDefault();
    Meteor.call( 'sendTestEmail', (error) => {
      if (error) {
        alert('sendTestEmail error (' + err + ')');
      }
    });
  }

  renderUsers() {
    return this.props.users.map((user) => (
      <tr key={user._id}>
        <td>{user.username}</td>
        <td>{user.emails && user.emails[0].address}</td>
        <td>{user.emails && user.emails[0].verified ? 'Yes' : 'No'}</td>
        <td>
          {user.username != 'admin' && Meteor.user().username == 'admin' &&
            <a onClick={this.handleDelete.bind(this)} data-id={user._id} href="">Delete Account</a>
          }
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <div className="container">
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>User name</th>
                <th>Email address</th>
                <th>Email verified</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.renderUsers()}
            </tbody>
          </table>
        </div>
        <br/><br/>
        <div>
          <a className="btn btn-default" onClick={this.sendTestEmail} href="">Send test email</a>
        </div>
      </div>
    )
  }
}

export default withTracker(props => {
  return {
    users: Meteor.users.find({username: {$not: {$eq: 'admin'}}}).fetch()
  };
})(Users);
