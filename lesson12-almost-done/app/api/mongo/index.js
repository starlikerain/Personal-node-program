/**
 * @author StarLikeRain「 Evan Yann 」
 * @email pengyaokang@gmail.com
 * @create date 2017-05-09 10:46:04
 * @modify date 2017-05-09 10:46:04
 * @desc [description]
 */

const mongoose = require('mongoose');
const { blogSchema, categorySchema } = require('./schema');
//第一个参数是colleciton的名字
const BlogModel = mongoose.model('Blog', blogSchema)
const CategoryModel = mongoose.model('Category', categorySchema)

exports.$_saveBlog = blog => {
    let condition = { title: blog.title }
    blog.date = new Date().toLocaleString()
    return BlogModel
        .findOneAndUpdate(condition, blog, {
            upser: true,
            new: true
        })
        .then(_blog => {
            return {
                status: 1,
                data: _blog
            }
        })
}


//获取博客详情
exports.$_getBlogDetail = query => {
    let condition = {
            _id: mongoose.Types.ObjectId(query.id)
        }
        // _id ==> //objectId
    return BlogModel
        .findOne(condition)
        .then(blog => {
            return {
                status: 1,
                data: blog
            }
        })
}


//获取博客列表
exports.$_getBlogList = query => {
    //{'category.name':'about'} ==> nested query
    return BlogModel
        .find(query)
        .exec()
        .then(blogList => {
            return {
                status: 1,
                data: blogList
            }
        })
}


//删除博客
// id:XXX
exports.$_deleteBlog = query => {
    let condition = {
        _id: mongoose.Types.ObjectId(query.id)
    }

    return BlogModel
        .remove(condition)
        .exec()
        .then(blog => {
            return {
                status: 1,
                data: '删除博客成功'
            }
        })
}


exports.$_saveCategory = category => {
    let condition = { name: category.name }

    return CategoryModel
        .findOneAndUpdate(condition, category, {
            upser: true,
            new: true
        })
        .then(_category => {
            return {
                status: 1,
                data: _category
            }
        })
}


exports.$_getCategoryList = query => {

    //collection + document的样子
    return CategoryModel
        .find(query)
        .exec()
        .then(categoryList => {
            return {
                status: 1,
                data: categoryList || []
            }
        })
}