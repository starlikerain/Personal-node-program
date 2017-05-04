/**
 * Created by StarLikeRain on 27/03/2017.
 *
 * @api----apiServer
 * @FOR-AJAX
 */
const Router = require('./ajax_api');


let apiFunc = (ctx) => {
    //prototype, __proto__, readable, stream, eventEmmiter
    let {pathname, method} = ctx.reqCtx;
    let {reqCtx, resCtx} = ctx

    return Promise.resolve({
        then: (resolve, reject) => {
            // 『 只做ajax action的response 』
            if (pathname.match('action')) {
                return Router.routes(ctx).then(val => {
                    // ajax请求的返回逻辑
                    resCtx.body = JSON.stringify(val);
                    resCtx.headers = Object.assign(resCtx.headers, {
                        "Content-Type": "application/json"
                    })
                    resolve();
                })
            }
            resolve();
        }
    })
}

module.exports = apiFunc