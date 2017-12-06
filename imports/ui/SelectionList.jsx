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

  renderCountries(countries) {
    return countries.map((country) => {
      const src = '/img/' + country.replace(' ', '_') + '.png';

      return (
        <div>
          <img width="23" height="15" src={src} /> {country}
        </div>
      )
    });
  }

  renderSelections() {
    return this.props.selections().map((selection) => (
      <tr key={selection.id}>
        <td>{selection.name}</td>
        <td>{this.renderCountries(selection.countries)}</td>
        <td>{selection.ownername}</td>
        <td>{selection.created}</td>
        <td>
          {selection.isMySelection &&
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
            <h1>Selections:</h1>
            <table className="table table-striped">
              <thead>
              <tr>
                <th>Name</th>
                <th>Countries</th>
                <th>Owner</th>
                <th>Creation date</th>
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
  const selections = function() {
    return Selections.find({}).map(function(selection) {
      var user = Meteor.users.findOne(selection.owner);

      var isMySelection = false;
      if (Meteor.userId() === selection.owner ||
          (Meteor.user() && Meteor.user().username === 'admin')) {
        isMySelection = true;
      }

      return {name: selection.name,
              countries: selection.countries,
              created: moment(selection.created).calendar(),
              id: selection._id,
              ownername: user ? user.username : "unknown",
              isMySelection: isMySelection};
    });
  };
  const selectionCount = Selections.find({}).count();

  return {
    selections,
    selectionCount
  };
})(SelectionList);
