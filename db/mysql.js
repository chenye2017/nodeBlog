const mysql = require('mysql')
const { mysqlConf }= require('../conf/db')


let con = mysql.createConnection(mysqlConf)
let con1 = mysql.createConnection(mysqlConf)


con.connect()
//console.log(con)



function exec(sql, params) {
    return new Promise((resolve, reject) => {
        try {
            console.log('mysql')
            con.query(sql, params, function(err, result) {
             //   console.log(result)
                if (err) {
                    console.log('start111')
                    console.log(err.message)
                reject(err)
                }
                console.log('success')
                resolve(result)
            })
       } catch (error) {
           console.log(111,error)
       }
    })
}

function test()
{
    console.log('test11111')
}

module.exports = {
    exec,
    test,
    con
}
