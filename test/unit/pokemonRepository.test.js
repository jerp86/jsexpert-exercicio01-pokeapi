const { expect } = require('chai')
const { describe, it, beforeEach, afterEach } = require('mocha')
const sinon = require('sinon')
const PokemonRepository = require('../../src/repository/pokemonRepository')
const { mocks } = require('../mocks/repository')

describe('Pokémon Repository Test Suite', () => {
  let repository, sandbox;

  beforeEach(() => {
    repository = new PokemonRepository()
    sandbox = sinon.createSandbox()
  })

  afterEach(() => sandbox.restore())

  it('should call getAll from repository', async () => {
    sandbox.stub(repository, repository.getAll.name).returns(mocks.pokemonList)

    const result = await repository.getAll()
    expect(result).to.be.deep.equal(mocks.pokemonList)
    expect(repository.getAll.calledOnce).to.be.ok
  })

  it('should call getById from repository', async () => {
    const numberParam = 5
    const stringParam = '5'
    const expected = {
      name: 'charmeleon',
      moves: [ 'mega-punch', 'fire-punch', 'thunder-punch' ],
      formattedName: '#5 - charmeleon'
    }

    const [resultNumber, resultString] = await Promise.all([repository.getById(numberParam), repository.getById(stringParam)])
    expect(resultNumber).to.be.deep.equal({ ...expected, id: numberParam })
    expect(resultString).to.be.deep.equal({ ...expected, id: stringParam })
  })

  it('should throw an error due to missing parameter', async () => {
    const undefinedParameter = undefined
    const nullableParameter = null
    const errorMessage = 'Hey, I need ID to search anywhere Pokémon'

    try {
      await repository.getById(undefinedParameter)
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.be.deep.equal(errorMessage)
      expect(error.message).to.be.exist
      expect(error).to.haveOwnProperty('message')
    }

    try {
      await repository.getById(nullableParameter)
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

    try {
      await repository.getById(parameter)
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

    try {
      await repository.getById(parameter)
    } catch (error) {
      expect(error).to.be.instanceOf(Error)
      expect(error.message).to.be.exist
      expect(error).to.haveOwnProperty('message')
      expect(error.message).to.be.deep.equal(errorMessage)
    }
  })
})