let env = process.env.NODE_ENV

let mysqlConf;
if (env === 'dev') {
    mysqlConf = {
        host     : '127.0.0.1',
        user     : 'root',
        password : '',
        port: '3306',
        database : 'node'
    }
}

module.exports = {
    mysqlConf
}