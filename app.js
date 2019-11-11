const queryString = require('querystring')
const {BaseModel} = require('./model/BaseModel')
const bRouter = require('./router/blog')
const uRouter = require('./router/user')



function test(req,res) 
{
        return new Promise((resolve, reject) => {

            if (req.method === 'GET') {
                
                resolve({req,res})
            } else {
                let body = ''
                req.on('data', chunk => {
                    body += chunk.toString()
                })
                
                req.on('end', () => {
                    
                    if (req.headers['content-type']) 
                        if (req.headers['content-type'] === 'application/json') {
                            if (body) {
                                req.body = JSON.parse(body) // body 内容
                            }
                  
                        }
                        
                        if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
                            let arr = body.split('&')

                            let post ={};
                            let tmp = []
                            arr.forEach((value) => {
                               tmp = value.split('=')
                            //   console.log(tmp)
                               post[tmp[0]] = decodeURI(tmp[1])  
                            })
                            req.post = post
                          //  console.log(req.post)
                            resolve({req, res})
                        }
                        
                    })
                    
            
        }
            
          
           
       //   reject('nihao')
        })
    
}

function kindf(kind, req,res)
{
    let zimu;
    let result;
    switch(kind) {
        case 'blog':
            result = bRouter(req,res)
            break;
        case 'user':
            reusult = uRouter(req,res)
            break;
        default:
            throw 'no kind'     
    }
    
    return result
}


function handle (req,res)
 {
    const url = req.url
    let param = url.split('?')[1]
    const path = url.split('?')[0]

    param = queryString.parse(param)

    req.path = path
    req.param = param



    res.setHeader('Content-type', 'application/json')

    // test 组装参数
    test(req,res).then((obj) => {
        req = obj.req
        res = obj.res
        // 路由处理，因为也是异步
        // 感觉这样写，就算不是异步的，也要写成promise 了
      //  return {id: "xxxxx"}
       
      let pathArr = req.path.split('/')
      let kind = pathArr[2]

      let result = kindf(kind, req, res)
  
        // blog 路由处理,因为也是异步，所以返回的也是promise
      return result
       
    
    }).then((obj) => {
       
       // result = cRouter(req, res)

       // console.log(result)
        
       // return
    //    console.log(1111)
        // 如果是post， 需要异步处理，等待数据组装完成

      // console.log(obj)

       console.log(obj)
        let {status, data, message, code, httpCode} = obj
        
        result = new BaseModel(obj)
        
            
        if (typeof obj.status !== 'undefined') {
               
            if (obj.status === true) {
                if (typeof obj.httpCode === 'undefined') {
                     httpCode = 200
                }
            } else if (obj.status === false) {
                if (typeof obj.httpCode === 'undefined') {
                    httpCode = 500
               }
                //result = new ErrorModel(obj)
                // return  // 还是只会暂停当前函数的执行
            }
            res.statusCode = httpCode
            res.end(JSON.stringify(new BaseModel(obj)))
            return
        }
        res.writeHead(404, {'Content-type': 'text/html'})
        res.end('router not found1')

       
        
      
        
    }).catch((error) => {

        console.log(error)

        process.exit()
        if (error.status !== 'undefined') {
            let e = new BaseModel(error)
        } else {
            console.log(error)
        }
    })
  
    // res.setHeader 也是能改写内容的
  // res.end('ss')  // 还是能改写内容
  // reject 就当做跑出来一个错误
  // Promise 在resolve语句后面，再抛出错误，不会被捕获，等于没有抛出。因为 Promise的状态一旦改变，就永久保持该状态，不会再变了。
  // 如果没有使用catch方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。必须得有个catch ,要不然不方便调试代码
 // reject 会走then 和 catch 的内容 （都走）
 // promise 就是为了防止回调地狱存在的
 // 感觉catch 就当做一个普通的error 处理就好了，就是大家的error 或者reject 都会走这里面一遍
    

    

}

module.exports = handle