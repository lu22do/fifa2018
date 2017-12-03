import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';
import Teams from '../../lib/globals';

class EditTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      name: this.props.team ? this.props.team.name : '',
      attribute: this.props.team ? this.props.team.attribute : ''
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

    Teams.update(this.props.team._id,
                  {$set: {name: name,
                          attribute: attribute}}, function(err, _id) {
      if (err) {
        alert('Unexpected error updating this team (' + err + ')!')
      }
      else {
        that.props.history.push('/team-list');
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && !nextProps.loaded) {
      this.setState({
        loaded: true,
        name: nextProps.team.name,
        attribute: nextProps.team.attribute
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
        <h3>Update this team:</h3>
        <form id="edit-team-form" action="action" onSubmit={this.handleSubmit}>

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

            <input className="btn btn-default" type="submit" value="Update"/>&nbsp;
            <Link className="btn btn-default" to="/team-list">Cancel</Link>
        </form>
      </div>
    );
  }
}

export default withRouter(withTracker(props => {
  const handle = Meteor.subscribe('teams');
  const loading = !handle.ready();
  const team = Teams.findOne(props.match.params.id);

  return {
    loading,
    team
  };
})(EditTeam));
