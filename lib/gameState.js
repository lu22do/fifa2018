GameState = new Mongo.Collection('game-state');

GameStateSchema = new SimpleSchema({
  'state': {
    type: String,
    label: 'Game state: preparing or started'
  }
});

GameState.attachSchema(GameStateSchema);

export default GameState;
