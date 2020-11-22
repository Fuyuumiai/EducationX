// 由于MongoDB会少8小时所以设置该方法
function getLcalDate() {
    const d = new Date(Date.now())
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
    return d.toISOString()
}

// 获取指定月份的天数
// 实现原理：根据本月和下一月的差值除于一天的毫秒数
function getMonthDays(time){
    let [year, month] = time
    let stratDate = new Date(year, month - 1, 1).valueOf()
    let endData =  new Date(year, month, 1).valueOf()
    let days = (endData - stratDate) / ( 1000 * 60 * 60 * 24)
    return days
}

module.exports = {
    getLcalDate,
    getMonthDays
}