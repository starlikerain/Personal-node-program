/**
 * Created by StarLikeRain on 23/03/2017.
 *
 * @FE
 * @makeAjax
 * @request
 */

setTimeout(function () {
    $.ajax({
        url: '/user.action',
        method: 'GET',
        // if return Array
        success: function (arr) {

            let liStr = arr.map((ele) => {
                return `<li>${ele}</li>`
            }).join('')

            $('#root').html(liStr)
        },
        error: function (error) {
            console.log('error')
            console.log(error)
        }
    })

    $.ajax({
        url: '/list.action',
        method: 'GET',
        // if return Array
        success: function (arr) {

            let liStr = arr.map((ele) => {
                return `<li>${ele}</li>`
            }).join('')

            $('#shop').html(liStr)
        },
        error: function (error) {
            console.log('error')
            console.log(error)
        }
    })
}, 1000)

