import React, { Component } from 'react';
import Teams from '../../lib/globals';
import { withRouter } from 'react-router-dom'; // makes history available in props

class NewTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      attribute: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let name = this.state.name;
    let attribute = this.state.attribute;
    let that = this;

    if (!Teams.find({name}).count()) {
      Teams.insert(
        { name,
          attribute,
          owner: Meteor.userId() },
        function(err, _id) {
          if (err) {
            alert('Unexpected error creating this team! (' + err + ')');
            that.props.history.push('/');
          }
          else {
            that.props.history.push('/team-list');
          }
        }
      );
    }
    else {
      alert('This team already exists! Could not create it.')
      this.setState({
        name: '',
        attribute: ''
      });
    }
    return false;
  }

  render() {
    return (
      <div className="container">
        <h3>Create new team:</h3>
        <form id="new-team-form" action="action" onSubmit={this.handleSubmit}>

          <div className="form-group">
            <label>Team name</label>
            <input className="form-control" type="text" name="name"
              value={this.state.name}
              onChange={this.handleInputChange} />
          </div>

          <div className="form-group">
            <label>Team attribute</label>
            <input className="form-control" type="text" name="attribute"
              value={this.state.attribute}
              onChange={this.handleInputChange} />
          </div>

          <input className="btn btn-default" type="submit" value="Create"/>

        </form>
      </div>
    )
  }
}

export default withRouter(NewTeam);
