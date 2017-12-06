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

if (!Teams.find({}).count()) {
  console.log('Creating Teams db');
  TeamList.forEach((team) => {
    Teams.insert({name: team});
  });
}

function UpdateScores() {
  let teams = {};
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
}

Matchs.find({}).observe({
  removed: UpdateScores,
  added: UpdateScores,
  removed: UpdateScores
});
