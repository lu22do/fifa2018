import React, { Component } from 'react';
import Countries from '../../lib/countries';
import { withTracker } from 'meteor/react-meteor-data';

class CountryList extends Component {
  renderCountry(country) {
    const src = '/img/' + country.replace(' ', '_') + '.png';

    return (
      <div>
        <img width="23" height="15" src={src} /> {country}
      </div>
    )
  }

  renderCountries() {
    return this.props.countries.map((country) => (
      <tr key={country._id}>
        <td>{this.renderCountry(country.name)}</td>
        <td>{country.score}</td>
      </tr>
    ));
  }

  render() {
    return (
      <div className="container">
        {this.props.countryCount ? (
          <div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {this.renderCountries()}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
          No countries found!
          </div>
       )}
      </div>
    )
  }
}

export default withTracker(props => {
  const countries = Countries.find({}).fetch();
  const countryCount = Countries.find({}).count();

  return {
    countries,
    countryCount
  };
})(CountryList);
