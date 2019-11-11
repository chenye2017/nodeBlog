const {getBlogList, addNewBlog, getBlogDetail, updateBlog, delBlog} = require("../controller/blog")

function bRouter(req, res)
{

 //  console.log(req.path, req.method)
   // 获取博客列表
    if (req.path === '/api/blog/list' && req.method === 'GET') {
       return  getBlogList(req.param.author, req.param.keyword)
    }
   
    // 获取博客详情
    if (req.path === '/api/blog/detail' && req.method === 'GET') {
        return getBlogDetail(req.param.id)
    }
    
    
    // 新建博客
    if (req.path ==='/api/blog/new' && req.method === 'POST') {
        return addNewBlog(req)
    }

    // 修改博客
    if (req.path === '/api/blog/update' && req.method === 'POST') {
        return updateBlog(req)
    }

    if (req.path === '/api/blog/del' && req.method === 'POST') {
        return delBlog(req)
    }

}

module.exports = bRouter