const { expect } = require('chai')
const { describe, beforeEach, afterEach, before } = require('mocha')
const sinon = require('sinon');
const PokemonRepository = require('../../src/repository/pokemonRepository');
const { PokemonService, FINAL_POKEMON_ID } = require('../../src/service/pokemonService');
const { mocks, urls } = require('../mocks/repository');

describe('Pokémon Service Test Suite', () => {
  let repository, sandbox, service;

  before(() => {
    repository = new PokemonRepository()
    service = new PokemonService({ repository })
  })

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => sandbox.restore())

  it('should return three random numbers using parameters', () => {
    const finalNumber = 10
    const result = service.getId(finalNumber)

    expect(result).to.be.instanceOf(Array)
    expect(result.length).to.be.deep.equal(3)

    result.map(item => expect(item).to.be.gte(1).and.to.be.lte(finalNumber))
  })

  it('should return three random numbers using no parameters', () => {
    const result = service.getId()

    expect(result).to.be.instanceOf(Array)
    expect(result.length).to.be.deep.equal(3)

    result.map(item => expect(item).to.be.gte(1).and.to.be.lte(FINAL_POKEMON_ID))
  })

  it('should return three pokémon info', async () => {
    sandbox.stub(service, service.getId.name).returns(mocks.numberListOfId)

    const stubRepository = sandbox.stub(repository, repository.getById.name)
    stubRepository.withArgs(urls.pokemon1).returns(mocks.pokemon1)
    stubRepository.withArgs(urls.pokemon2).returns(mocks.pokemon2)
    stubRepository.withArgs(urls.pokemon3).returns(mocks.pokemon3)

    const result = await service.getTeam()

    expect(result).to.be.ok
    expect(result).to.be.instanceOf(Array)
    expect(result[0]).to.be.haveOwnProperty('id').and.to.be.deep.equal(5)
    expect(result[1]).to.be.haveOwnProperty('name').and.to.be.deep.equal('fearow')
    expect(result[2]).to.be.haveOwnProperty('moves').and.to.be.instanceOf(Array)
  })

  it('should thrown an error due to wrong parameter', () => {
    const errorMessage = 'Ash, we have a problem! We need a final number of Pokémon to draught'

    try {
      const wrongParam = 'wrong'
      service.getId(wrongParam)
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error).to.be.haveOwnProperty('message')
      expect(error.message).to.be.deep.equal(errorMessage)
    }
  })

  it('should thrown an error due to missing parameter', () => {
    const errorMessage = 'Ash, we have a problem! Where is the repository?'

    try {
      new PokemonService({ repository: undefined })
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.be.exist
      expect(error.message).to.be.deep.equal(errorMessage)
    }
  })
})