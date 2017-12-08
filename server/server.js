// create admin account if it does not exists
if (!Meteor.users.findOne({username: 'admin'})) {
  var password = 'admin';
  if (Meteor.settings.adminPassword) {
    password = Meteor.settings.adminPassword;
  }
  if (!Accounts.createUser({username: 'admin',
                 					  password: password})) {
    console.log('Admin account creation error');
  }
}

// Create the Teams db if it does not exist already
if (!Teams.find({}).count()) {
  console.log('Creating Teams db');
  TeamList.forEach((team) => {
    Teams.insert({name: team});
  });
}

// Update scores (teams and selection) if there is any change in the Matchs db
function UpdateScores() {
  let teams = {}; // dictionnary of score per team
  TeamList.forEach((team) => {
    teams[team] = 0;
  });

  Matchs.find({}).map(function(match) {
    if (match.winner != "Draw") {
      teams[match.winner] += 3;
    }
  });

  TeamList.forEach((team) => {
    //console.log('Score for ' + team + ' = ' + teams[team]);
    Teams.update({name: team}, {$set: {score: teams[team]}})
  });

  Selections.find({}).map(function(selection) {
    let score = 0;
    selection.teams.forEach((team) => {
      score += teams[team];
    });

    Selections.update({_id: selection._id}, {$set: {score}});
  });
}

Matchs.find({}).observe({
  removed: UpdateScores,
  added: UpdateScores,
  removed: UpdateScores
});
