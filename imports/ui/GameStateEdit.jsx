import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import GameState from '../../lib/gameState';

class GameStateEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      state: this.props.gameState ? this.props.gameState.state : ''
    };

    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*
  handleSubmit(event) {
    event.preventDefault();

    GameState.update({_id: this.props.gameState._id},
                     {$set: {state: this.state.state}},
                     function(err, _id) {
                       if (err) {
                         alert('Unexpected error creating this match! (' + err + ')');
                       }
                     });

    return false;
  }
  */

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });

    if (name === 'state') {
      GameState.update({_id: this.props.gameState._id},
        {$set: {state: event.target.value}},
        function(err, _id) {
          if (err) {
            alert('Unexpected error creating this match! (' + err + ')');
          }
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && !nextProps.loaded) {
      this.setState({
        loaded: true,
        ...nextProps.gameState
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
      <div className="container">
        <form action="action" onSubmit={this.handleSubmit}>

          <div className="form-group">
            <label>State of the game:</label><br/>
            <div>
              <input type="radio" name="state" value="preparing"
                onChange={this.handleChange}
                checked={this.state.state === 'preparing'} /> Preparing - users can create selections
            </div>
            <div>
              <input type="radio" name="state" value="started"
                onChange={this.handleChange}
                checked={this.state.state === 'started'}/> Started - users cannot create selections
            </div>
          </div>
{/*
          <input className="btn btn-default" type="submit" value="Change"/>
*/}
        </form>
      </div>
    )
  }
}

export default withTracker(props => {
  const handle = Meteor.subscribe('game-state');
  const loading = !handle.ready();
  const gameState = GameState.find({}).fetch()[0];

  return {
    loading,
    gameState
  };
})(GameStateEdit);
