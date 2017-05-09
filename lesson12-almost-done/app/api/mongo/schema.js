/**
 * @author StarLikeRain「 Evan Yann 」
 * @email pengyaokang@gmail.com
 * @create date 2017-05-09 10:46:35
 * @modify date 2017-05-09 10:46:35
 * @desc [description]
 */

//The Mongoose [Schema](#schema_Schema) constructor
const { Schema } = require('mongoose')

// schema + model
const categorySchema = new Schema({
    name: String,
    id: String
});

const blogSchema = new Schema({
    title: String,
    content: String,
    rawContent: String,
    //http://mongoosejs.com/docs/schematypes.html
    category: categorySchema,
    date: String
}, {
    _id: false, //===>_id为false 告诉mongoose
    //http://mongoosejs.com/docs/guide.html#strict
    strict: false
});

module.exports = {
    blogSchema,
    categorySchema
}