/**
 * Created by StarLikeRain on 21/03/2017.
 *
 * @index.js----2
 */
const fs = require('fs')
const path = require('path')


class App {
    constructor() {
        this.middlewareArr = []
            // init an empty Promise
        this.middlewareChain = Promise.resolve()
    }

    use(middleware) {
        this.middlewareArr.push(middleware)
    }

    // create Promise chain
    composeMiddleware(context) {
        let { middlewareArr } = this

        // according middleware, create Promise chain
        for (let middleware of middlewareArr) {
            this.middlewareChain = this.middlewareChain.then(() => {
                return middleware(context)
            })
        }



        return this.middlewareChain
    }

    initServer(req, res) {
        // 「 node.js default parse as '.js' & '.json' 」
        return (request, response) => {

            let { url, method } = request

            let context = {
                req: request,
                reqCtx: {
                    body: '', // post request
                    query: {}, // handle get request from client
                },
                res: response,
                resCtx: {
                    hasUser: false, //  mark user is that inside whiteName list
                    headers: {}, // response headers
                    body: '', // return info back to front end
                    statusCode: 200,
                    statusMessage: 'success'
                }
            }

            // 函数体可以百年不变
            this.composeMiddleware(context)
                .then(() => {
                    let { body, headers, statusCode, statusMessage } = context.resCtx

                    // headers
                    let base = { 'presentBy': 'Evan Yann' }
                    let finalHeaders = Object.assign(base, headers)

                    response.writeHead(statusCode, statusMessage, finalHeaders)
                    response.end(body)
                })

        }
    }
}

module.exports = App