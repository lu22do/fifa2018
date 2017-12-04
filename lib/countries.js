Countries = new Mongo.Collection('countries');

CountrySchema = new SimpleSchema({
  'name': {
    type: String,
    label: 'Country name'
  },
  'score': {
    type: Number,
    label: 'Score for the country',
    defaultValue: 0
  }
});

Countries.attachSchema(CountrySchema);

export default Countries;
