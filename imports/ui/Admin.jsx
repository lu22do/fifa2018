import React, { Component } from 'react';
import GameStateEdit from './GameStateEdit.jsx';
import EditorialNew from './EditorialNew.jsx';

export default class Admin extends Component {
  sendTestEmail(e) {
    e.preventDefault();
    Meteor.call( 'sendTestEmail', (err) => {
      if (err) {
        alert('sendTestEmail error (' + err + ')');
      }
    });
  }

  getEmailDistributionList(e) {
    e.preventDefault();
    Meteor.call( 'getEmailDistributionList', (err,res) => {
      if (err) {
        alert('getEmailDistributionList error (' + err + ')');
      }
      else {
        console.log(res);
        alert('getEmailDistributionList success - see console');
      }
    });
  }

  render() {
    return (
      <div className="container">
        <h3>Game State</h3>
        <GameStateEdit />

        <h3>New editorial</h3>
        <p className="alert alert-danger">
        Note: this will cause an email with ranking to be sent to everyone!
        </p>
        <EditorialNew />

        <h3>Test</h3>
        <div>
          <a className="btn btn-default" onClick={this.sendTestEmail} href="">
          Send test email to test account
          </a>
        </div>

        <br/><br/>
        <div>
          <a className="btn btn-default" onClick={this.getEmailDistributionList} href="">
          Get full email distribution list
          </a>
        </div>

      </div>
    )
  }
}
