import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import TeamList from '../../lib/teamList';

import DatePicker from 'react-datetime';

// Updates itself with the 2 possible teams
class WinnerSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: this.props.winner,
      team1goals: this.props.team1goals,
      team2goals: this.props.team2goals,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    if (name == 'team1goals' || name == 'team2goals') {
      if (!/^\d+$/.test(value) && value != '') {
        return;
      }
    }

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
        <div className="form-inline">
          <input type="radio" name="winner" value={this.props.team1}
            onChange={this.handleChange}
            checked={this.state.winner === this.props.team1} /> {this.props.team1}

          <p className="form-control-static">
            &nbsp;- Goal scored: &nbsp;
          </p>
          <input className="form-control input-sm" type="text" name="team1goals" size="3"
            value={this.state.team1goals}
            onChange={this.handleChange} />
        </div>

        <div className="form-inline">
          <input type="radio" name="winner" value={this.props.team2}
            onChange={this.handleChange}
            checked={this.state.winner === this.props.team2}/> {this.props.team2}

          <p className="form-control-static">
            &nbsp;- Goal scored: &nbsp;
          </p>
          <input className="form-control input-sm" type="text" name="team2goals" size="3"
            value={this.state.team2goals}
            onChange={this.handleChange} />
        </div>

        <div style={{paddingTop: 7}}>
          <input type="radio" name="winner" value="Draw"
            onChange={this.handleChange} checked={this.state.winner === "Draw"}/> Draw
        </div>

        <div style={{paddingTop: 7}}>
          <input type="radio" name="winner" value="Upcoming Game"
            onChange={this.handleChange} checked={this.state.winner === "Upcoming Game"}/> Upcoming Game
        </div>
      </div>
    );
  }
}

export default class MatchEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      team1: this.props.match ? this.props.match.team1 : TeamList[0],
      team2: this.props.match ? this.props.match.team2 : TeamList[0],
      date: this.props.match ?
            (this.props.match.date ? moment(this.props.match.date) : '') : '',
      phase: this.props.match ? this.props.match.phase : 'group',
      winner: this.props.match ? this.props.match.winner : TeamList[0],
      team1goals: this.props.match ? this.props.match.team1goals : 0,
      team2goals: this.props.match ? this.props.match.team2goals : 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let that = this;

    if (this.state.team1 === this.state.team2) {
      alert('Cannot have twice the same team!');
      return;
    }

    if (this.state.winner !== this.state.team1 &&
        this.state.winner !== this.state.team2 &&
        this.state.winner !== 'Draw' &&
        this.state.winner !== 'Upcoming Game') {
      alert('Winner needs to be set!');
      return;
    }

    let match = Object.assign({}, this.state); // clone object
    if (match.date) {
      match.date = match.date.toDate(); // convert Moment -> regular Date
    }

    this.props.handleSubmit(match); // pass to parent
  }

  handleDateChange(moment) {
    this.setState({
      date: moment
    });
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
      <option value={team} key={team}>{team}</option>
    ));
  }

  render() {
    const hasCancelButton = this.props.hasCancelButton;

    return (
      <div className="container">
        <h3>{this.props.title}</h3>
        <form action="action" onSubmit={this.handleSubmit}>

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
            <DatePicker timeFormat={false} name="date" value={this.state.date}
              onChange={this.handleDateChange} closeOnSelect={true}
              inputProps={{ placeholder: 'MM/DD/YYYY' }}/>
          </div>

          <div className="form-group">
            <label>Phase</label>

            <div className="radio" style={{marginTop: 0}}>
              <label>
                <input type="radio" name="phase" value="group"
                  onChange={this.handleChange}
                  checked={this.state.phase === "group"} /> Group phase
              </label>
            </div>

            <div className="radio">
              <label>
                <input type="radio" name="phase" value="elimination"
                  onChange={this.handleChange}
                  checked={this.state.phase === "elimination"}/> Elimination phase
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Winning team</label><br/>
            <WinnerSelect ref={(winnerSelect) => {this.winnerSelect = winnerSelect}}
              handleChange={this.handleChange}
              team1={this.state.team1}
              team2={this.state.team2}
              team1goals={this.state.team1goals}
              team2goals={this.state.team2goals}
              winner={this.state.winner} />
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
