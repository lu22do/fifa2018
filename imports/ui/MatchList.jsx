import React, { Component } from 'react';
import Matchs from '../../lib/matchs';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

class MatchList extends Component {
  deleteMatch(e) {
    e.preventDefault();
    let id = e.target.getAttribute('data-id');
    Matchs.remove(id, function(err) {
      if (err) {
        alert('Could not delete');
      }
    });
  }

  renderTeam(team) {
    const src = '/img/' + team.replace(' ', '_') + '.png';

    return (
      <div>
        <img width="23" height="15" src={src} /> {team}
      </div>
    )
  }

  renderMatchs() {
    return this.props.matchs.map((match) => (
      <tr key={match.id}>
        <td>{this.renderTeam(match.team1)}</td>
        <td>{this.renderTeam(match.team2)}</td>
        <td>{match.date}</td>
        <td>{match.phase}</td>
        <td>{match.team1goals}-{match.team2goals}</td>
        <td>{this.renderTeam(match.winner)}</td>
        <td>{match.created}</td>
        {this.props.admin &&
          <td>
            <div>
              <Link to={`/edit-match/${match._id}`}>Edit</Link> /&nbsp;
              <a onClick={this.deleteMatch} data-id={match._id} href="">Delete</a>
            </div>
          </td>
        }
      </tr>
    ));
  }

  render() {
    return (
      <div className="container">
        {this.props.matchCount ? (
          <div>
            <table className="table table-striped">
              <thead>
              <tr>
                <th>First team</th>
                <th>Second team</th>
                <th>Match date</th>
                <th>Phase</th>
                <th>Score</th>
                <th>Winner</th>
                <th>Creation date</th>
                {this.props.admin &&
                  <th>Action</th>
                }
              </tr>
              </thead>
              <tbody>
                {this.renderMatchs()}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
          No matchs found
          </div>
       )}
      </div>
    )
  }
}

export default withTracker(props => {
  const matchs = Matchs.find({}).map(function(match) {
    match.created = moment(match.created).calendar();
    return match;
  });
  const matchCount = Matchs.find({}).count();

  return {
    admin: Meteor.user() && Meteor.user().username === 'admin',
    matchs,
    matchCount
  };
})(MatchList);
