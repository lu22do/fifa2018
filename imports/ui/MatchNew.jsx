import React, { Component } from 'react';
import Matchs from '../../lib/matchs';
import { withRouter } from 'react-router-dom'; // makes history available in props

import MatchEntry from './MatchEntry.jsx'

class MatchNew extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let that = this;
    const team1 = this.matchEntry.state.team1;
    const team2 = this.matchEntry.state.team2;

    if (team1 === team2) {
      alert('Cannot have twice the same team!');
      return false;
    }

    if (!Matchs.find({team1: this.matchEntry.state.team1,
                      team2: this.matchEntry.state.team2}).count()) {
      Matchs.insert(this.matchEntry.state,
                    function(err, _id) {
                      if (err) {
                        alert('Unexpected error creating this match! (' + err + ')');
                      }
                      else {
                        that.props.history.push('/match-list');
                      }
                    });
    }
    else {
      alert('This match already exists! Could not create it.')
    }
    return false;
  }

  render() {
    return (
      <MatchEntry title="Create new match:" handleSubmit={this.handleSubmit}
        ref={(matchEntry) => {this.matchEntry = matchEntry}} submitTitle="Create" />
    );
  }
}

export default withRouter(MatchNew);
