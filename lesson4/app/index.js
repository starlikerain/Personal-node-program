/**
 * Created by StarLikeRain on 21/03/2017.
 *
 * @index.js----2
 */
const fs = require('fs');
const path = require('path')
/**
 * @myStaticServer
 */
const staticServer = require('./static-server')
/**
 * @myAPIserver
 */
const apiServer = require('./api')


class App {
    constructor() {

    }

    initServer(req, res) {
        //『 middleware 』
        // const str = require('../package.json')



        // April 4 ON WINDOWS --->>  modify as promise chain mode
        return (request, response) => {
            let {url} = request

            apiServer(url).then(val => {
                if(!val){
                    return staticServer(url)
                } else {
                    return val
                }
            }).then(val => {
                let base = {'presentBy':'Evan Yann'}
                let body = ''
                if(val instanceof Buffer){
                    body = val
                }else {
                    body = JSON.stringify(val)
                    let finalHeader = Object.assign(base,{
                        'Content-Type':'application/json'
                    })
                    response.writeHead(200,'success', finalHeader)
                }
                response.end(body)
            })
        }


        // 『 main logic here』
        // 「 default parse as '.js' & '.json' 」


        // return (request, response) => {
        //
        //     // 『when ajax request
        //     //    inside IncomingMessage headers
        //     //   will include
        //     //  ---->>>  x-request-with: 'XMLHttpRequest'
        //     // 』
        //     let {url} = request
        //
        //     // 『返回的字符串 or buffer』
        //     let body = ''
        //     let headers = {}
        //
        //     /**
        //      * @if-AJAX-REQUEST
        //      */
        //     if (url.match('action')) {
        //         apiServer(url).then(val => {
        //             body = JSON.stringify(val)
        //             headers = {
        //                 'Content-Type': 'application/json'
        //             }
        //             let finalHeader = Object.assign(headers, {'author': 'Evan Yann'})
        //             response.writeHead('200', 'wow!success', finalHeader)
        //             response.end(body)
        //         })
        //     } else {
        //         staticServer(url).then((body) => {
        //             let finalHeader = Object.assign(headers, {'author': 'Evan Yann'})
        //             response.writeHead('200', 'wow!success', finalHeader)
        //             response.end(body)
        //         })
        //     }
        // }
    }
}

module.exports = App