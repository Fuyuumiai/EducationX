// 这个是注册表单验证的规则
const registerRules = {
	name: [{
		required: true,
		message: '请输入姓名',
		trigger: ['change', 'blur'],
	}],
	intro: [{
		min: 5,
		message: '简介不能少于5个字',
		trigger: 'change'
	}]
}

export {
	registerRules
}