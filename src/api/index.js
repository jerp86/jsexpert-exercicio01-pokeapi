const https = require('node:https')

const API_BASE_URL = 'https://pokeapi.co/api/v2';

class PokemonApi {
  async get(url = '') {
    const preparedUrl = `${API_BASE_URL}${url}`
    return new Promise((resolve, reject) => {
      https.get(preparedUrl, res => {

        let body = ''

        res.on('data', chunk => {
          body += chunk
        })

        res.on('end', async () => {
          try {
            if (!body || body.length === 0) return

            const preparedResponse = await JSON.parse(body)
            resolve(preparedResponse)
          } catch (error) {
            console.error('Aaaaaa, Ash and Dr. Oker, we have a problem!!!')
            console.log("🚀 ~ file: index.js:18 ~ PokemonApi ~ res.on ~ error:", error)
            reject(error)
          }
        })
      })
    })
  }
}

// ;(async () => {
//   const api = new PokemonApi()
//   // const [t1, t2, t3] = await Promise.all([
//   //   api.get('/pokemon/5'),
//   //   api.get('/pokemon/22'),
//   //   api.get('/pokemon/86'),
//   // ])
//   const t1 = await api.get('/pokemon')
//   // console.log("🚀 ~ file: index.js:31 ~ ; ~ response:", t1.name, t2.name, t3.name)
//   console.log(JSON.stringify(t1))
// })()

module.exports = PokemonApi;
