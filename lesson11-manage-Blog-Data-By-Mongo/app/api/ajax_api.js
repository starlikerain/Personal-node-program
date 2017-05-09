/**
 * Created by StarLikeRain on 03/05/2017.
 * 采用mongoose来处理
 * @专门处理ajax
 * 
 * 这里的callback都会丢进index_router等待被执行
 * 
 * 这是一个设计response函数的地方
 */

const Router = require('./router/index_router');

let { $_saveBlog, $_saveCategory, $_getCategoryList } = require('./mongo/index_mongo');


/**
 * 下面设计的是
 * 不同的路径用不用的mongoose来处理
 */

//          获取分类列表
Router.get('/categoryList.action', ctx => {
        return _getCategoryList()
    })
    //           增加分类
Router.post('/category.action', ctx => {
        let category = ctx.reqCtx.body
        return $_saveCategory(category)
    })
    //           添加博客
Router.post('/blog.action', ctx => {
    let blog = ctx.reqCtx.body
    return $_saveBlog(blog)
})

module.exports = Router;