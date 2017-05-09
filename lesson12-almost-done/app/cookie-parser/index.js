/**
 * @author StarLikeRain「 Evan Yann 」
 * @email pengyaokang@gmail.com
 * @create date 2017-05-09 10:51:32
 * @modify date 2017-05-09 10:51:32
 * @desc [处理cookie]
 */

const cookie_parser = require('cookie');

module.exports = (ctx) => {
    let { pathname } = ctx.reqCtx;
    let { cookie } = ctx.req.headers;
    let { resCtx, res } = ctx;
    let cookieObj = cookie_parser.parse(cookie || '');
    return Promise.resolve({
        then: (resolve, reject) => {
            let cookieStr = time => `authd=hello;Max-Age=${time}`;

            if (cookieObj['authd']) {
                resCtx.hasUser = true;
                res.setHeader('Set-Cookie', cookieStr(3600))
            }
            //设置白名单
            const whiteNameList = ['/SLR'];
            //登录
            if (whiteNameList.indexOf(pathname) > -1) {
                res.setHeader('Set-Cookie', cookieStr(3600))
            };
            //登出
            if (pathname == '/logout') {
                res.setHeader('Set-Cookie', cookieStr(0))
            }
            resolve()
        }
    })
}