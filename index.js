const http = require('http')
const queryString = require('querystring')


const server = http.createServer((req, res) => {

    console.log('start111');
    const url = req.url;
    const header = req.headers;
    const method = req.method;

    res.setHeader('Content-type', 'application/json');

    if (url === '/favicon.ico') {
        res.end()
    }

    if (method === 'GET') {
        const paramQS = url.split('?')[1] ? url.split('?')[1] : '';
        const param = queryString.parse(paramQS)

        res.end(JSON.stringify(param));
    }

    console.log(method);
    if (method === 'POST') {
        var data = '';
        req.on('data', chunk => {
            data += chunk.toString()
        })
        req.on('end', () => {
            console.log(data)
            data = queryString.parse(data)
            res.end(JSON.stringify(data))
        })
    }

});



server.listen(3000, function() {
    console.log('start listen 3000')
})