import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';

import App from '../imports/ui/App.jsx';

Meteor.subscribe('selections');
Meteor.subscribe('matchs');
Meteor.subscribe('userData');
Meteor.subscribe('teams');

Meteor.startup(() => {
  ReactDOM.render(<App />, document.getElementById('render-target'));
});
