webpackJsonp([0],{

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

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
        success: function success(arr) {

            var liStr = arr.map(function (ele) {
                return '<li>' + ele + '</li>';
            }).join('');

            $('#root').html(liStr);
        },
        error: function error(_error) {
            console.log('error');
            console.log(_error);
        }
    });

    /**
     * @Simulator_POST_request
     */
    $.ajax({
        url: '/list.action',
        method: 'POST',

        data: JSON.stringify(['name', 'Evan Yann']),

        // if return Array
        success: function success(arr) {

            var liStr = arr.map(function (ele) {
                return '<li>' + ele + '</li>';
            }).join('');

            $('#shop').html(liStr);
        },
        error: function error(_error2) {
            console.log('error');
            console.log(_error2);
        }
    });
}, 500);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })

},[2]);
//# sourceMappingURL=index.js.map