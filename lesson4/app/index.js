/**
 * Created by StarLikeRain on 21/03/2017.
 *
 * @index.js----2
 */
const fs = require('fs');
const path = require('path')
/**
 * @myStaticServer
 */
const staticServer = require('./static-server')
/**
 * @myAPIserver
 */
const apiServer = require('./api')
const urlParser = require('./url-parser')

class App {
    constructor() {

    }

    initServer(req, res) {
        // 「 node.js default parse as '.js' & '.json' 」

        // April 4 ON WINDOWS --->>  modify logic as promise chain mode
        return (request, response) => {
            let {url, method} = request

            request.context = {
                body: '',
                query: {},
                method: 'get'
            }
            // request: query + body + method
            urlParser(request).then(() => {
                // urlParser(request) mounted request.body furtively
                return apiServer(request)
            }).then(val => {
                if (!val) {
                    return staticServer(request)
                } else {
                    console.log('FE data go !')
                    return val
                }
            }).then(val => {
                let base = {'presentBy': 'Evan Yann'}
                let body = ''
                if (val instanceof Buffer) {
                    body = val
                } else {
                    body = JSON.stringify(val)
                    let finalHeader = Object.assign(base, {
                        'Content-Type': 'application/json'
                    })
                    response.writeHead(200, 'success', finalHeader)
                    console.log('FE data detail ----->>>>>>>',body)
                }
                response.end(body)
            })
        }
    }
}

module.exports = App