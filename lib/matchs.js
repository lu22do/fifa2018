Matchs = new Mongo.Collection('matchs');

MatchSchema = new SimpleSchema({
  'country1': {
    type: String,
    label: 'First country'
  },
  'country2': {
    type: String,
    label: 'Second country'
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
    label: 'Winner (country name)'
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
