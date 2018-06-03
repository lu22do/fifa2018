import React, { Component } from 'react';
import Selections from '../../lib/selections';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

class SelectionList extends Component {
  deleteSelection(e) {
    e.preventDefault();
    let id = e.target.getAttribute('data-id');
    Selections.remove(id, function(err) {
      if (err) {
        alert('Could not delete');
      }
    });
  }

  renderTeams(teams) {
    return teams.map((team) => {
      const src = '/img/' + team.replace(' ', '_') + '.png';

      if (this.props.compactLayout) {
        return (
          <img width="23" height="15" src={src} style={{marginRight: 8}}
            data-toggle="tooltip" data-placement="top" title={team} />
        )
      }
      else {
        let score = 0;
        this.props.teams.some((_team) => {
          if (_team.name === team) {
            score = _team.score;
            return true;
          }
          else {
            return false;
          }
        });
        return (
          <div>
            <img width="23" height="15" src={src} /> {team} ({score})
          </div>
        )
      }
    });
  }

  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  componentDidUpdate() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  renderSelections() {
    const isGamePreparing = this.props.gameState ? this.props.gameState.state === 'preparing' : false;

    return this.props.selections.map((selection) => (
      <tr key={selection.id}>
        <td>{selection.rank}</td>
        <td>{selection.name}</td>
        <td>{this.renderTeams(selection.teams)}</td>
        <td>{selection.ownername}</td>
        <td>{selection.created}</td>
        <td>{selection.score}</td>
        <td>
          {isGamePreparing && selection.isMySelection &&
            <div>
              <a onClick={this.deleteSelection} data-id={selection.id} href="">Delete</a>
            </div>
          }
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <div className="container">
        {this.props.selectionCount ? (
          <div>
            <table className="table table-striped">
              <thead>
              <tr>
                <th>Ranking</th>
                <th>Name</th>
                <th>Teams</th>
                <th>Owner</th>
                <th>Creation date</th>
                <th>Score</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
                {this.renderSelections()}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
          No selections found. Select 'New selection' to create one.
          </div>
       )}
      </div>
    )
  }
}

export default withTracker(props => {
  const gameState = GameState.findOne({});
  let query = {};
  if (props.match.params.id) {
    query = {owner: props.match.params.id};
  }

  let counter = 1;
  let ranking = 1;
  let prevScore = -1;

  const selections = Selections.find(query, {sort:{score: -1, created: 1}}).map(selection => {
    const user = Meteor.users.findOne(selection.owner);
    let isMySelection = false;

    if (Meteor.userId() === selection.owner ||
        (Meteor.user() && Meteor.user().username === 'admin')) {
      isMySelection = true;
    }
    if (selection.score != prevScore) {
      counter = ranking;
    }
    prevScore = selection.score;
    ranking++;

    return {rank: counter,
            name: selection.name,
            teams: selection.teams,
            score: selection.score,
            created: moment(selection.created).calendar(),
            id: selection._id,
            ownername: user ? user.username : "unknown",
            isMySelection: isMySelection};
  });
  const selectionCount = Selections.find({}).count();
  const teams = Teams.find({}).fetch();

  return {
    selections,
    selectionCount,
    teams,
    compactLayout: props.match.params.id? false : true,
    gameState
  };
})(SelectionList);
