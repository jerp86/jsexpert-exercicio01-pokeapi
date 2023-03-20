const FINAL_POKEMON_ID = 171

class PokemonService {
  constructor({ repository }) {
    if (!repository) {
      throw new Error('Ash, we have a problem! Where is the repository?')
    }

    this.repository = repository
  }

  getId(finalNumber = FINAL_POKEMON_ID) {
    if (isNaN(finalNumber)) {
      throw new Error('Ash, we have a problem! We need a final number of Pokémon to draught')
    }

    return Array
      .from({ length: 3 })
      .map(() => Math.floor(Math.random() * finalNumber + 1))
  }

  async getTeam() {
    const { totalOptions } = await this.repository.getAll()

    const listId = this.getId(totalOptions)

    const team = await Promise.all(listId.map(async id => await this.repository.getById(id)))

    return team
  }
}

module.exports = { PokemonService, FINAL_POKEMON_ID }