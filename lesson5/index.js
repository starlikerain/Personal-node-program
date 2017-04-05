/**
 * Created by StarLikeRain on 21/03/2017.
 *
 * @index.js----1
 */
const http = require('http')
const PORT = 7000
// 『get ./app/index.js』
const App = require('./app')

const server = new App()

http
    .createServer(
        server.initServer()
    )
    .listen(
        PORT,
        () => {
            console.log(`listenging on ${PORT}`)
        }
    )
