const urls = {
  pokemons: 'https://pokeapi.co/api/v2/pokemon',
  pokemon1: 5,
  pokemon2: 22,
  pokemon3: 86,
};

const mocks = {
  get: require('./valid-get.json'),
  pokemonList: require('./valid-pokemon-list.json'),
  pokemon1: require('./valid-pokemon-1.json'),
  pokemon2: require('./valid-pokemon-2.json'),
  pokemon3: require('./valid-pokemon-3.json'),
  team: require('./valid-team.json'),
  numberListOfId: [5, 22, 86],
};

module.exports = { mocks, urls }