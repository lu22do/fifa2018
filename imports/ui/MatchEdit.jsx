import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';

import Matchs from '../../lib/matchs';
import MatchEntry from './MatchEntry.jsx'

class MatchEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let that = this;

    if (this.matchEntry.state.country1 === this.matchEntry.state.country2) {
      alert('Cannot have twice the same country!');
      return;
    }

    Matchs.update(this.props.match._id,
                  {$set: this.matchEntry.state},
                  function(err, _id) {
                    if (err) {
                      alert('Unexpected error updating this match (' + err + ')!')
                    }
                    else {
                      that.props.history.push('/match-list');
                    }
                  });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && !nextProps.loaded) {
      this.setState({
        loaded: true,
        ...nextProps.match
      });
    }
  }

  render() {
    if (this.props.loading) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    return (
      <MatchEntry title="Edit a match:" match={this.props.match} handleSubmit={this.handleSubmit}
        ref={(matchEntry) => {this.matchEntry = matchEntry}} submitTitle="Update" hasCancelButton />
    );
  }
}

export default withRouter(withTracker(props => {
  const handle = Meteor.subscribe('matchs');
  const loading = !handle.ready();
  const match = Matchs.findOne(props.match.params.id);

  return {
    loading,
    match
  };
})(MatchEdit));
