/**
 * Created by StarLikeRain on 21/03/2017.
 *
 * @index.js----1
 */
const http = require('http')

const PORT = 7000
// 『get ./app/index.js 』
// like nginx distribute network requests
const App = require('./app')

const server = new App()

// middleware
const cookieParser = require('./app/cookie-parser')
const staticServer = require('./app/static-server')
const apiServer = require('./app/api')
const urlParser = require('./app/url-parser')
const viewServer = require('./app/view-server')
server.use(cookieParser) // whiteName list parse
server.use(urlParser)    // post parse
server.use(apiServer)    // ajax parse

server.use(staticServer) // img css js
server.use(viewServer)   // html

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