/**
 * Created by StarLikeRain on 23/03/2017.
 *
 * @Static-Server
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

const fs = require('fs')
const path = require('path')
const mime = require('mime')

const DIY_path = 'public'

let getPath = (url) => {
    return path.resolve(process.cwd(), DIY_path, `.${url}`);
}

// 『 Static resource server 』
let staticFunc = (ctx) => {
    let {url} = ctx.req
    let {resCtx} = ctx
    // Promise
    return new Promise((resolve, reject) => {
        // 『 staticServer只做静态资源的response 』
        if (url.match(/\./) && !url.match('action')) { // 这里match . 是为了mime不因为解析的是目录 从而解析不到 (default: application/octet-stream)
            let _path = getPath(url)
            resCtx.headers = Object.assign(resCtx.headers, {
                'Content-Type': mime.lookup(_path)
            })
            // 『 unnecessary appoint extend  』
            fs.readFile(_path, (err, data) => {
                if (err) {
                    resCtx.body = `NOT FOUND${err.stack}`
                    resolve()
                }
                resCtx.body = data
                resolve()
            })
        } else {
            resolve()
        }

    })
}

module.exports = staticFunc
