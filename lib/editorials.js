Editorials = new Mongo.Collection('editorials');

EditorialSchema = new SimpleSchema({
  'content': {
    type: String,
    label: 'Content',
    max: 500
  },
  'author': {
    type: String,
    label: 'Author',
    max: 40
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

Editorials.attachSchema(EditorialSchema);

export default Editorials;
