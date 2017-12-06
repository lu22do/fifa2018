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
    type: String,
    label: 'Date of the match'
  },
  'score': {
    type: String,
    label: 'Score (free form string)'
  },
  'winner': {
    type: String,
    label: 'Winner (team name)'
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
