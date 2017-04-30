/**
 * Created by StarLikeRain on 21/03/2017.
 *
 * @index.js----2
 */
const fs = require('fs');
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

    // 创建promise链条
    composeMiddleware(context) {
        debugger
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
        console.log('app->index.js')

        return (request, response) => {

            let { url, method } = request

            let context = {
                req: request,
                reqCtx: {
                    body: '', // post请求数据
                    query: {}, // 用来处理客户端的get请求
                },
                res: response,
                resCtx: {
                    headers: {}, // response的返回报文
                    body: null, // 返回给前端的内容
                    statusCode: 200,
                    statusMessage: 'success'
                }
            }

            // 『 1.每一中间介只需要关注context，彼此独立 』
            // 『 2.设计了use和composeMiddleware两个api用于创建Promise链 』
            // 『 3.开发者可以专注于中间介的开发 』

            // 函数体可以百年不变
            this.composeMiddleware(context)
                .then(() => {
                    let { body, headers, statusCode, statusMessage } = context.resCtx

                    let base = { 'presentBy': 'Evan Yann' }
                    let finalHeaders = Object.assign(base, headers)

                    response.writeHead(statusCode, statusMessage, finalHeaders)
                    response.end(body)
                })

        }
    }
}

module.exports = App