// 保存各个表自增id的表（自动递增表）
const mongoose = require('../db/dal')
var TokenSchema = new mongoose.Schema({
   token: {
       type: String,
       required: true
   },
   // 这个是创建时间
   // 30天后过期
   createAt: {
       type: Date,
       index: { expires: 2592000 }
   }
})
var Token = mongoose.model('token', TokenSchema)

module.exports = Token