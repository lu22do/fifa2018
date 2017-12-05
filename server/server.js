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

if (!Countries.find({}).count()) {
  console.log('Creating Countries db');
  CountryList.forEach((country) => {
    Countries.insert({name: country});
  });
}

function UpdateScores() {
  let countries = {};
  CountryList.forEach((country) => {
    countries[country] = 0;
  });

  Matchs.find({}).map(function(match) {
    if (match.winner != "Draw") {
      countries[match.winner] += 3;
    }
  });

  CountryList.forEach((country) => {
    //console.log('Score for ' + country + ' = ' + countries[country]);
    Countries.update({name: country}, {$set: {score: countries[country]}})
  });
}

Matchs.find({}).observe({
  removed: UpdateScores,
  added: UpdateScores,
  removed: UpdateScores
});
