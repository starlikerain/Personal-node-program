/**
 * Created by StarLikeRain on 07/04/2017.
 * @view-server
 */

// 映射表
// ejs动态渲染
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
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const mime = require('mime')
const urlRewriteMap = require('./urlRewrite')
    // router ==> controller ==> result MVC
let viewServer = (ctx) => {
    console.log('view-server')
    let { req, resCtx } = ctx
    let { url } = req
    console.log('url      ', url)
    return Promise.resolve({
        then: (resolve, reject) => {
            // ajax & staticResource
            if (url.match('action') || url.match(/\./)) {
                resolve()
            } else {
                // 拼接出来ejs的文件绝对路径
                const viewPath = path.resolve(__dirname, 'ejs')
                let ejsName = urlRewriteMap[url]
                if (ejsName) {
                    let layoutPath = path.resolve(viewPath, 'layout.ejs')
                    let layoutHtml = fs.readFileSync(layoutPath, 'utf-8') // 读取到layout.ejs

                    // let html = fs.readFileSync(htmlPath, 'utf-8')
                    // 这个原理是new function 所以下面可以直接传参
                    let render = ejs.compile(layoutHtml, {
                        compileDebug: true,
                        // 因为layout ejs模板里面是相对路径
                        // 所以这里加上绝对路径
                        filename: layoutPath
                    })

                    let html = render({ templateName: ejsName })

                    resCtx.headers = Object.assign(resCtx.headers, {
                        'Content-Type': 'text/html'
                    })
                    resCtx.body = html
                    resolve()

                } else {
                    // url redirect
                    resCtx.headers = Object.assign(resCtx.headers, {
                        'Location': '/'
                    })
                    resCtx.statusCode = 302
                    resCtx.statusMessage = 'redirect'
                    resCtx.body = ''
                    resolve()
                }
            }
        }
    })
}
module.exports = viewServer