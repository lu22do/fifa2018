import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

class CountDownClock extends Component {
  constructor(props) {
    super(props);
    this.state = this.getTime();
  }

  getTime() {
    //return moment(this.props.targetDate.getTime() - (new Date()).getTime()).calendar();
    let cd = countdown(this.props.targetDate);
    return {displayFlag: cd.value < 0 ? true : false,
            diff: cd.toString()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState(this.getTime());
  }

  render() {
    return (
      <div>
        {this.state.displayFlag &&
          <div className="alert alert-info">
           {this.props.text}: {this.state.diff}
          </div>
        }
      </div>
    );
  }
}

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
    const targetDate = new Date(Date.UTC(2018, 5, 14, 15, 0, 0, 0));    // 14 Jun 2018 - 15:00 UTC

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

        {/*
          <p className="alert alert-danger">Note: This is still in beta testing!</p>
        */}

        <CountDownClock text="Countdown before first match" targetDate={targetDate}/>

        <br/>

        <h4>Goal</h4>
        <p>
        The goal of the game is to get your team selections accumulate the
        highest number of points by the end of the FIFA 2018 Worldcup.
        </p>

        <br/>

        <h4>Rules</h4>
        <ul>
          <li>To create a selection, pick 1 team from each group by
          clicking on <Link to="/new-selection">New Selection</Link>.
          Groups were created following the FIFA ranking before the WC2018</li>
          <li>Each player can create up to 3 selections.</li>
          <li>How you get points:</li>
          <ul>
            <li>Your teams will keep gaining points for you as long as they keep
            playing (not eliminated). Wins, draws and goals get you points.</li>
            <li>Each win gains your selection 3 points, each draw 1 point, each
            goal scored gains additional Y points (Y = 0.3 during group stage,
            0.5 during elimination phase)</li>
            <li>Penalty kicks are not accounted. Only the winner (3 points) and goals during regulation time from each side are counted for points</li>
          </ul>
          <li>After the competition kicks off, it is not possible to create/delete/replace a selection. Your selections can be done until June 14th 15:00 UTC, just before the opening game of FIFA 2018</li>
          <li>The player with most total points win. In case of a tie, all those folks win.</li>
        </ul>
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
