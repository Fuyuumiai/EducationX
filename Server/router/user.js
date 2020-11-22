// 初始化路由对象
const express = require('express')
const router = express.Router()

// 引入用户表
var User = require('../models/list/user')  
// // 引入验证码表
var Code = require('../models/list/code')

// 引入工具
// 发送验证码的方法
var { sendCode } = require('../public/js/sendCode')
var { resRevert } = require('../public/js/resRevert')

// 引入正则
var { emailRegex, pwdRegex } = require('../public/js/getRegex')

// 引入md5加密
var { encrypt } = require('../public/js/cryptoHandle')
// 验证码
router.post('/sendCode', (req, res) => {
    sendCode(req.body).then(code => {
        resRevert(res, 200, 200, '验证码发送成功！')
    }).catch(err => {
        console.log(err)
        resRevert(res, 200, 0, '发送失败！')
    })
})

// 注册
router.post('/addUser', (req, res) => {
    // 当前请求code对应具体问题
    // 0 服务器问题
    // 1 账号问题
    // 2 密码问题
    // 3 验证码问题
    // 200 注册成功
    if (!emailRegex.test(req.body.email)) {
        return resRevert(res, 200, 1, '邮箱格式错误！')
    }
    if (!pwdRegex.test(req.body.password)) {
        return resRevert(res, 200, 2, '密码应由6-16位字母、数字、特殊字符组成.')
    }
    User.findOne({ email: req.body.email }).then(data => {
        if (data) {
            return resRevert(res, 200, 1, '账号已存在！')
        }
        Code.findOne({ account: req.body.email }).then(doc => {
            if (!doc) {
                return resRevert(res, 200, 3, '验证码不存在或已过期！')
            }
            if (req.body.code != doc.value) {
                return resRevert(res, 200, 3, '验证码错误！')
            }
            new User(Object.assign({}, req.body, {
                // 加密并覆盖明文密码
                password: encrypt(req.body.password)
            })).save().then(() => {
                return resRevert(res, 200, 200, '注册成功！')
            })
        })
    }).catch(err => {
        resRevert(res, 200, 0, "用户创建失败！")
    })
})

// 登录
router.post('/login', (req, res) => {
    if (!emailRegex.test(req.body.email)) {
        return resRevert(res, 200, 1, '邮箱格式错误！')
    }
    if (!pwdRegex.test(req.body.password)) {
        return resRevert(res, 200, 2, '密码应由6-16位字母、数字、特殊字符组成.')
    }
    User.findOne({ email: req.body.email}).then(res => {
        if (!res) {
            // 未找到匹配账号密码
            return resRevert(res, 200, 1, '账号不存在！')
        }
        if (encrypt(req.body.password) !== res.password) {
            // 密码不匹配
            return resRevert(res, 200, 2, '密码错误！')
        }
        resRevert(res, 200, 200, '登录成功！')
    }).catch(err => {
        resRevert(res, 200, 0, '服务器开小差了，请稍后重试~')
    })
})
// 重置密码
router.post('/resetPsw', (req, res) => {
    if (!emailRegex.test(req.body.email)) {
        return resRevert(res, 200, 1, '邮箱格式错误！')
    }
    if (!pwdRegex.test(req.body.password)) {
        return resRevert(res, 200, 2, '密码应由6-16位字母、数字、特殊字符组成.')
    }
    User.findOne({ email: req.body.email}).then(res => {
        if (!res) {
            // 未找到匹配账号密码
            return resRevert(res, 200, 1, '账号不存在！')
        }
        if (encrypt(req.body.password) !== res.password) {
            // 密码不匹配
            return resRevert(res, 200, 2, '密码错误！')
        }
        resRevert(res, 200, 200, '登录成功！')
    }).catch(err => {
        resRevert(res, 200, 0, '服务器开小差了，请稍后重试~')
    })
})
// 测试用
router.get('/test', (req, res) => {
    let str = encrypt(req.query.key)
    // console.log(str)
    // console.log(decrypt(str))
})

module.exports = router