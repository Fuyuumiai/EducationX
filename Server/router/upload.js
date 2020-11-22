// 初始化路由对象
const axios = require('axios')
var express = require('express')
var router = express.Router()

// 上传图片的工具
var multer = require('multer')
// 生成的图片放入uploads文件夹下
var upload = multer({ dest: 'uploads/' })
// 引入快捷错误码
var { resRevert } = require('../public/js/resRevert')
// 引入获取token
var { getToken } = require('../public/js/getToken')
// 引入图片处理工具
// checkImg 对应错误码
// 0 符合要求
// 1 数量不对
// 2 格式不对
// 3 大小不对
var {checkImg, saveImg, imgToBase64, removeStr } = require('../public/js/imgHandle')
// 教师资格审查
// 响应code
// 0图片上传错误
// 1文件操作失败
// 3图片不清晰
// 4验证失败
router.post('/uploadPapers', upload.array('papers', 2), (req, res) => {
    // 获取前端上传图片列表
    let files = req.files
    if (checkImg(files, 4, 2) != 0) {
        return resRevert(res, 200, 0, '图片大小或上传格式有误！')
    }
    // 将图片转换成base64
    Promise.all([
        imgToBase64(files[0].path),
        imgToBase64(files[1].path)
    ]).then(async ([pre, next]) => {
        await removeStr(files)
        // 获取百度人脸识别api的token
        let token = await getToken()
        // 格式化图片参数
        let json =  JSON.stringify([
            {
                "image": pre,
                "image_type": "BASE64",
                "face_type": "CERT",
                "quality_control": "NONE",
                "liveness_control": "NONE"
            },
            {
                "image": next,
                "image_type": "BASE64",
                "face_type": "LIVE",
                "quality_control": "NONE",
                "liveness_control": "NONE"
            }
        ])
        axios({
            url: `https://aip.baidubce.com/rest/2.0/face/v3/match?access_token=${token}`,
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            data: json
        }).then(({ data }) => {
            // 这里设置错误码、阈值响应
            if (data.error_code === 0) {
                if (data.result.score > 80){
                    resRevert(res, 200, 200, '验证通过！')
                } else {
                    resRevert(res, 200, 3, '照片不清晰！')
                }
            } else {
                resRevert(res, 200, 4, '验证失败！')
            }
        })
    }).catch(() => {
        resRevert(res, 200, 3, '验证失败！')
    })
})
// 更新头像
router.post('/uploadAvatar', upload.single('avatar'), (req, res) => {
    // 文件及其标识
    let file = req.file,
    sign = req.query.sign
    if (checkImg([file], 4) != 0) {
        resRevert(res, 200, 0, '图片上传失败！')
    }
    saveImg(file, sign).then(url => {
        resRevert(res, 200, 200, '上传成功', { url })
    }).catch(err => {
        resRevert(res, 200, 0, '图片上传失败！')
    })
})

module.exports = router