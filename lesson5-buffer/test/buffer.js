/**
 * Created by StarLikeRain on 06/04/2017.
 */
const assert = require('assert')
const fs = require('fs')


// -----学习Buffer.from()


// 1.(string, encoding)
const encodingTest = 'hello word'
// let buf1 = Buffer.from(encodingTest, 'utf-8')
// console.log(buf1)


// 1.（ buffer ）
// let buf2 = Buffer.from([0x68,0x65,0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x64])
// console.log(buf2.toString()) // hello word
// assert.equal(buf2.toString(),encodingTest)


// 『 buffer 转码问题，   ---------------汉字转码问题』
// let test ='窗'
// console.log(Buffer.from(test),'utf-8')
// assert.equal(Buffer.from([0xe7, 0xaa, 0x97]).toString(),test)


// 『Buffer.concat 参数及数据转换』
// 1.将buffer数组，组合成新buffer
// 使用方式: Buffer,concat(list[, totalLength])
let test = '窗'
let buf3 = Buffer.from([0xe7])
let buf4 = Buffer.from([0xaa])
let buf5 = Buffer.from([0x97])
// concat的作用是将buffer拼接成大的buffer
console.log(Buffer.concat([buf3, buf4, buf5], 3).toString('utf-8'))// 这个length 3可以省略，node自己计算的
// assert.equal(Buffer.concat([buf3,buf4,buf5],3).toString('utf-8'),test)


// ----------------buffer的应用场景
/*
 1、 stream 读取字节丢失的问题， 不过Node已经做了兼容
 */
let data = fs.createReadStream('./test/tmp', {
    // 这个流啊 每次限定最多读取一个buffer
    highWaterMark: 1,
    // encoding: 'utf-8'
})
let out = []
data.on('data', (chunk) => {
    // out += chunk   ====>>>>  out.toString() + chunk.toString()
    out.push(chunk)
}).on('end', () => {
    let l = out.length
    // out is many buffer,  l is 309
    console.log(Buffer.concat(out, l).toString()) //  这里的l 也是可以省略，和上面解释一样，可以node自己计算
})
