/**
 * Created by StarLikeRain on 21/03/2017.
 */
class App {
    constructor(){

    }

    initServer(req,res){
        //中间件
        const str = require('../package.json')

        //返回核心逻辑
        // 「 default parse as '.js' & '.json' 」
        return (req,res) => {
            res.end(JSON.stringify(str))
        }
    }
}

module.exports = App