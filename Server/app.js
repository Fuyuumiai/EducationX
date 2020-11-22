// 基本包
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
var app = express()

// 配置body-parser,最基础的配置
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// 配置默认开放路径文件夹
app.use('/public/', express.static(path.join(__dirname,'./public/')))

// 设置跨域
app.all("*", (req, res, next) => {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", req.headers.origin)
    //允许的header类型
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Token")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS")
    res.header("Access-Control-Allow-Credentials", true)
    // res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8")
    // 解决前端无法访问特定请求头的设置 （现在前端可以拿到X-Token）
    // res.header("Access-Control-Expose-Headers", 'X-Token')

    // 让options尝试请求快速结束(post的第一次请求)
    if (req.method.toLowerCase() === 'options') {
        res.sendStatus(200)
    }
    else {
        next()
    }
})

// 配置路由
app.use('/user', require(path.join(__dirname,'./router/user')))
app.use('/upload', require(path.join(__dirname,'./router/upload')))

app.listen(3000, () => {
    console.log(`
        Server Port Starting 3000...
    `)
})