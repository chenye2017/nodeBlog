const {exec} = require('../db/mysql')
const { getNowFormatDate, md5} = require('../commonFunc')

function userLogin(req)
{
    userName = req.post.userName
    password = req.post.password

    sql = 'select * from user'
}

function userRegister(req)
{
    userName = req.post.user_name
    password = req.post.password
    password = md5(password)
  //  console.log(password, 1111)
  //  process.exit()
    sql = 'select * from user where user_name = ? ';
    let res = exec(sql, [userName])

   

   let tmp1 =   res.then((obj) => {
        //return new Promise((resolve, reject) => {
            console.log(1112)
            if(obj) {
          //      reject({status: false, message: 'user_name 已存在', httpCode: 400})
          console.log(1112)
                return new Promise((resolve, reject) => {
                    console.log(1112)
                    reject({status: false, message: 'user_name 已存在', httpCode: 400})
                })
            } else {
                sql = 'insert into user (user_name, password, create_time) values (?, ?, ?)';
               // console.log(111)
                 let res1 = exec(sql, [userName, password, getNowFormatDate()])
                  return res1      
            }
       // })
        
    })
    return tmp1

    /* .then((obj) => {
        console.log(111)
      //  console.log(obj)
      //  process.exit()
        return {status:true, data: {insertId: obj.insertId}}
    }).catch( (obj) => {
        console.log(11122)
        process.exit()
    })
 */
   
    
    
}


module.exports = {
    userLogin,
    userRegister
}