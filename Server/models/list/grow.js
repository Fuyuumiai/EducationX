// 保存各个表自增id的表（自动递增表）
const mongoose = require('../db/dal')
var GrowSchema = new mongoose.Schema({
   // 递增id
   tableId: {
       type: Number,
       required: true,
       default: 0
   },
   // 对应表名
   tableName: {
       type: String,
       required: true,
       unique: true
   }

})
var Grow = mongoose.model('grow', GrowSchema)

module.exports = Grow