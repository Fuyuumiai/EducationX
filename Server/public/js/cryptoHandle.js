// 操作模块
const crypto = require('crypto')
// md5加密秘钥
const secret = 'ai.yui'

// 加密方法
var encrypt = (data) => {
    return crypto.createHmac('md5', secret).update(data).digest('hex')
}

// // 解密方法
// var decrypt = (data) => {
//     return crypto.privateDecrypt(md5Key, data)
// }

module.exports = {
    encrypt
}