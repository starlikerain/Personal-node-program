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

    /**
     * @Simulator_POST_request
     */
    $.ajax({
        url: '/list.action',
        method: 'POST',

        data:JSON.stringify([
            'name','Evan Yann'
        ]),

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
}, 500)

