/**
 * Created by StarLikeRain on 27/03/2017.
 *
 * @api----apiServer
 * @FOR-AJAX
 */

module.exports = (url) => {
    console.log('from apiServer url : ',url)
    // 『 rewritten as Promise 』
    return new Promise((resolve, reject) => {
        let apiMap = {
            '/list.action': ['list1', 'list2', 'list3'],
            '/user.action': ['user1', 'user2', 'user3']
        }
        resolve(apiMap[url])
    })
    // dynamic
}
