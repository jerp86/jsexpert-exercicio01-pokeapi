const http = require('node:http')
const PokemonRepository = require('./repository/pokemonRepository')
const PokemonService = require('./service/pokemonService')

const DEFAULT_PORT = process.env.PORT ?? 3000
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
}

const DEFAULT_SERVICE = () => {
  const repository = new PokemonRepository()
  const service = new PokemonService({ repository })

  return { service }
}

class Api {
  constructor(dependencies = DEFAULT_SERVICE()) {
    this.teamService = dependencies.service
  }

  generateRoutes() {
    return {
      default: (_, res) => {
        res.writeHeader(404, { "Content-Type": "text/html" });
        res.write("Hey there, try '/team' so we can present to you your's 3 possibles choices")
        return res.end()
      },

      '/team:get': async (req, res) => {
        const team = await this.teamService.getTeam()

        res.writeHeader(200, { "Content-Type": "text/html" });
        res.write(JSON.stringify(team))
        return res.end()
      },
    }
  }

  handler(req, res) {
    const { url, method } = req
    const routeKey = `${url}:${method.toLowerCase()}`
    const routes = this.generateRoutes()

    const chosen = routes[routeKey] ?? routes.default

    res.writeHeader(200, DEFAULT_HEADERS)
    return chosen(req, res)
  }

  createServer(port = DEFAULT_PORT) {
    const app = http
      .createServer(this.handler.bind(this))
      .listen(port, () => console.log(`App running at port ${port}`))

    return app
  }
}

module.exports = Api
