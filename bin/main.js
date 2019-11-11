const http = require('http')
const handle = require('../app') // 这个地方已经就包含handle 执行了

let i = 0;




const server = http.createServer((req,res) => {
/*     i++;
console.log(i) 
这个i就像全局变量一样
*/




    handle(req,res)
})

server.listen(3000, function() {
    console.log('start')
})