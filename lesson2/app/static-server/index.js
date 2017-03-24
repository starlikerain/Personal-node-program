/**
 * Created by StarLikeRain on 23/03/2017.
 */

const fs = require('fs')
const path = require('path')

let getPath = (url) => {
    return path.resolve(process.cwd(), 'public', `.${url}`);
}

// 『 静态资源服务器 』
let staticFunc = (url) => {

    if(url === '/'){
        url = '/index.html'
    }

    let _path = getPath(url)

    let body = '';
    // 『 如果不指定读取格式 所有的哇？ 』
    try {
        body = fs.readFileSync(_path)
    } catch (error) {
        body = `NOT FOUND${error.stack}`
    }
    return body
}

module.exports = staticFunc
