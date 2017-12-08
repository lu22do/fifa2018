import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import TeamList from '../../lib/teamList';

// Updates itself with the 2 possible teams
class WinnerSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: this.props.team1
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });

    this.props.handleChange(event); // pass to parent
  }

  render() {
    /*
    <select name="winner" value={this.state.winner} onChange={this.handleChange}>
      <option value={this.props.team1}>{this.props.team1}</option>
      <option value={this.props.team2}>{this.props.team2}</option>
    </select>
    */

    return (
      <div>
        <div>
          <input type="radio" name="winner" value={this.props.team1}
            onChange={this.handleChange}
            checked={this.state.winner === this.props.team1} /> {this.props.team1}
        </div>
        <div>
          <input type="radio" name="winner" value={this.props.team2}
            onChange={this.handleChange}
            checked={this.state.winner === this.props.team2}/> {this.props.team2}
        </div>
        <div>
          <input type="radio" name="winner" value="Draw"
            onChange={this.handleChange} checked={this.state.winner === "Draw"}/> Draw
        </div>
      </div>
    );
  }
}

export default class MatchEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      team1: this.props.match ? this.props.match.team1 : TeamList[0],
      team2: this.props.match ? this.props.match.team2 : TeamList[0],
      date: this.props.match ? this.props.match.date : '',
      score: this.props.match ? this.props.match.score : '',
      winner: this.props.match ? this.props.match.team1 : TeamList[0],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  renderTeamList() {
    return TeamList.sort().map((team) => (
      <option value={team}>{team}</option>
    ));
  }

  render() {
    const hasCancelButton = this.props.hasCancelButton;

    return (
      <div className="container">
        <h3>{this.props.title}</h3>
        <form action="action" onSubmit={this.props.handleSubmit}>

          <div className="form-group">
            <label>First team</label><br/>
            <select name="team1" value={this.state.team1} onChange={this.handleChange}>
              {this.renderTeamList()}
            </select>
          </div>

          <div className="form-group">
            <label>Second team</label><br/>
            <select name="team2" value={this.state.team2} onChange={this.handleChange}>
              {this.renderTeamList()}
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input className="form-control" type="text" name="date"
              value={this.state.date}
              onChange={this.handleChange} />
          </div>

          <div className="form-group">
            <label>Score</label>
            <input className="form-control" type="text" name="score"
              value={this.state.score}
              onChange={this.handleChange} />
          </div>

          <div className="form-group">
            <label>Winning team</label><br/>
            <WinnerSelect ref={(winnerSelect) => {this.winnerSelect = winnerSelect}}
              handleChange={this.handleChange}
              team1={this.state.team1}
              team2={this.state.team2} />
          </div>

          <input className="btn btn-default" type="submit" value={this.props.submitTitle}/>&nbsp;
          {hasCancelButton &&
            <Link className="btn btn-default" to="/match-list">Cancel</Link>
          }
        </form>
      </div>
    )
  }
}
