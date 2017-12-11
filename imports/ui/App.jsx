import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';

import TopBar from './TopBar.jsx';
import SelectionList from './SelectionList.jsx';
import SelectionNew from './SelectionNew.jsx';
import Users from './Users.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import MatchList from './MatchList.jsx';
import MatchNew from './MatchNew.jsx';
import MatchEdit from './MatchEdit.jsx';
import TeamList from './TeamList.jsx';
import GameStateEdit from './GameStateEdit.jsx';

const Welcome = () => (
  <div className="container">
    <h3>Welcome to the 2018 FIFA Game made by the OpenTV-forevers!</h3>
    <br/>
    <p>WARNING: This is work in progress and should be used only for testing!</p>
    <br/>
    <h4>Rules</h4>
    <p>
    -	Everyone picks any 1 team from each group to form a selection<br/>
    -	You can have similar combination of teams in your selection compared to others but you cannot have the exact set if someone else has it already. So, available selections are first-come-first-serve for a selection.<br/>
    -	Each player can make 3 selections such as LudoSet1, LudoSet2, Ludoset3.<br/>
    -	How you get points:<br/>
    &nbsp;&nbsp;o	Your teams will keep gaining points for you as long as they keep playing (not eliminated). Wins, draws and goals get you points.<br/>
    &nbsp;&nbsp;o	Each win gains your selection 3 points, each draw 1 point, each goal scored gains additional Y points (Y = 0.3 during group stage, 0.5 during elimination phase)<br/>
    &nbsp;&nbsp;o	Penalty kicks are not accounted. Only the winner (3 points) and goals during regulation time from each side are counted for points<br/>
    - After the competition kicks off, it is not possible to add/delete selections.<br/>
    -	Player with most total points win. In case of a tie, all those folks win.<br/>
    </p>
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
          <TopBar/>

          <PrivateRoute exact path='/' component={Welcome}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <PrivateRoute path='/selection-list' exact component={SelectionList}/>
          <PrivateRoute path='/selection-list/:id' component={SelectionList}/>
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
