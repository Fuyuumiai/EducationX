// 正则
// 邮箱正则
var emailRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
// 密码正则
var pwdRegex = /^(?:\d+|[a-zA-Z]+|[\.!@#$%^&*]+){6,16}$/

module.exports = {
    emailRegex,
    pwdRegex
}