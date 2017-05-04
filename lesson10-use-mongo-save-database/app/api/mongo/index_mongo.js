/**
 * Created by StarLikeRain on 03/05/2017.
 * 创建model
 */
const mongoose = require('mongoose');

const { blogSchema,categorySchema } = require('./schema');
// 第一个参数表明collection名字
const BlogModel = mongoose.model('Blog', blogSchema);
const CategoryModel = mongoose.model('category', categorySchema);
    console.log('work2?');
// 保存博客的操作
const $_saveBlog = blog=>{
    console.log('$_saveBlog');
    return BlogModel.findOneAndUpdate({title:blog.title},blog,{
        upsert:true
    }).exec()
        .then(_blog=>{
            return {
                status:1,
                data:_blog
            }
        })
}

// 保存分类
const $_saveCategory = category=>{
    console.log('$_saveCategory')
    return CategoryModel.findOneAndUpdate({name:category.name},category).then(_category=>{
        return {
            status:1,
            data:_category
        }
    })
}

module.exports = {
    $_saveBlog,
    $_saveCategory
}