const { expect } = require('chai')
const { describe, it, beforeEach, afterEach } = require('mocha')
const sinon = require('sinon')
const PokemonRepository = require('../../src/repository/pokemonRepository')
const { mocks, urls } = require('../mocks/repository')

describe('Pokémon Repository Test Suite', () => {
  let repository, sandbox;

  beforeEach(() => {
    repository = new PokemonRepository()
    sandbox = sinon.createSandbox()
    // sandbox.stub(repository, 'getById').throws()
  })

  afterEach(() => sandbox.restore())

  it('should call getAll from repository', async () => {
    sandbox.stub(repository, repository.getAll.name).returns(mocks.pokemonList)

    const result = await repository.getAll()
    expect(result).to.be.deep.equal(mocks.pokemonList)
    expect(repository.getAll.calledOnce).to.be.ok
  })

  it('should call getById from repository', async () => {
    sandbox
      .stub(repository, repository.getById.name)
      .returns(mocks.pokemon1)

    const result = await repository.getById(5)
    expect(result).to.be.deep.equal(mocks.pokemon1)
    expect(repository.getById.calledOnce).to.be.ok
  })

  it('should throw an error due to missing parameter', async () => {
    const undefinedParameter = undefined
    const nullableParameter = null
    const errorMessage = 'Hey, I need ID to search anywhere Pokémon'
    const stub = sandbox.stub(repository, repository.getById.name)

    try {
      stub.withArgs(undefinedParameter).throws('error message', errorMessage)
      await repository.getById(undefinedParameter)
      throw new Error('⚠️ Unexpected success!')
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.be.deep.equal(errorMessage)
      expect(error.message).to.be.exist
      expect(error).to.haveOwnProperty('message')
    }


    try {
      stub.withArgs(nullableParameter).throws('error message', errorMessage)
      await repository.getById(nullableParameter)
      throw new Error('⚠️ Unexpected success!')
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.be.deep.equal(errorMessage)
      expect(error.message).to.be.exist
      expect(error).to.haveOwnProperty('message')
    }
  })

  it('should thrown an error due to empty parameter', async () => {
    const parameter = ''
    const errorMessage = 'Hey, I need ID to search anywhere Pokémon'
    sandbox
      .stub(repository, repository.getById.name)
      .withArgs(parameter)
      .throws('error message', errorMessage)

    try {
      await repository.getById(parameter)
      throw new Error('⚠️ Unexpected success!')
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.be.deep.equal(errorMessage)
      expect(error.message).to.be.exist
      expect(error).to.haveOwnProperty('message')
    }
  })

  it('should thrown an error due to text parameter', async () => {
    const parameter = 'Pikachu'
    const errorMessage = 'Hey, I need ID to search anywhere Pokémon'
    sandbox
      .stub(repository, repository.getById.name)
      .withArgs(parameter)
      .throws('error message', errorMessage)

    try {
      await repository.getById(parameter)
      throw new Error('⚠️ Unexpected success!')
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.be.exist
      expect(error).to.haveOwnProperty('message')
      expect(error.message).to.be.deep.equal(errorMessage)
    }
  })
})