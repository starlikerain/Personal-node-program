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
server.use(urlParser)    // post parse
server.use(cookieParser) // whiteName list parse
server.use(apiServer)    // ajax parse

server.use(staticServer) // img css js
server.use(viewServer)   // html


// 引入mongoose
const mongoose = require('mongoose');
// use native Promise
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blogDB');// 这里创建了新的connection就叫做blogDB
mongoose.connection
    .on('error', () => {
        console.log(`error happend from db`)
    })
    .once('open', () => {
        console.log('we are connected!')
    })

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