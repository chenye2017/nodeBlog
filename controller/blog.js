const { getNowFormatDate} = require('../commonFunc')
const {exec, test}  = require('../db/mysql')



function getBlogList(author, keyword)
{
    let sql = 'select * from article where 1 = 1 ';
    let params = [];
    if (author) {
        sql += ' and author like ? ';
        params.push('%'+author+'%')
    }
    if (keyword) {
        sql += ' and content like ? ';
        params.push('%'+keyword+'%')
    }
    
    let res = exec(sql, params)
    

    return res.then((obj) => {
        return new Promise((resolve, reject) => {
            resolve({status:true, data: obj})
        })
    })
}

function getBlogDetail(id)
{
    let sql = 'select * from article where id = ? ';
    let params = [id];

    let res = exec(sql, params);
    return  res.then((obj) => {
        if (obj.length === 0) {
            return new Promise((resolve, reject) => {
                resolve({status:false, data:[], message: 'not found', code: '', httpCode: 404})
            })
        }
       // console.log(111222)
        return Promise.resolve({status: true, data: obj[0]})
    })
   
}

function addNewBlog(req)
{
    sql = 'insert into article(author, content, title, create_time) values ( ? , ?, ? ,?) ';
    let res = exec(sql, [req.post.author, req.post.content, req.post.title, getNowFormatDate()])
    return res.then((obj) => {
        return {status: true, data:  {insertId: obj.insertId}}
    })   
}

function updateBlog(req)
{
    sql = 'update article set content = ?, title = ? , update_time = ? where id = ? ';
    let res = exec(sql, [req.post.content, req.post.title, getNowFormatDate(), req.post.id])
    return res.then((obj) => {
        return {status: true, data: [], message: 'update Success'}
    })
}

function delBlog(req)
{
    id = req.post.id
    sql = 'delete from article where id = ? ';
    let res = exec(sql, [id])
    return res.then((obj) => {
        return {status: true, data: [], message: 'delete success'}
    })
}



module.exports = {
    getBlogList,
    addNewBlog,
    getBlogDetail,
    updateBlog,
    delBlog
}