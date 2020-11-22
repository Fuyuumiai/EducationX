// 此文件为回复语句方法（偷懒用）

// 普通回复
// res：response对象、status：返回的状态码、code：自定义错误码、message：返回的消息
function resRevert(res, status, code, message, data){
    return res.status(status).json({
        code,
        message,
        data
    })
}

module.exports = {
    resRevert
}