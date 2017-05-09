/**
 * Created by StarLikeRain on 03/05/2017.
 * 创建 schema
 */

// the instance from node_modules !!
const { Schema } = require('mongoose');

// 创建博客分类
const categorySchema = new Schema({
    name: String,
    id: String
});

//  创建博客的数据存储
const blogSchema = new Schema({
    title: String,
    content: String, // html
    rawContent: String, // markdown
    category: categorySchema, // 分类
    date: String
}, {
    _id: false, // mongoose不要把我的_id变成ObjectID  这里如果是true可以让findOne这个api用普通id查询成功
    strict: false
});


module.exports = {
    blogSchema,
    categorySchema
}