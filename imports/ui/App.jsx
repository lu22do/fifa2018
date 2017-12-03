import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';

import TopBar from './TopBar.jsx';
import TeamList from './TeamList.jsx';
import NewTeam from './NewTeam.jsx';
import EditTeam from './EditTeam.jsx';
import Users from './Users.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

const Welcome = () => (
  <div className="container">
    <h3>Welcome to the 2018 FIFA Game made by the OpenTV-forevers!</h3>
    <p>You can create up to 3 teams selecting a team from each groups.</p>
  </div>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Meteor.userId() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <TopBar location={this.location}/>

          <PrivateRoute exact path='/' component={Welcome}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <PrivateRoute path='/team-list' component={TeamList}/>
          <PrivateRoute path='/new-team' component={NewTeam}/>
          <PrivateRoute path='/edit-team/:id' component={EditTeam}/>
          <PrivateRoute path='/users' component={Users}/>
        </div>
      </BrowserRouter>
    )
  }
}
