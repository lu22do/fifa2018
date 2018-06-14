import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

class TopBar extends Component {
  constructor(props) {
    super(props);
  }

  handleLogout(e) {
    e.preventDefault();
    let that = this;

    Meteor.logout(function() {
      that.props.history.push('/');
    })

    return false;
  }

  render() {
    const currentUser = this.props.currentUser;
    const isAdmin = currentUser && currentUser.username === 'admin';
    const isGamePreparing = this.props.gameState ? this.props.gameState.state === 'preparing' : false;
    const yourSelectionLink = currentUser ? "/selection-list/" + currentUser._id : '';

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

            <Link className="navbar-brand" to="/">The FIFA 2018 OTV Game</Link>
          </div>

          {currentUser &&
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">

                <li>
                  <NavLink to="/selection-list" exact activeClassName="active">
                    <span className="glyphicon glyphicon-list-alt"></span> All selections
                  </NavLink>
                </li>

                <li>
                  <NavLink to={yourSelectionLink} activeClassName="active">
                    <span className="glyphicon glyphicon-list-alt"></span> Your selections
                  </NavLink>
                </li>

                {isGamePreparing &&
                  <li>
                    <NavLink to="/new-selection" activeClassName="active">
                      <span className="glyphicon glyphicon-plus"></span> New selection
                    </NavLink>
                  </li>
                }

                <li>
                  <NavLink to="/team-list" activeClassName="active">
                    <span className="glyphicon glyphicon-list"></span> Team list
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/match-list" activeClassName="active">
                    <span className="glyphicon glyphicon-list"></span> Match list
                  </NavLink>
                </li>

                {isAdmin &&
                  <li>
                    <NavLink to="/new-match" activeClassName="active">
                      <span className="glyphicon glyphicon-plus"></span> Add match
                    </NavLink>
                  </li>
                }

                {isAdmin &&
                  <li>
                    <NavLink to="/users" activeClassName="active">
                      <span className="glyphicon glyphicon-user"></span> Users
                    </NavLink>
                  </li>
                }

                {isAdmin &&
                  <li>
                    <NavLink to="/admin" activeClassName="active">
                      <span className="glyphicon glyphicon-bell"></span> Admin
                    </NavLink>
                  </li>
                }
              </ul>

              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="" onClick={this.handleLogout.bind(this)}>
                    <span className="glyphicon glyphicon-log-out"></span> Logout ({currentUser.username})
                  </a>
                </li>
              </ul>
            </div>
          }
        </div>
      </nav>
    )
  }
}

export default withRouter(withTracker(props => {
  const gameState = GameState.find({}).fetch()[0];

  return {
    currentUser: Meteor.user(),
    gameState
  };
})(TopBar));
