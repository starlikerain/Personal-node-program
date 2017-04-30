/**
 * Created by StarLikeRain on 2017/4/4.
 *
 * @url-parser_server
 *
 * @handle_server_data
 * 想做的就是把前端发过来的请求 存到reqCtx.body
 */


// request: query + body + method

let urlParser = (ctx) => {
    console.log('url-parser')

    let {method, url} = ctx.req
    let {reqCtx} = ctx

    method = method.toLowerCase()

    return Promise.resolve({
        then: (resolve, reject) => {

            if (method === 'post') {
                let data = []
                // paused stream, flow stream
                ctx.req.on('data', (chunk) => {
                    data.push(chunk)
                }).on('end', () => {
                    debugger
                    let endData = Buffer.concat(data).toString()
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