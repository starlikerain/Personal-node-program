/**
 * Created by StarLikeRain on 23/03/2017.
 *
 * @Static-Server
 */

const fs = require('fs')
const path = require('path')

const DIY_path = 'public'

let getPath = (url) => {
    return path.resolve(process.cwd(), DIY_path, `.${url}`);
}

// 『 Static resource server 』
let staticFunc = (url) => {

    // Promise
    return new Promise((resolve, reject) => {

        if (url === '/') {
            url = '/index.html'
        }

        let _path = getPath(url)

        // 『 unnecessary appoint extend  』
        fs.readFile(_path, (err, data) => {
            if (err) {
                reject(`NOT FOUND${err.stack}`)
            }
            resolve(data)
        })
    })
}

module.exports = staticFunc
