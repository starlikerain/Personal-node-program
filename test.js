/**
 * Created by StarLikeRain on 2017/4/4.
 */



// typeOf Promise === 'function'

// 静态方法 ==> all/race/resolve/reject

/**
 * Promise的三个状态
 * @status padding
 * @status reject
 * @status fulfilled
 */

// let p = new Promise((resolve, reject) => {
//     setTimeout(reject, 1000, 'hello world')
// })
//
// console.log(p)
//
// // 『 将下面哪些callback 存入 处理队列queue 』
// p.then(val => {
//     console.log(`resolve val is ${val}`)
// }, val => {
//     console.log(`reject val is ${val}`)
// })
//
// p.catch(val => {
//     console.log(`another val is ${val}`)
// })


//        下面一坨code输出
// --->>> Promise { <pending> }
// --->>> 2
let another = Promise.resolve({
    then: (resolve, reject) => {
        reject(2)
    }
})
another.then(val => console.log(val), val => console.log(val))
another.catch(val => console.log(`catch ${val}`))
console.log(another)



const assert = require('assert')

const p = Promise.resolve(1)

const p1 = p.then(val => {
    console.log(val)
    return val + 1
})
const p2 = p1.then(val => {
    console.log(val)
    assert.equal(2, val)
})

// thenable
Promise.resolve({
    then: (resolve, reject) => {
        reject(1)
    }
})
