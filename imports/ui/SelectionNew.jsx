import React, { Component } from 'react';
import Selections from '../../lib/selections';
import { withRouter } from 'react-router-dom'; // makes history available in props

import Groups from '../../lib/groups'

class SelectionNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    Groups.forEach((group) => {
      this.state[group.name] = group.teams[0];
    });

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let name = this.state.name;
    let teams = [];
    Groups.forEach((group) => {
      teams.push(this.state[group.name]);
    });
    let that = this;

    // limit selections to 3 per user
    if (Selections.find({owner: Meteor.userId()}).count() >= 3) {
      alert('Sorry, you cannot create more than 3 selections.')
      that.props.history.push('/selection-list');
      return;
    }

    if (!Selections.find({name}).count()) {
      Selections.insert({ name,
                          teams,
                          owner: Meteor.userId() },
        function(err, _id) {
          if (err) {
            alert('Unexpected error creating this selection! (' + err + ')');
          }
          else {
            that.props.history.push('/selection-list');
          }
        }
      );
    }
    else {
      alert('This selection already exists! Could not create it.')
      this.setState({
        name: '',
      });
    }
    return;
  }

  renderTeams(teams) {
    return teams.map((team) => (
      <option value={team}>{team}</option>
    ));
  }

  renderGroupSelectors() {
    return Groups.map((group) => {
      let value = this.state[group.name];

      return (
        <div className="form-group">
          <label>Select a team for {group.name}</label><br/>
          <select name={group.name} value={value} onChange={this.handleChange}>
            {this.renderTeams(group.teams)}
          </select>
        </div>
      )
    });
  }

  render() {
    return (
      <div className="container">
        <h3>Create a new selection:</h3>
        <form id="new-selection-form" action="action" onSubmit={this.handleSubmit}>

          <div className="form-group">
            <label>Selection name</label>
            <input className="form-control" type="text" name="name"
              value={this.state.name}
              onChange={this.handleChange} />
          </div>

          {this.renderGroupSelectors()}

          <input className="btn btn-default" type="submit" value="Create"/>

        </form>
      </div>
    )
  }
}

export default withRouter(SelectionNew);
