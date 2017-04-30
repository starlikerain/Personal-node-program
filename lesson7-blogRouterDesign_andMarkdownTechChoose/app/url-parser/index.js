/**
 * Created by StarLikeRain on 2017/4/4.
 *
 * @url-parser_server
 *
 * @handle_server_data
 */

// request: query + body + method

// let context = {
//     req: request,
//     reqCtx: {
//         body: '', // post请求数据
//         query: {}, // 用来处理客户端的get请求
//     },
//     res: response,
//     resCtx: {
//         headers: {}, // response的返回报文
//         body: null, // 返回给前端的内容
//     }
// }

let urlParser = (ctx) => {
    console.log('url-parser')

    let { method, url, context } = ctx.req
    let { reqCtx } = ctx

    method = method.toLowerCase()

    return Promise.resolve({
        then: (resolve, reject) => {

            if (method === 'post') {
                let data = []
                    // paused stream, flow stream
                ctx.req.on('data', (chunk) => {
                    data.push(chunk)
                }).on('end', () => {
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