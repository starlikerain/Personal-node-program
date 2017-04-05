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
//     reqCtx: {},
//     res: response,
//     resCtx: {}
// }

module.exports = (request) => {
    let {method, url, context} = request
    method = method.toLowerCase()

    // request.context = {
    //     body: '',
    //     query: {},
    //     method: 'get'
    // }

    return Promise.resolve({
        then: (resolve, reject) => {
            context.method = method
            /**
             * @TODO
             */
            context.query = {}

            if (method === 'post') {
                let data = ''
                // paused stream, flow stream
                request.on('data', (chunk) => {
                    // this is request body !!!
                    // chunk from FE data POST
                    data += chunk
                }).on('end', () => {
                    context.body = JSON.parse(data)
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