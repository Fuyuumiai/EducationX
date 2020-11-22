const fs = require('fs')
const path = require('path')

// 将二进制流转换成base64
function imgToBase64(url) {
    return new Promise((resolve, reject) => {
        fs.readFile(url, 'binary', (err, data) => {
            if (err) {
                reject(err)
            }
            // 转换成base64格式
            let str = Buffer.from(data, 'binary').toString('base64')
            resolve(str)
        })
    })
}
// 删除二进制文件
function removeStr(files) {
    return new Promise((resolve, reject) => {
        files.map( async file => {
            await fs.unlink(file.path, err => {
                if (err) { reject(err) }
            })
        })
        resolve('ok')
    })
}
// 将图片保存至指定目录
// file 图片文件
// sign 标识（用户唯一id、其他唯一值皆可）
function saveImg(file, sign) {
    return new Promise((resolve, reject) => {
        fs.readFile(file.path, async (err, data) => {
            if (err) {
                reject(err)
            }
            // 拓展名
            let extName = file.mimetype.split('/')[1]
            // 拼接成图片名
            let imgName = `${sign}-${Date.now()}.${extName}`
            // 写入图片
            await fs.writeFile(path.join( __dirname, `../avatar/${imgName}`), data, err => {
                if (err) { reject(err) }
            })
            // 删除二进制文件
            await fs.unlink(file.path, err => {
                if (err) { reject(err) }
            })
            // 验证是否存入
            await fs.stat(path.join( __dirname, `../avatar/${imgName}`), err => {
                if (err) { reject(err) }
                // 成功就返回图片名
                resolve(`public\avatar\\${imgName}`)
            })
        })
    })
}
// 校验文件是否符合格式
// file 文件或文件组
// num 数量 (默认为1)
// size 大小 (单位为M)
// type 类型 (默认条件字符串为 'image/' 既图片即可)
// 对应错误码
// 0 符合要求
// 1 数量不对
// 2 格式不对
// 3 大小不对
function checkImg(file, size, num = 1, type = 'image/') {
    // 校验数量
    if (file.length < num) {
        return 1
    }
    // 转换size
    let sizeNum = Math.floor(size * 1024 ** 2)
    // 遍历验证是否标准
    for (let i = 0; i < file.length; i++) {
        if (file[i].size > sizeNum) {
           return 3
        }
        if (!file[i].mimetype.startsWith(type)) {
            return 2
        }
    }
    return 0
}

module.exports = {
    imgToBase64,
    removeStr,
    saveImg,
    checkImg
}