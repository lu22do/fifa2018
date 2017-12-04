import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import CountryList from '../../lib/countryList';

// Updates itself with the 2 possible countries
class WinnerSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: this.props.country1
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
    return (
      <select name="winner" value={this.state.winner} onChange={this.handleChange}>
        <option value={this.props.country1}>{this.props.country1}</option>
        <option value={this.props.country2}>{this.props.country2}</option>
      </select>
    );
  }
}

export default class MatchEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      country1: this.props.match ? this.props.match.country1 : CountryList[0],
      country2: this.props.match ? this.props.match.country2 : CountryList[0],
      date: this.props.match ? this.props.match.date : '',
      score: this.props.match ? this.props.match.score : '',
      winner: this.props.match ? this.props.match.country1 : CountryList[0],
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

  renderCountryList() {
    return CountryList.map((country) => (
      <option value={country}>{country}</option>
    ));
  }

  render() {
    const hasCancelButton = this.props.hasCancelButton;

    return (
      <div className="container">
        <h3>{this.props.title}</h3>
        <form action="action" onSubmit={this.props.handleSubmit}>

          <div className="form-group">
            <label>First country</label><br/>
            <select name="country1" value={this.state.country1} onChange={this.handleChange}>
              {this.renderCountryList()}
            </select>
          </div>

          <div className="form-group">
            <label>Second country</label><br/>
            <select name="country2" value={this.state.country2} onChange={this.handleChange}>
              {this.renderCountryList()}
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
            <label>Winning country</label><br/>
            <WinnerSelect ref={(winnerSelect) => {this.winnerSelect = winnerSelect}}
              handleChange={this.handleChange}
              country1={this.state.country1}
              country2={this.state.country2} />
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
