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

let viewServer = (ctx) => {
    let {req, resCtx} = ctx
    let {url} = req
    return Promise.resolve({
        then: (resolve, reject) => {
            let urlMap = {
                '/': {
                    viewName: 'index.html'
                },
                '/about': {
                    viewName: 'about.html'
                }
            }
            let viewPath = path.resolve(process.cwd(), 'public') // 启动工作目录下的public
            if (urlMap[url]) {
                let {viewName} = urlMap[url]
                let htmlPath = path.resolve(viewPath, viewName)
                let temStr = fs.readFileSync(htmlPath,'utf-8')
                let render = ejs.compile(temStr, {
                    compileDebug: true
                })
                resCtx.body = render()
                resolve()
            } else {
                resolve()
            }

        }
    })

}

module.exports = viewServer