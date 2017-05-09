/**
 * Created by StarLikeRain on 23/03/2017.
 *
 * @Static-Server
 */


const fs = require('fs')
const path = require('path')
const mime = require('mime')

const DIY_path = 'public'


let getPath = (pathname) => {
    return path.resolve(process.cwd(), DIY_path, `.${pathname}`);
}

// 『 Static resource server 』
let staticFunc = (ctx) => {
    let { pathname } = ctx.reqCtx;
    let { resCtx } = ctx
    // Promise
    return new Promise((resolve, reject) => {
        // 『 staticServer只做静态资源的response 』
        if (pathname.match(/\./) && !pathname.match('action')) { // 这里match . 是为了mime不因为解析的是目录 从而解析不到 (default: application/octet-stream)
            let _path = getPath(pathname)
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