Selections = new Mongo.Collection('selections');

SelectionSchema = new SimpleSchema({
  'name': {
    type: String,
    label: 'Name',
    max: 40
  },
  'owner': {
    type: String,
    label: 'Owner UserId'
  },
  'teams': {
    type: [String],
    label: 'Teams in the selection'
  },
  'score': {
    type: Number,
    label: 'Score for the selection',
    defaultValue: 0,
    decimal: true
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

Selections.attachSchema(SelectionSchema);

export default Selections;
