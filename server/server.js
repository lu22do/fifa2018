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

// Create the GameState db if it does not exist already
if (!GameState.find({}).count()) {
  console.log('Creating GameState db');
  GameState.insert({state: 'preparing'});
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
    else {
      teams[match.team1] += 1;
      teams[match.team2] += 1;
    }

    let goalMultiplier = 0.3;
    if (match.phase === 'elimination') {
      goalMultiplier = 0.5;
    }

    teams[match.team1] += match.team1goals * goalMultiplier;
    teams[match.team2] += match.team2goals * goalMultiplier;
  });

  TeamList.forEach((team) => {
    let score = parseFloat(Math.round(teams[team] * 100) / 100).toFixed(2);
    //console.log('Score for ' + team + ' = ' + teams[team]);
    Teams.update({name: team}, {$set: {score}})
  });

  Selections.find({}).map(function(selection) {
    let score = 0;
    selection.teams.forEach((team) => {
      //console.log('Score for ' + team + ' = ' + teams[team]);
      score += teams[team];
    });

    score = parseFloat(Math.round(score * 100) / 100).toFixed(2);

    //console.log('Score for ' + selection.name + ' = ' + score);
    Selections.update({_id: selection._id}, {$set: {score}});
  });
}

Matchs.find({}).observe({
  removed: UpdateScores,
  added: UpdateScores,
  changed: UpdateScores
});

Selections.find({}).observe({
  added: UpdateScores,
  changed: UpdateScores
});

Accounts.emailTemplates.siteName = 'FIFA2018 OTV';
Accounts.emailTemplates.from = 'FIFA2018 OTV <no-reply@fifa2018otv.com>';

Accounts.emailTemplates.verifyEmail = {
    subject() {
      return 'Activate your account now!';
    },
    text(user, url) {
      let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' );

      return `Hello ${user.username}!\n\n Please verify your e-mail address (${emailAddress}) by following this link: \n\n${urlWithoutHash}\n\n Thanks and happy competition!`;
    }
};
