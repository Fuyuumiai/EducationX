// 用于数据库连接
const mongoose = require('mongoose')

// 解决如下问题
// https://mongoosejs.com/docs/deprecations.html#-findandmodify-

mongoose.connect('mongodb://localhost/education', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(res => {
    console.log(`
        Database Connection Successful.
    `)
}).catch(err => {
    console.log(`
    数据库连接失败，错误如下：
    ${err}
    `)
})

module.exports = mongoose