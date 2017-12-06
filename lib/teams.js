Teams = new Mongo.Collection('teams');

TeamSchema = new SimpleSchema({
  'name': {
    type: String,
    label: 'Team name'
  },
  'score': {
    type: Number,
    label: 'Score for the team',
    defaultValue: 0
  }
});

Teams.attachSchema(TeamSchema);

export default Teams;
