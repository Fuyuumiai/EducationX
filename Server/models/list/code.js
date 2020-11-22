// 验证码表
const mongoose = require('../db/dal')
var CodeSchema = new mongoose.Schema({
   // 账号
   account: String,
   // 验证码值
   value: String,
   // 验证码类型
   type: {
       type: String,
       enum: ['email', 'telephone'],
       default: 'email'
   },
   // 操作类型
   operation: { 
     type: String, 
     enum: ['login', 'register', 'resetPay', 'resetPassword']
   },
   // 创建时间，expires是设置TTL（自动过期删除）（单位s）
   // 这里需要注意的是，如果这里初始化设置的值更正为北京时间，
   // 那么将不会进行删除，因为mongodb内部运行的时间要比北京时间少8小时
   deleteAt: {
     type: Date,
     index: { expires: 300 }
   }
}
)

var Code = mongoose.model('code', CodeSchema)

module.exports = Code