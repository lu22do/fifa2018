import React, { Component } from 'react';
import Teams from '../../lib/globals';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

class TeamList extends Component {
  deleteTeam(e) {
    e.preventDefault();
    let id = e.target.getAttribute('data-id');
    Teams.remove(id, function(err) {
      if (err) {
        alert('Could not delete');
      }
    });
  }

  renderTeams() {
    return this.props.teams().map((team) => (
      <tr key={team.id}>
        <td>{team.name}</td>
        <td>{team.attribute}</td>
        <td>{team.ownername}</td>
        <td>{team.created}</td>
        <td>
          {team.isMyTeam &&
            <div>
              <Link to={`/edit-team/${team.id}`}>Edit</Link> /&nbsp;
              <a onClick={this.deleteTeam} data-id={team.id} href="">Delete</a>
            </div>
          }
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <div className="container">
        {this.props.teamCount ? (
          <div>
            <h1>Teams:</h1>
            <table className="table table-striped">
              <thead>
              <tr>
                <th>Name</th>
                <th>Attribute</th>
                <th>Owner</th>
                <th>Creation date</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
                {this.renderTeams()}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
          No teams found. Select 'New team' to create one.
          </div>
       )}
      </div>
    )
  }
}

export default withTracker(props => {
  const teams = function() {
    return Teams.find({}).map(function(team) {
      var user = Meteor.users.findOne(team.owner);

      var isMyTeam = false;
      if (Meteor.userId() === team.owner ||
          (Meteor.user() && Meteor.user().username === 'admin')) {
        isMyTeam = true;
      }

      return {name: team.name,
              attribute: team.attribute,
              created: moment(team.created).calendar(),
              id: team._id,
              ownername: user ? user.username : "unknown",
              isMyTeam: isMyTeam};
    });
  };
  const teamCount = Teams.find({}).count();

  return {
    teams,
    teamCount
  };
})(TeamList);
