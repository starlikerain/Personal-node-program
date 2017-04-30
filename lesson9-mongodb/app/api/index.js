
/**
 * Created by StarLikeRain on 27/03/2017.
 *
 * @api----apiServer
 * @FOR-AJAX
 */

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

let apiFunc = (ctx) => {
    console.log('api server')

    //prototype, __proto__, readable, stream, eventEmmiter
    let { url, method } = ctx.req
    debugger
    let { reqCtx, resCtx } = ctx

    let apiMap = {
        '/list.action': ['list1', 'list2', 'list3'],
        '/user.action': ['user1', 'user2', 'user3']
    }

    method = method.toLowerCase()
    return Promise.resolve({
        then: (resolve, reject) => {
            // 『 只做ajax action的response 』
            if (url.match('action')) {
                if (method === 'get') {
                    resCtx.body = JSON.stringify(apiMap[url])
                } else {
                    // handle post B === socket ===S  ;  (browser, server)
                    /**@post_method*/

                    let { body } = reqCtx
                    // 其实就是傻傻地返回了前端传过来的数据
                    resCtx.body = JSON.stringify(body)
                }
                resCtx.headers = Object.assign(resCtx.headers, {
                    "Content-Type": "application/json"
                })
            }
            resolve()
        }
    })
}

module.exports = apiFunc