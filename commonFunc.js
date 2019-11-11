var crypto = require('crypto');

function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + addZero(date.getHours()) + seperator2 + addZero(date.getMinutes())
                + seperator2 + addZero(date.getSeconds());
        return currentdate;
    }

    function addZero(num) {
        if (num < 10) {
            num = '0'+ num
        }
        return num
    }

    function md5(encryptString) {
      //  console.log(typeof(encryptString))
            var hasher = crypto.createHash("md5");
       // try {
            hasher.update(encryptString);
            encryptString= hasher.digest('hex');
        //   console.log(encryptString)

          // process.exit()

       /*  } catch (error) {
            console.log(error)
        } */
            return encryptString;
        }
      
module.exports = {
    getNowFormatDate,
    addZero,
    md5
}