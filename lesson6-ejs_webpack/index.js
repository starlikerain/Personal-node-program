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

// middleware
const staticServer = require('./app/static-server')
const apiServer = require('./app/api')
const urlParser = require('./app/url-parser')
const viewServer = require('./app/view-server')
server.use(urlParser)
server.use(apiServer)
server.use(staticServer)
server.use(viewServer)

// launch app
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
