class BaseModel
{
    constructor(obj) {
        let {data, message, code} = obj

        if (data) {
            this.data = data
        } else {
            this.data = {}
        }

        if (message) {
            this.message = message 
        } else {
            this.message = ''
        }

        if (code) {
            this.code = code
        } else {
            this.code = ''
        }


    }
}

/* class SuccessModel extends BaseModel
{
    constructor(data, message, code, httpCode) {
        super(data,message, code)
        if (httpCode) {
            this.httpCode = httpCode
        } else {
            this.httpCode = 200
        }
    }
}

class ErrorModel extends BaseModel
{
    constructor(data, message, code, httpCode) {
        super(data,message, code)
        if (httpCode) {
            this.httpCode = httpCode
        } else {
            this.httpCode = 500
        }
    }
} */

module.exports = {
    BaseModel
}