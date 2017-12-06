// Selections
// call everytime someone subscribes (or unsubscribes (logout))
Meteor.publish("selections", function () {
  return Selections.find();

/* ---> to return only selection owned by user:
  var user = Meteor.users.findOne(this.userId);

  if (user) {
		if (user.username === 'admin') {
		  return Selections.find();
		}
		else {
		  return Selections.find({owner: this.userId});
		}
  }
*/
});

Selections.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return (userId && doc.owner === userId);
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return doc.owner === userId;
  },
  remove: function (userId, doc) {
    var currentUser = Meteor.user();

    // can only remove your own documents
    return doc.owner === userId ||
           (currentUser && currentUser.username === 'admin');
  },
  fetch: ['owner']
});

Selections.deny({
  update: function (userId, doc, fields, modifier) {
    // can't change owners
    return _.contains(fields, 'owner');
  }
});

// Matchs
Meteor.publish("matchs", function () {
  return Matchs.find();
});

Matchs.allow({
  insert: function (userId, doc) {
    return Meteor.user().username === 'admin';
  },
  update: function (userId, doc, fields, modifier) {
    return Meteor.user().username === 'admin';
  },
  remove: function (userId, doc) {
    return Meteor.user().username === 'admin';
  }
});

// Teams
Meteor.publish("teams", function () {
  return Teams.find();
});

Teams.allow({
  // nothing
});

// user data
Meteor.publish("userData", function () {
  return Meteor.users.find({},
                           {fields: {'username': 1}});
});

Meteor.users.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return doc.owner === userId;
  },
  remove: function (userId, doc) {
    var currentUser = Meteor.user();

		return currentUser && currentUser.username === 'admin';
  }
});
