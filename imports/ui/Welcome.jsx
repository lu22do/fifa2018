import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

class Welcome extends Component {

  sendVerificationEmail(e) {
    e.preventDefault();
    Meteor.call( 'sendVerificationLink', (err) => {
      if (err) {
        alert('sendVerificationLink error (' + err + ')');
      }
      else {
        alert('Email resent!');
      }
    });
  }

  render() {
    const currentUser = this.props.currentUser;
    const showAlert = currentUser ? (currentUser.emails? !currentUser.emails[0].verified : false) : false;

    return (
      <div className="container">
        {showAlert &&
          <p className="alert alert-warning">
            You should verify your email address before using this app.<br/>
            Please check your spam folder as it is likely to be there.<br/>
            If needed: <a href="" className="resend-verification-link" onClick={this.sendVerificationEmail}>resend a verification link</a>.
          </p>
        }

        <h3>Welcome to the 2018 FIFA Game made by the OpenTV-forevers!</h3>
        <br/>
        <p>WARNING: This is work in progress and should be used only for testing!</p>
        <br/>
        <h4>Rules</h4>
        <p>
        -	Pick 1 team from each group by clicking on <Link to="/new-selection">New Selection</Link> . Groups were created following the FIFA ranking before the WC2018<br/>
        -	You can have similar combination of teams in your selection compared to others but you cannot have the exact set if someone else has it already. So, available selections are first-come-first-serve for a selection.<br/>
        -	Each player can make 3 selections such as LudoSet1, LudoSet2, Ludoset3.<br/>
        -	How you get points:<br/>
        &nbsp;&nbsp;o	Your teams will keep gaining points for you as long as they keep playing (not eliminated). Wins, draws and goals get you points.<br/>
        &nbsp;&nbsp;o	Each win gains your selection 3 points, each draw 1 point, each goal scored gains additional Y points (Y = 0.3 during group stage, 0.5 during elimination phase)<br/>
        &nbsp;&nbsp;o	Penalty kicks are not accounted. Only the winner (3 points) and goals during regulation time from each side are counted for points<br/>
        - After the competition kicks off, it is not possible to create/delete/replace a selection. Your selections can be done until June 13th, just before the opening game of FIFA 2018 <br/>
        -	The player with most total points win. In case of a tie, all those folks win.<br/>
        </p>
      </div>
    )
  }
}

export default withTracker(props => {
  return {
    currentUser: Meteor.user()
    //currentUser: {emails:[{verified: false}]}
  };
})(Welcome);
