const { expect } = require('chai')
const { describe, it, before, beforeEach, afterEach } = require('mocha')
const sinon = require('sinon')
const PokemonApi = require('../../src/api')
const { mocks } = require('../mocks/repository')

describe('Pokémon API Test Suite', () => {
  let api, sandbox;

  beforeEach(() => {
    api = new PokemonApi()
    sandbox = sinon.createSandbox()
  })

  afterEach(() => sandbox.restore())

  it('should call base path Pokémon api due to empty parameter', async () => {
    sandbox.stub(api, api.get.name).returns(mocks.get)
    const result = await api.get()

    expect(result).to.be.ok
    expect(result).to.be.haveOwnProperty('count')
    expect(result).to.be.haveOwnProperty('results')
    expect(result.results).to.be.instanceOf(Array)
  })
})