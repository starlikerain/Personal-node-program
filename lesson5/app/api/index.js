/**
 * Created by StarLikeRain on 27/03/2017.
 *
 * @api----apiServer
 * @FOR-AJAX
 */

module.exports = (request) => {
    //prototype, __proto__, readable, stream, eventEmmiter
    let {url, method, context} = request

    // request.context = {
    //     body: '',
    //     query: {},
    //     method: 'get'
    // }

    let apiMap = {
        '/list.action': ['list1', 'list2', 'list3'],
        '/user.action': ['user1', 'user2', 'user3']
    }

    if (method.toLowerCase() == 'get') {
        return Promise.resolve(apiMap[url])
    } else {
        // handle post B === socket ===S  ;  (browser, server)
        /**
         * @post_method
         */
        let {body} = context

        return Promise.resolve(body)
    }
}
