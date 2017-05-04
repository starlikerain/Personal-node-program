/**
 * Created by StarLikeRain on 03/05/2017.
 * 采用mongoose来处理
 * @专门处理ajax
 */

const Router = require('./router/index_router');

let {$_saveBlog, $_saveCategory} = require('./mongo/index_mongo');

//          获取分类列表
Router.get('/categoryList.action', ctx => {
    return {a: 1}
})
//           增加分类
Router.get('/category.action', ctx => {
    let category = ctx.reqCtx.query
    return $_saveCategory(category)
})
//           添加博客
Router.post('/blog.action', ctx => {
    let blog = ctx.reqCtx.body
    return $_saveBlog(blog)
})

module.exports = Router;