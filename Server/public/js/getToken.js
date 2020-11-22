var https = require('https')
var qs = require('querystring')
var fs = require('fs')
var { getLcalDate } = require('../../public/js/dateFormat')
var Token = require('../../models/list/token')

async function getToken() {
  return await Token.findOne().then(async res => {
        if (!res) {
           let info = await getNewToken()
           await new Token({
               token: info.access_token,
               createAt: getLcalDate()
           }).save().then(() => {
               return info.access_token
           })
        }
        return res.token
    }).catch(() => {
        throw new Error('获取失败！')
    })
}

function getNewToken() {
    const param = qs.stringify({
        'grant_type': 'client_credentials',
        // 自己的Api Key
        'client_id': 'aHvsUG7ll3psnEvLQEX0WqTH',
        // 自己的Secret Key
        'client_secret': '3tyt4PzM43rXoo64GpWGF1T8k29pBFES'
    })
    return new Promise((resolve, reject) => {
        https.get(
            {
                hostname: 'aip.baidubce.com',
                path: '/oauth/2.0/token?' + param,
                agent: false
            },
            async res => {
                await res.pipe(fs.createWriteStream('public/json/baidu-token.json'))
                await fs.readFile('public/json/baidu-token.json', 'utf-8', (err, data) => {
                    if (err) {
                        reject('操作失败！')
                    }
                    resolve(JSON.parse(data))
                })
            }
        )
    })
}

module.exports = {
    getToken
}