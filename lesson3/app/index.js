/**
 * Created by StarLikeRain on 21/03/2017.
 *
 * @index.js----2
 */
const fs = require('fs');
const path = require('path')
const staticServer = require('./static-server')
const apiServer = require('./api')


class App {
    constructor() {

    }

    initServer(req, res) {
        //『 middleware 』
        // const str = require('../package.json')

        // 『 main logic here』
        // 「 default parse as '.js' & '.json' 」
        return (request, response) => {

            // 『when ajax request
            //    inside IncomingMessage headers
            //   will include
            //  ---->>>  x-request-with: 'XMLHttpRequest'
            // 』
            let {url} = request

            // 『返回的字符串 or buffer』
            let body = ''
            let headers = {}

            if (url.match('action')) {
                apiServer(url).then(val => {
                    body = JSON.stringify(val)
                    headers = {
                        'Content-Type': 'application/json'
                    }
                    let finalHeader = Object.assign(headers, {'author': 'Evan Yann'})
                    response.writeHead('200', 'wow!success', finalHeader)
                    response.end(body)
                })
            } else {
                staticServer(url).then((body) => {
                    let finalHeader = Object.assign(headers, {'author': 'Evan Yann'})
                    response.writeHead('200', 'wow!success', finalHeader)
                    response.end(body)
                })
            }
        }
    }
}

module.exports = App