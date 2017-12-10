Matchs = new Mongo.Collection('matchs');

MatchSchema = new SimpleSchema({
  'team1': {
    type: String,
    label: 'First team'
  },
  'team2': {
    type: String,
    label: 'Second team'
  },
  'date': {
    type: Date,
    label: 'Date of the match',
    optional: true
  },
  'winner': {
    type: String,
    label: 'Winner (team name)'
  },
  'team1goals': {
    type: Number,
    label: 'First team\'s scored goals'
  },
  'team2goals': {
    type: Number,
    label: 'Second team\'s scored goals'
  },
  'phase': {
    type: String,
    label: 'Either group or elimination'
  },
  'created': {
    type: Date,
    label: 'Creation date',
    denyUpdate: true,
    autoValue: function() {
      if ( this.isInsert ) {
        return new Date();
      }
    }
  },
});

Matchs.attachSchema(MatchSchema);

export default Matchs;
