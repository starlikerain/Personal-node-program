/**
 * Created by StarLikeRain on 03/05/2017.
 * 创建 schema
 */

// the instance from node_modules !!
const {Schema} = require('mongoose');


//  创建博客的数据存储
exports.blogSchema = new Schema({
    title: String,
    content: String, // html
    rawContent: String, // markdown
    category: String, // 分类
    date: {
        type: String, default: () => {
            return new Date().toLocaleString()
        }
    }
});

// 创建博客分类
exports.categorySchema = new Schema({
    category: String // 分类
});