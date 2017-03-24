/**
 * Created by StarLikeRain on 21/03/2017.
 */
const fs = require('fs');
const path = require('path')
const staticServer = require('./static-server')

class App {
    constructor() {

    }

    initServer(req, res) {
        //『 middleware 』
        // const str = require('../package.json')

        // 『 main logic here』
        // 「 default parse as '.js' & '.json' 」
        return (request, response) => {
            let {url} = request;

            let body = staticServer(url)
            response.end(body)
        }
    }
}

module.exports = App