/**
 * Created by StarLikeRain on 27/03/2017.
 *
 * @api----apiServer
 * @FOR-AJAX
 */
const Router = require('./ajax_api');


module.exports = (ctx) => {
    console.log('get in api index.js!!!!!!!')
        //prototype, __proto__, readable, stream, eventEmmiter

    let { reqCtx, resCtx } = ctx
    let { pathname } = reqCtx

    if (!pathname.match(/\.action/)) {
        // 让不是ajax请求的过去
        return Promise.resolve()
    }
    // 对应的请求用router存储的 handler来处理
    return Router.routes(ctx).then(val => {
        if (val) {
            resCtx.statusCode = 200
            resCtx.headers = Object.assign(resCtx.headers, {
                "Content-Type": "application/json"
            })
            resCtx.body = JSON.stringify(val)
        }
    }).catch(err => {
        resCtx.statusCode = 400
        resCtx.body = `${err.name} + ${err.stack}`
    })
}