/**
 * Created by StarLikeRain on 03/05/2017.
 * 创建model
 * 
 * ---> 这个前端路由的主要东西 CRUD数据库都在这里了
 */
const mongoose = require('mongoose');

const { blogSchema, categorySchema } = require('./schema');

// 第一个参数表明collection名字
const BlogModel = mongoose.model('Blog', blogSchema);
const CategoryModel = mongoose.model('category', categorySchema);
console.log('get in index_mongo.js')
    // 保存博客的操作

const $_saveBlog = blog => {
    console.log('$_saveBlog');
    return BlogModel.findOneAndUpdate({ title: blog.title }, blog, {
            // update and insert
            upsert: true,
            new: true // 无论如何都返回数据
        }).exec()
        .then(_blog => { // 如果是insert是空，如果是update是有返回值的
            return {
                status: 1,
                data: _blog
            }
        })
}

// 保存分类
const $_saveCategory = category => {
    console.log('$_saveCategory')
    return CategoryModel.findOneAndUpdate({ name: category.name },
        category, {
            upsert: true,
            new: true
        }).then(_category => {
        return {
            status: 1,
            data: _category
        }
    })
}

const $_getCategoryList = query => {
    return CategoryModel.find(query).exec().then(_categoryList => {
        return {
            status: 1,
            data: _categoryList || []
        }
    })
}

module.exports = {
    $_saveBlog,
    $_saveCategory,
    $_getCategoryList
}