/**
 * Created by StarLikeRain on 16/04/2017.
 * @cookie-parser
 */
const cookie_parser = require('cookie')
    // 白名单
const whiteNameList = ['/Evan_Yann']

const cookieParserServer = (ctx) => {

    let { pathname } = ctx.reqCtx;
    debugger
    let { cookie } = ctx.req.headers
    let { resCtx, res } = ctx

    // 「 解析cookie成Object的形式 」
    let cookieObj = cookie ? cookie_parser.parse(cookie) : {};

    return Promise.resolve({
        then: (resolve, reject) => {
            let cookieStr = time => `authd=hello;Max-Age=${time}`
                // 「 如果cookie里面写着已认证 」  ||   使用白名单登录
            if (cookieObj['authd'] || whiteNameList.indexOf(pathname) > -1) {
                resCtx.hasUser = true;
                res.setHeader('Set-Cookie', cookieStr(3600))
            }

            //登出
            if (pathname === '/logout') {
                res.setHeader('Set-Cookie', cookieStr(0))
            }
            resolve()
        }
    })
}

module.exports = cookieParserServer