import tabBer from '../../util/tabBer'

// 判断用户tabBer类别
// 0 冻结
// 1 普通用户
// 2 教师
// 3 管理员
let type = uni.getStorageSync('user_type')  >= 2 ? 'tchList' : 'stuList'

let list = tabBer[type]

// midBtn 为设置tabBer中间的凸起，false为不凸起

const state = {
	list,
	midBtn: type === 'stuList' ? false : true
}


export default {
	namespaced: true,
	state
}
