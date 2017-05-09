/**
 * Created by StarLikeRain on 02/05/2017.
 * 创建路由模块
 * 路由映射表
 * 
 * 很单纯的一个架子 为了ajax_api服务的
 */

class Router {
    constructor() {
        this.routerMap = {
            'get': {},
            'post': {}
        }
    }

    get(pathname, handler) {
        let getMap = this.routerMap.get;
        getMap[pathname] = handler;
    }

    post(pathname, handler) {
        let getMap = this.routerMap.post;
        getMap[pathname] = handler;
    }

    // 「用来对接request response」
    routes(ctx) {
        let { pathname, method } = ctx.reqCtx;

        if (method === 'get' || method === 'post') {
            let handler = this.routerMap[method][pathname]
                // 如有可执行的传入回调函数
            if (handler) {
                return Promise.resolve(handler(ctx))
            } else {
                return Promise.resolve()
            }
        } else {
            return Promise.resolve()
        }
    }
}

module.exports = new Router()