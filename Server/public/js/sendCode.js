const nodemailer = require('nodemailer')
var Code =  require('../../models/list/code')
// var { getLcalDate } = require('../../public/js/dateFormat')
// 我发送邮件的邮箱
const sender = 'tsu.ki@qq.com'
// 邮箱验证码创建方法
function createCode(){
    let code = []
    for(let i = 0; i < 6; i++){
        code.push(Math.floor(Math.random() * 10))
    }
    return code.join('')
}
// 创建nodemailer方法对象
const transporter = nodemailer.createTransport({
    host: "smtp.qq.com", // QQ的邮件地址
    port: 465, // QQ邮件服务所占用的端口
    secureConnection: true, // 是否使用安全连接，对https协议的 （防止被窃取信息）
    auth: {
    　　"user": sender, // 发送邮箱的账号
    　　"pass": 'lqoqydkodjxcdjig' // 邮箱的授权码
    }
})
// 保存至数据库
function save(query, code) {
    // 这里需要将发送成功的验证码添加进数据库
    // http://www.mongoosejs.net/docs/api.html#query_Query-findOneAndUpdate
    return Code.findOneAndUpdate(
             query,
             { $set: { value: code, deleteAt: Date.now() } },
             { upsert: true, new: true }
           )
}
// 创建邮箱发送方法
function send(options, code){
　　return new Promise((resolve, reject) => {
        transporter.sendMail(options, err => {
            if (err) {
            　　reject(err)
            }
            resolve(code)
        })
    })
}
// 暴露的邮箱验证码发送方法
async function sendCode(config){
    // 获取要发送的邮件信息
    let { to, type, operation } = config
    // 生成随机验证码
    let code = createCode()
    // 发送的邮件内容
    let email = {
        title: '大学生家教在线',
        htmlBody: `
            <h3>您好!</h3>
            <p style="font-size: 16px;color:#000;">您本次操作所需验证码为：<b style="font-size: 16px;">${code}。</b></p>
            <p style="font-size: 14px;color:#666;">该验证码5分钟之内有效，请及时操作！</p>
        `
    }
    // 配置文件
    let options = {
        // 发送的邮件配置
        from: sender, // 发件人地址
        to, // 收件人地址，多个收件人可以使用逗号分隔
        subject: email.title, // 邮件标题
        html: email.htmlBody // 邮件内容
    }
    // 查询内容
    let query = {
        // 账号
        account: to,
        // 邮件类型
        type,
        // 邮件操作类型
        operation
    }
    // 先保存验证码
    await save(query, code)
    // 后发送验证码
    return await send(options, code)
}

module.exports = {
    sendCode
}