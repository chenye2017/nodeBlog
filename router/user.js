const {userLogin, userRegister} = require('../controller/user')

function uRouter(req, res)
{
   if (req.method === 'POST' && req.path === '/api/user/login') {
       return userLogin(req)
   }
   if (req.method === 'POST' && req.path === '/api/user/register') {
       return userRegister(req)
   }
}

module.exports = uRouter