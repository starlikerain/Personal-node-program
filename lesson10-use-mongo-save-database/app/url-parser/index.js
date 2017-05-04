/**
 * Created by StarLikeRain on 2017/4/4.
 *
 * @url-parser_server
 *
 * @handle_server_data
 * 想做的就是把前端发过来的请求 存到reqCtx.body
 */


// request: query + body + method

const Url = require('url');

let urlParser = (ctx) => {

    let {method, url} = ctx.req
    let {reqCtx} = ctx

    method = method.toLowerCase()

    // 「这里Url.parse(url, true) 第二个参数为true可以让，pathname成为一个对象，来获取」
    Object.assign(reqCtx, Url.parse(url, true), {method})

    return Promise.resolve({
        then: (resolve, reject) => {
            if (method === 'post') {
                let data = []
                // paused stream, flow stream
                ctx.req.on('data', (chunk) => {
                    data.push(chunk)
                }).on('end', () => {

                    let endData = Buffer.concat(data).toString()
                    console.log('endData: ', endData);
                    reqCtx.body = JSON.parse(endData)
                    // notification next guy
                    resolve()
                })
            } else {
                // notification next guy
                resolve()
            }
        }
    })
}

module.exports = urlParser