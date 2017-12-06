import React, { Component } from 'react';
import Teams from '../../lib/teams';
import { withTracker } from 'meteor/react-meteor-data';

class TeamList extends Component {
  renderTeam(team) {
    const src = '/img/' + team.replace(' ', '_') + '.png';

    return (
      <div>
        <img width="23" height="15" src={src} /> {team}
      </div>
    )
  }

  renderTeams() {
    return this.props.teams.map((team) => (
      <tr key={team._id}>
        <td>{this.renderTeam(team.name)}</td>
        <td>{team.score}</td>
      </tr>
    ));
  }

  render() {
    return (
      <div className="container">
        {this.props.teamCount ? (
          <div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {this.renderTeams()}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
          No teams found!
          </div>
       )}
      </div>
    )
  }
}

export default withTracker(props => {
  const teams = Teams.find({}, {sort: {score: -1}}).fetch();
  const teamCount = Teams.find({}).count();

  return {
    teams,
    teamCount
  };
})(TeamList);
