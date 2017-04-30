/**
 * Created by StarLikeRain on 07/04/2017.
 */
let path = require('path')
let ejs = require('ejs')

const html = `hello
                <% if(world.match('x')) { %>
                <%- world %>
                <% } %>
                <%- include('test') %>
                <%- hhh %>`

const world ='xxxx'

const f1 = ejs.compile(html,{
    filename: path.resolve(__filename),
    compileDebug: true
})
console.log(f1) // function

const finalStr = f1({
    world: world,
    hhh: 'hahahah'
})
console.log('finalStr ---->>>>> ',finalStr)

/*
 * <% %> 逻辑运算
 * <%- %> unescape
 * <%= %> escape XSS_attack
 */
