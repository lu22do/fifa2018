import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import TopBar from './TopBar.jsx';
import Welcome from './Welcome.jsx';
import SelectionListContainer from './SelectionList.jsx';
import SelectionNew from './SelectionNew.jsx';
import Users from './Users.jsx';
import Login from './Login.jsx';
import VerifyEmail from './VerifyEmail.jsx';
import Register from './Register.jsx';
import MatchList from './MatchList.jsx';
import MatchNew from './MatchNew.jsx';
import MatchEdit from './MatchEdit.jsx';
import TeamList from './TeamList.jsx';
import GameStateEdit from './GameStateEdit.jsx';

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
          <TopBar/>

          <PrivateRoute exact path='/' component={Welcome}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/verify-email/:token" component={VerifyEmail}/>
          <PrivateRoute path='/selection-list' exact component={SelectionListContainer}/>
          <PrivateRoute path='/selection-list/:id' component={SelectionListContainer}/>
          <PrivateRoute path='/new-selection' component={SelectionNew}/>
          <PrivateRoute path='/users' component={Users}/>
          <PrivateRoute path='/match-list' component={MatchList}/>
          <PrivateRoute path='/new-match' component={MatchNew}/>
          <PrivateRoute path='/edit-match/:id' component={MatchEdit}/>
          <PrivateRoute path='/team-list' component={TeamList}/>
          <PrivateRoute path='/game-state' component={GameStateEdit}/>
        </div>
      </BrowserRouter>
    )
  }
}
