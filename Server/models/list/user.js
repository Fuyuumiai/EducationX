// 获取数据库连接
const mongoose = require('../db/dal')
// 自动递增表
var Grow =  require('../../models/list/grow')
// 设计当前表结构(用户表)及其字段数据类型
// type：字段数据类型
// required：是否必填（true为必填）
// unique：是否为唯一索引
// 用户表
var UserSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true
  },
  nickname: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  telephone: {
    type: Number,
    unique: true
  },
  // 用户姓名
  name: String,
  // 用户性别
  gender: {
    type: Number,
    // 0：女、1：男、2：保密、3：未设置
    enum: [0, 1, 2, 3],
    default: 2
  },
  avatar: {
    type: String,
    default: '../../public/images/user_default.jpg'
  },
  // 个性签名
  bio: String,
  birthday: Date,
  // 用户地址
  address: String,
  // 用户学校
  school: String,
  // 用户年级
  grade: String,
  // 用户状态
  status: {
    type: Number,
    // 0：冻结、1：普通用户、2：教师、3、管理员
    enum: [0, 1, 2, 3]
  },
  // 创建时间
  createAt: Date,
  updateAt: Date
},
{
  // 利用mongoose驱动更新，但是需要注意这里的时间是少了八个小时的
  timestamps: { 
    createdAt: 'createAt',
    updatedAt: 'updatedAt'
  }
}
)

// 注册钩子函数实现自动增长id
UserSchema.pre('save', function( next ) {
  Grow.findOneAndUpdate({ tableName: 'user' }, { $inc: { tableId: 1 } }, { upsert: true, new: true }, (err, doc) => {
    if (err) { throw new Error(err) }
    this.userId = doc.tableId
    next()
  })
})

var User = mongoose.model('user', UserSchema)

module.exports = User