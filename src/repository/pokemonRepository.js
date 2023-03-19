const PokemonApi = require('../api');

class PokemonRepository {
  constructor() {
    this.api = new PokemonApi();
  }

  async getAll() {
    const response = await this.api.get('/pokemon')

    return {
      totalOptions: response.count,
      list: response.results,
    }
  }

  async getById(id) {
    console.log("🚀 ~ file: pokemonRepository.js:18 ~ PokemonRepository ~ getById ~ id:", id)
    const idIsEmpty = !id || id?.length === 0
    const idIsNan = isNaN(id)
    console.log("🚀 ~ file: pokemonRepository.js:20 ~ PokemonRepository ~ getById ~ idIsNan:", idIsNan)
    if (idIsEmpty || idIsNan) {
      throw new Error('Hey, I need ID to search anywhere Pokémon')
    }

    const { name, moves } = await this.api.get(`/pokemon/${id}`)

    const filteredMoves = moves.slice(0, 3).map((moveObj) => moveObj.move.name)

    return {
      id,
      name,
      moves: filteredMoves,
      formattedName: `#${id} - ${name}`,
    }
  }
}

module.exports = PokemonRepository;
